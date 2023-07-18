import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LatLngExpression } from 'leaflet';
import * as Leaflet from 'leaflet';
import uk from './UK.json';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule
  ],
  template: `
    <div class="map" style="width: 100%; height: 750px;"
      leaflet [leafletOptions]="options" [leafletLayers]="layers"></div>
  `,
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 2,
    maxZoom: 14,
    minZoom: 2,
    center: new Leaflet.LatLng(0, 0),
  };

  coords: number[][] = uk.features[0].geometry.coordinates[0][0];

  layers: Array<Leaflet.Layer> = [
      //Leaflet.polygon([[ 51.49995, -0.1248 ], [ 51.49995, 0.1248 ], [ 52.49995, -0.1248 ]]),
      //Leaflet.polygon(this.coords as LatLngExpression[])
      Leaflet.geoJSON(uk as any),
  ];
}
export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href=https://www.openstreetmap.org/copyright target="_blank">OpenStreetMap</a> contributors'
    } as Leaflet.TileLayerOptions),
  ] as Leaflet.Layer[];
};