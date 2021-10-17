import { Component, OnInit } from '@angular/core';
import {Map} from 'leaflet';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet.markercluster';
//import Any = jasmine.Any;

@Component({
  selector: 'eco-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit{
  map: Map;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
  }

  // download(content, fileName, contentType) {
  //   let a = document.createElement('a');
  //   let file = new Blob([JSON.stringify(content)], {type: contentType});
  //   a.href = URL.createObjectURL(file);
  //   a.download = fileName;
  //   a.click();
  //   // this.download(data, 'json.json', 'application/json');
  // }

  fetchData(): any {
    this.http.get('./assets/markers.json').subscribe((data: Object) => {
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
              iconSize: [12, 12],
              iconAnchor: [8, 7],
              html: `<div class="marker" title="${data[i].content_text}">${badge}</div>`,
            }),
          }),
        );
        // L.circle([data[i].lat, data[i].lng], {color: 'green', fillColor: 'green', radius: 1}).addTo(this.map);
        counter++;
      }
      this.map.addLayer(markerCluster);
    });
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
}
