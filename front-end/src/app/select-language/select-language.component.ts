import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" (change)="languageChange($event, 'english')">
        <label class="form-check-label" for="flexCheckDefault">
          English
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" (change)="languageChange($event, 'french')">
        <label class="form-check-label" for="flexCheckChecked">
          French
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" (change)="languageChange($event, 'spanish')">
        <label class="form-check-label" for="flexCheckChecked">
          Spanish
        </label>
      </div>
    </div>
  `,
  styleUrls: ['./select-language.component.css']
})

export class SelectLanguageComponent {
  languageChange(event: Event, language: String) {
    if(((event.target) as HTMLInputElement).checked) {
      console.log("Checked " + language);
    }
    else {
      console.log("Not checked " + language);
    }
  }
}