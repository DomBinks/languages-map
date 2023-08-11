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
    <div class="map" style="height: 100%; width: 100%;"
      leaflet [leafletOptions]="options" [leafletLayers]="this.layersService.layers"></div>
  `,
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  bounds: Leaflet.LatLngBounds = Leaflet.latLngBounds(
    Leaflet.latLng(-90,-200),
    Leaflet.latLng(90, 200)
  );

  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 3,
    maxZoom: 14,
    minZoom: 3,
    center: new Leaflet.LatLng(51.4769, 0.0005),
    maxBounds: this.bounds,
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