import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule
  ],
  template: `
    <div>
      <p>Top</p>
      <div clas="map" style="width: 900px; height: 900px" leaflet [leafletOptions]="options"></div>
      <p>Bottom</p>
    </div>
  `,
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 14,
    center: new Leaflet.LatLng(0, 0)
  }
}
export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as Leaflet.TileLayerOptions),
  ] as Leaflet.Layer[];
};