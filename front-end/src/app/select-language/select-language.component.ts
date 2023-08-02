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
      // Add the correct layer(s) to the layers array for the language
      if(language == "en")
      {
        //this.layersService.addLayer("en");
        this.layersService.addEnglish();
      }
      if(language == "fr")
      {
        this.layersService.addLayer("fr");
      }
      if(language == "es")
      {
        this.layersService.addLayer("es");
      }
    }
    // If the checkbox has been unchecked
    else {
      // Remove the correct layers(s) from the layers array for the language
      if(language == "en")
      {
        //this.layersService.removeLayer("en");
        this.layersService.removeEnglish();
      }
      if(language == "fr")
      {
        this.layersService.removeLayer("fr");
      }
      if(language == "es")
      {
        this.layersService.removeLayer("es");
      }
    }
  }
  
  constructor(private layersService: MapLayersService) {}
}