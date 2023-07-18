import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
  ],
  template: `
    <h1>Test</h1>
  `,
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent {

}
