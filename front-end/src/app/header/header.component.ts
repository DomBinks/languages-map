import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule],
  template: `
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/" [routerLink]="['/']">Lang Map</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a [routerLink]="['/']" [routerLinkActive]="['active']" class="nav-link" aria-current="page" href="/">Map</a>
            <a [routerLinkActive]="['active']" class="nav-link" href="/about">About</a>
          </div>
        </div>
      </div>
      </nav>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

}