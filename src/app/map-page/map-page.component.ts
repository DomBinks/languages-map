import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MapComponent } from '../map/map.component';
import { SelectLanguageComponent } from '../select-language/select-language.component';
import { MapLayersService } from '../map-layers.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MapComponent,
    SelectLanguageComponent,
  ],
  template: `
    <div class="content">
      <app-map></app-map>
      <app-select-language></app-select-language>
    </div>
  `,
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent {
  // When loading the map page
  ngOnInit() {
    // For all the languages in the checked list
    this.layersService.checked.forEach(elem =>
      // Check the checkbox for that language
      (<HTMLInputElement> document.getElementById(elem)).checked = true
    );

    // For all the languages in the disabled list
    this.layersService.disabled.forEach(elem =>
      // Disable the checkbox for that language
      (<HTMLInputElement> document.getElementById(elem)).disabled = true
    );
  }

  constructor(private layersService: MapLayersService) {}
}
