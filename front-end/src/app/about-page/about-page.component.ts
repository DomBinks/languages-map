import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MapLayersService } from '../map-layers.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})

export class AboutPageComponent {
  // When the page loads
  ngOnInit() {
    // Remove all the current layers on the map
    this.layersService.layers = [];

    // For each list of layers for each language on the map
    for (let [key, value] of this.layersService.layersMap) {
      // Remove all the layers from the list
      this.layersService.layersMap.set(key, []);
    }
  }

  constructor(private layersService: MapLayersService) {}
}
