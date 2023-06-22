import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MapComponent
  ],
  template: `
    <app-map></app-map>
  `,
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent {

}
