import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {HttpClient} from "@angular/common/http";
import {Map} from "leaflet";
@Component({
  selector: 'eco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
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
			for (let i in data) {
				if (counter > 50) { break; }
				let recycleTypes = data[i].content_text.split(', ');
				let badge = recycleTypes.length == 1 ? recycleTypes[0][0] : recycleTypes.length;
				L.marker([data[i].lat, data[i].lng], { icon: L.divIcon({
						className: 'custom-div-icon',
						iconSize: [12, 12],
						iconAnchor: [8, 7],
						html: `<div class="marker" title="${data[i].content_text}">${badge}</div>`
					})
				}).addTo(this.map);
				// L.circle([data[i].lat, data[i].lng], {color: 'green', fillColor: 'green', radius: 1}).addTo(this.map);
				counter++;
			}
		});
	}

	initMap() {
		this.map = L.map('map', {
			attributionControl: false
		}).setView([59.88, 30.3], 10);
		L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
			subdomains:['mt0','mt1','mt2','mt3']
		}).addTo(this.map);
		this.fetchData();
	}
}
