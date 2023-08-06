import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import { MapLayersService } from '../map-layers.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule
  ],
  template: `
    <div class="map" style="width: 1100px; height: 750px;"
      leaflet [leafletOptions]="options" [leafletLayers]="this.layersService.layers"></div>
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

  constructor(public layersService: MapLayersService) {}
}
export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href=https://www.openstreetmap.org/copyright target="_blank">OpenStreetMap</a> contributors'
    } as Leaflet.TileLayerOptions),
  ] as Leaflet.Layer[];
};