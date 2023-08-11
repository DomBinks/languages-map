import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MapComponent } from '../map/map.component';
import { SelectLanguageComponent } from '../select-language/select-language.component';

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

}
