import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {BehaviorSubject} from 'rxjs';

interface Legend {
	name: string
	color: string
	count: 0
}

@Injectable({
	providedIn: 'root',
})
export class MapService {
	legends: Legend[] = [
		{
			name: 'Бумага',
			color: '#FFCF00',
			count: 0,
		}, {
			name: 'Стекло',
			color: '#8CDFD6',
			count: 0,
		}, {
			name: 'Пластик',
			color: '#DB5A42',
			count: 0,
		}, {
			name: 'Металл',
			color: '#424B54',
			count: 0,
		}, {
			name: 'Иное',
			color: '#53599A',
			count: 0,
		}, {
			name: 'Одежда',
			color: '#A491D3',
			count: 0,
		}, {
			name: 'Опасные отходы',
			color: '#000000',
			count: 0,
		}, {
			name: 'Батарейки',
			color: '#2364AA',
			count: 0,
		}, {
			name: 'Лампочки',
			color: '#0F7173',
			count: 0,
		}, {
			name: 'Бытовая техника',
			color: '#A57F60',
			count: 0,
		}, {
			name: 'Тетра Пак',
			color: '#32CD32',
			count: 0,
		}, {
			name: 'Шины',
			color: '#C0C0C0',
			count: 0,
		}, {
			name: 'Крышечки',
			color: '#000080',
			count: 0,
		},
	]

	legendColorDictionary: object = this.setLegendColorDictionary()
	legendCountDictionary: object = this.setLegendCountDictionary()

	stream$: BehaviorSubject<any> = new BehaviorSubject(this.legendCountDictionary);

	mapBounds: L.LatLngBounds
	markers: L.Marker[] = []
	visibleMarkers: L.Marker[] = []

	constructor() {}

	setLegendCountDictionary(): object {
		const dictionary: object = {};
		this.legends.forEach((i: Legend) => dictionary[i.name] = 0);
		return dictionary;
	}

	setLegendColorDictionary(): object {
		const dictionary: object = {};
		this.legends.forEach((i: Legend) => dictionary[i.name] = i.color);
		return dictionary;
	}

	setMapBounds(bounds: L.LatLngBounds): void {
		this.mapBounds = bounds;
		this.visibleMarkers = this.markers.filter((i: L.Marker) => bounds.contains(i.getLatLng()));
		this.countMarkers();
	}

	countMarkers(): void {
		this.legendCountDictionary = this.setLegendCountDictionary();
		this.visibleMarkers.forEach((i: L.Marker) => {
			let recycleTypes: String[] = i.feature.properties.types;
			for (let i of recycleTypes) {
				this.legendCountDictionary[`${i}`]++;
			}
		});
		this.stream$.next(this.legendCountDictionary);
	}

	//behaviorSubject со всеми полями
}
