import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'eco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	ngOnInit(): void {
		this.initMap();
	}
  constructor() {

	}

	initMap() {
		const map = L.map('map').setView([51.505, -0.09], 13);
		L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
			subdomains:['mt0','mt1','mt2','mt3'],
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
	}
}
