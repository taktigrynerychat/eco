import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import {Map} from 'leaflet';
import 'leaflet.markercluster';

interface SegmentMeta {
	html?: string;
	arcEnd?: number;
}

@Component({
	selector: 'eco-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
	map: Map;

	constructor(private http: HttpClient) {
	}

	ngOnInit(): void {
		this.initMap();
	}

	initMap(): void {
		this.map = L.map('map', {
			attributionControl: false,
		}).setView([59.88, 30.3], 10);
		//http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}
		L.tileLayer('http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}', {
			subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
		}).addTo(this.map);
		this.fetchData();
	}

	fetchData(): void {
		this.http.get('./assets/markers.json').subscribe((data: object) => {
			const me: MapComponent = this;
			let counter: number = 0;
			let markerCluster: L.MarkerClusterGroup = L.markerClusterGroup({
				iconCreateFunction: function (cluster: L.MarkerCluster) {
					let markers: Array<L.Marker> = cluster.getAllChildMarkers();
					let typesCount: object = me.getTypesCount(markers);
					return L.divIcon({
						html: me.getCluster(typesCount, markers.length),
						className: 'mycluster',
						iconSize: L.point(32, 32),
					});
				},
				spiderfyOnMaxZoom: false,
				showCoverageOnHover: true,
				zoomToBoundsOnClick: false,
			});
			for (let i in data) {
				let recycleTypes: Array<string> = data[i].content_text.split(', ');

				let marker: L.Marker = L.marker([data[i].lat, data[i].lng], {
					icon: L.divIcon({
						className: 'custom-div-icon',
						iconSize: [20, 20],
						iconAnchor: [8, 7],
						html: this.getMarker(recycleTypes),
					}),
				});
				marker.feature = {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [data[i].lat, data[i].lng],
					},
					properties: {
						types: recycleTypes,
					},
				};
				markerCluster.addLayer(marker);
				// L.circle([data[i].lat, data[i].lng], {color: 'green', fillColor: 'green', radius: 1}).addTo(this.map);
				counter++;
			}
			this.map.addLayer(markerCluster);
		});
	}

	getTypesCount(markers: L.Marker[]): object {
		const result: object = {
			total: 0,
		};
		for (let m of markers) {
			let markerTypes: string[] = m.feature.properties.types;
			for (let t of markerTypes) {
				if (!result[t]) {
					result[t] = 0;
				}
				result[t]++;
				result['total']++;
			}
		}
		return result;
	}

	getCluster(props: object, markerCount: number): string {
		const total: number = props['total'];
		delete props['total'];
		const recycleTypes: string[] = Object.keys(props);

		let segments: string = '';
		let start: number = 0;
		for (let i: number = 0; i < recycleTypes.length; i++) {
			let segmentMeta: SegmentMeta = this.segment(i, recycleTypes[i], recycleTypes.length, 360 / total * props[recycleTypes[i]], start);
			start = segmentMeta.arcEnd;
			segments += segmentMeta.html;
		}

		return `
			<svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
				<title>${recycleTypes.join(', ')}</title>
				${segments}
				<circle cx="150" cy="150" r="100" fill="#fff"/>
				<text x="50%" y="50%" text-anchor="middle" font-size="70pt" stroke="#51c5cf" stroke-width="2px" dy=".3em">${markerCount}</text>
			</svg>
		`;
	}

	getMarker(recycleTypes: string[]): string {
		let segments: string = '';
		for (let i: number = 0; i < recycleTypes.length; i++) {
			segments += this.segment(i, recycleTypes[i], recycleTypes.length).html;
		}
		// https://observablehq.com/@haakenlid/svg-circle
		return `<svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
							<title>${recycleTypes.join(', ')}</title>
							${segments}
						</svg>`;
		// return `<svg id="theMap" width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
		// 					<circle cx="400" cy="400" r="300" fill="#660"/>
		// 					<g id="arcs" transform=" translate(400 400) rotate(-90) scale(1 -1)"></g>
		// 					<circle cx="400" cy="400" r="100" fill="#fff"/>
		// 				</svg>`;
	}

	range(n: number): number[] {
		return [...Array(n).keys()];
	}

	polarToCartesian(x: number, y: number, r: number, degrees: number): number[] {
		const radians: number = degrees * Math.PI / 180.0;
		return [x + (r * Math.cos(radians)),
			y + (r * Math.sin(radians))];
	}

	getPoint(x: number, y: number, radius: number, degree: number): string {
		return this.polarToCartesian(x, y, radius, degree)
			.map((n: number) => n.toPrecision(5))
			.join(',');
	}

	segmentPath(x: number, y: number, r0: number, r1: number, d0: number, d1: number): string {
		// https://svgwg.org/specs/paths/#PathDataEllipticalArcCommands
		const arc: number = Math.abs(d0 - d1) > 180 ? 1 : 0;
		return [
			`M${this.getPoint(x, y, r0, d0)}`,
			`A${r0},${r0},0,${arc},1,${this.getPoint(x, y, r0, d1)}`,
			`L${this.getPoint(x, y, r1, d1)}`,
			`A${r1},${r1},0,${arc},0,${this.getPoint(x, y, r1, d0)}`,
			'Z',
		].join('');
	}

	segment(n: number, color: string, segmentCount: number, arcDegrees: number = null, arcStart: number = null): SegmentMeta {
		const segment: SegmentMeta = {};
		const svgSize: number = 300;
		const segments: number = segmentCount;
		const margin: number = 0;
		const radius: number = 150;
		const width: number = 150;

		const center: number = svgSize / 2;
		const degrees: number = (arcDegrees !== null) ? arcDegrees : 360 / segments;
		const start: number = (arcStart !== null) ? arcStart : degrees * n;
		const end: number = (arcStart !== null) ? arcStart + arcDegrees + (margin == 0 ? 1 : 0) :
			(degrees * (n + 1 - margin) + (margin == 0 ? 1 : 0));
		segment.arcEnd = end;
		const path: string = this.segmentPath(center, center, radius, radius - width, start, end);
		const fill: object = {
			'Бумага': '#FFFF00',
			'Стекло': '#0000FF',
			'Пластик': '#FF0000',
			'Металл': '#808080',
			'Иное': '#800080',
			'Одежда': '#8B4513',
			'Опасные отходы': '#000000',
			'Батарейки': '#FFA500',
			'Лампочки': '#008000',
			'Бытовая техника': '#AFEEEE',
			'Тетра Пак': '#32CD32',
			'Шины': '#C0C0C0',
			'Крышечки': '#000080',
		};
		if (segmentCount == 1) {
			segment.html = `<circle cx="${center}" cy="${center}" r="${radius}" fill="${fill[color]}"/>`;
		} else {
			segment.html = `<path d="${path}" style="fill:${fill[color]};stroke:none" />`;
		}
		return segment;
	}

	// download(content, fileName, contentType) {
	// 	let a = document.createElement("a");
	// 	let file = new Blob([JSON.stringify(content)], {type: contentType});
	// 	a.href = URL.createObjectURL(file);
	// 	a.download = fileName;
	// 	a.click();
	// 	// this.download(data, 'json.json', 'application/json');
	// }
}
