import {Component} from '@angular/core';
import {CapThemes} from '@cap-ng2/core/constants';
import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {HttpClient} from "@angular/common/http";
import {Map} from "leaflet";
import 'leaflet.markercluster';

@Component({
  selector: 'eco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'eco-ui';
  capThemes: typeof CapThemes = CapThemes;
  currentTheme: CapThemes;

  public hello(): void {
    console.log('HELLO!');
  }
export class AppComponent implements OnInit {
  map: Map;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.initMap();
	}

	download(content, fileName, contentType) {
		let a = document.createElement("a");
		let file = new Blob([JSON.stringify(content)], {type: contentType});
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
		// this.download(data, 'json.json', 'application/json');
	}

	fetchData(): any {
		this.http.get('./assets/markers.json').subscribe((data) => {
			let counter = 0;
			let markerCluster = L.markerClusterGroup({
				iconCreateFunction: function (cluster) {
					let markers = cluster.getAllChildMarkers();
					return L.divIcon({
						html: `<div class="circle">${markers.length}</div>`,
						className: 'mycluster',
						iconSize: L.point(32, 32)
					});
				},
				spiderfyOnMaxZoom: false,
				showCoverageOnHover: true,
				zoomToBoundsOnClick: false
			});
			for (let i in data) {
				let recycleTypes = data[i].content_text.split(', ');
				let badge = recycleTypes.length == 1 ? recycleTypes[0][0] : recycleTypes.length;
				markerCluster.addLayer(
					L.marker([data[i].lat, data[i].lng], {
						icon: L.divIcon({
							className: 'custom-div-icon',
							iconSize: [12, 12],
							iconAnchor: [8, 7],
							html: `<div class="marker" title="${data[i].content_text}">${badge}</div>`
						})
					})
				);
				// L.circle([data[i].lat, data[i].lng], {color: 'green', fillColor: 'green', radius: 1}).addTo(this.map);
				counter++;
			}
			this.map.addLayer(markerCluster);
		});
	}

	initMap() {
		this.map = L.map('map', {
			attributionControl: false,
		}).setView([59.88, 30.3], 10);
		L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
			subdomains:['mt0','mt1','mt2','mt3']
		}).addTo(this.map);
		this.fetchData();
	}
}
