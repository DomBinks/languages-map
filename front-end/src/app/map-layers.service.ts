import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import uk from '../assets/gb.json';
import france from '../assets/fr.json';
import spain from '../assets/es.json';

@Injectable({
  providedIn: 'root'
})
export class MapLayersService {
  // Stores all the current layers on the map
  public layers: Array<Leaflet.Layer> = [];

  // Layers for each language
  public en: Leaflet.Layer = Leaflet.geoJSON(uk as any, {style: {'color': '#00FF00'}});
  public fr: Leaflet.Layer = Leaflet.geoJSON(france as any, {style: {'color': '#0000FF'}});
  public es: Leaflet.Layer = Leaflet.geoJSON(spain as any, {style: {'color': '#FF0000'}});

  // Add the specified language's layer(s) to the array
  addLayer(language: string) {
      if(language == "en")
      {
        this.layers.push(this.en);
      }
      if(language == "fr")
      {
        this.layers.push(this.fr);
      }
      if(language == "es")
      {
        this.layers.push(this.es);
      }
  }

  // Removed the specified language's layer(s) from the array
  removeLayer(language: string) {
    // Loop through each layer
    for(let i = 0; i < this.layers.length; i++)
    {
      // remove the layer if the language matches the layer
      if(language == "en" && this.layers[i] == this.en)
      {
        this.layers.splice(i, 1);
      }
      if(language == "fr" && this.layers[i] == this.fr)
      {
        this.layers.splice(i, 1);
      }
      if(language == "es" && this.layers[i] == this.es)
      {
        this.layers.splice(i, 1);
      }
    }
  }

  constructor() {}
}
