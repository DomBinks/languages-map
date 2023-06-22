import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MapComponent
  ],
  template: `
    <h1>Test</h1>
  `,
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent {

}
