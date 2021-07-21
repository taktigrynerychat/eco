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
	}

	fetchData(): any {
		this.http.get('./assets/markers.json').subscribe((data) => {
			// this.download(data, 'json.json', 'application/json');
			let counter = 0;
			for (let i in data) {
				if (counter > 10) { break; }
				L.circle([data[i].lat, data[i].lng], {color: 'green', fillColor: 'green', radius: 5}).addTo(this.map);
				counter++;
			}
		});
	}

	initMap() {
		this.map = L.map('map', {
			attributionControl: false
		}).setView([59.9392259, 30], 10);
		L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
			subdomains:['mt0','mt1','mt2','mt3']
		}).addTo(this.map);
		this.fetchData();
	}
}
