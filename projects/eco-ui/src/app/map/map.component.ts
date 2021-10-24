import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import {Map} from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'eco-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
	map: Map;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.initMap();
	}

	initMap(): void {
		this.map = L.map('map', {
			attributionControl: false,
		}).setView([59.88, 30.3], 10);
		L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
			subdomains:['mt0','mt1','mt2','mt3'],
		}).addTo(this.map);
		this.fetchData();
	}

	fetchData(): void {
		this.http.get('./assets/markers.json').subscribe((data: object) => {
			let counter: number = 0;
			let markerCluster: L.MarkerClusterGroup = L.markerClusterGroup({
				iconCreateFunction: function (cluster: L.MarkerCluster) {
					let markers: Array<L.Marker> = cluster.getAllChildMarkers();
					return L.divIcon({
						html: `<div class="circle">${markers.length}</div>`,
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
				let badge: string | number = recycleTypes.length == 1 ? recycleTypes[0][0] : recycleTypes.length;
				markerCluster.addLayer(
					L.marker([data[i].lat, data[i].lng], {
						icon: L.divIcon({
							className: 'custom-div-icon',
							iconSize: [20, 20],
							iconAnchor: [8, 7],
							// html: `<div class="marker" title="${data[i].content_text}">${badge}</div>`,
							html: this.getMarker(),
						}),
					}),
				);
				// L.circle([data[i].lat, data[i].lng], {color: 'green', fillColor: 'green', radius: 1}).addTo(this.map);
				counter++;
			}
			this.map.addLayer(markerCluster);
		});
	}

	getMarker(): string {
		return `<svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
							${this.range(2).map((i: number) => this.segment(i)).join('\n  ')}
<!--							<circle cx="150" cy="150" r="100" fill="#fff"/>-->
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

	segment(n: number): string {
		const svgSize: number = 300;
		const segments: number = 2;
		const margin: number = 0;
		const radius: number = 150;
		const width: number = 150;

		const center: number = svgSize/2;
		const degrees: number = 360 / segments;
		const start: number = degrees * n;
		const end: number = (degrees * (n + 1 - margin) + (margin == 0 ? 1 : 0));
		const path: string = this.segmentPath(center, center, radius, radius-width, start, end);
		const fill: string = 'red';
		return `<path d="${path}" style="fill:${fill};stroke:none" />`;
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
