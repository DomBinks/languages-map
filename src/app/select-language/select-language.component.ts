import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapLayersService } from '../map-layers.service';

@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css']
})

export class SelectLanguageComponent {
  // Called when a language selection checkbox is changed
  languageChange(event: Event, language: string) {
    // If the checkbox has been checked
    if(((event.target) as HTMLInputElement).checked) {
      this.layersService.checked.push(language); // Add this language to the checked list
      this.layersService.disabled.push(language); // Add this language to the disabled list
      (<HTMLInputElement> document.getElementById(language)).disabled = true; // Disable the checkbox while adding
      this.layersService.addLayers(language); // Add each country that speaks this language to the layers array
    }
    // If the checkbox has been unchecked
    else {
      this.layersService.checked = this.layersService.checked.filter((elem) => elem !== language); // Remove this language from the checked list
      this.layersService.removeLayers(language); // Remove each country that speaks this language from the layers array
    }
  }

  constructor(private layersService: MapLayersService) {}
}