import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapLayersService } from '../map-layers.service';

@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" (change)="languageChange($event, 'en')">
        <label class="form-check-label" for="flexCheckDefault">
          English
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" (change)="languageChange($event, 'fr')">
        <label class="form-check-label" for="flexCheckChecked">
          French
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" (change)="languageChange($event, 'es')">
        <label class="form-check-label" for="flexCheckChecked">
          Spanish
        </label>
      </div>
    </div>
  `,
  styleUrls: ['./select-language.component.css']
})

export class SelectLanguageComponent {
  // Called when a language selection checkbox is changed
  languageChange(event: Event, language: String) {
    // If the checkbox has been checked
    if(((event.target) as HTMLInputElement).checked) {
      this.layersService.addLayers(language); // Add each country that speaks this language to the layers array
    }
    // If the checkbox has been unchecked
    else {
      this.layersService.removeLayers(language); // Remove each country that speaks this language from the layers array
    }
  }
  
  constructor(private layersService: MapLayersService) {}
}