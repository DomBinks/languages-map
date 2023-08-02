import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import uk from '../assets/gb.json';
import france from '../assets/fr.json';
import spain from '../assets/es.json';
import english from '../assets/english.json';

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

  // Get the prefix and suffix of the URL used to get the geojson data
  public urlPrefix: string = "https://overpass-api.de/api/interpreter?data=[out:json];rel[admin_level=2][\"ISO3166-1\"=\""
  public urlSuffix: string = "\"];out%20geom;"

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

  addEnglish() {
    // For each country in the list of countries that speak English
    for(let i = 0; i < 10; i++)
    {
      // Print the url to get the JSON for the country
      console.log(this.urlPrefix + english.countries[i].toUpperCase() + this.urlSuffix);

      // Get the JSON using the Overpass API
      fetch(this.urlPrefix + english.countries[i].toUpperCase() + this.urlSuffix
      ).then((response) => {
        // Return the response as a JSON
        return response.json()
      }).then((data) => {
        // Print the JSON
        console.log(data);

        // Create a Leaflet Layer using the data returned
        // DOESN'T WORK AS DATA ISN'T A GEOJSON - NEEDS CONVERTING
        let layer: Leaflet.Layer = Leaflet.geoJSON(data as any, {style: {'color': '#00FF00'}});

        // Add the layer to the layers on the map
        this.layers.push(layer);
      })
    }
  }

  removeEnglish() {

  }

  constructor() {}
}
