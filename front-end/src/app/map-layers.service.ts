import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import osmtogeojson from 'osmtogeojson';
import english from '../assets/english.json';
import french from '../assets/french.json';
import spanish from '../assets/spanish.json';

@Injectable({
  providedIn: 'root'
})
export class MapLayersService {
  // Stores all the current layers on the map
  public layers: Array<Leaflet.Layer> = [];

  // Get the prefix and suffix of the URL used to get the geojson data
  public urlPrefix: string = "https://overpass-api.de/api/interpreter?data=[out:json];rel[admin_level=2][\"ISO3166-1\"=\""
  public urlSuffix: string = "\"];out%20geom;"

  // Add the specified language's layer(s) to the array
  addLayer(language: string) {
    // The number of countries that speak this language
    let numCountries: number = 0;
    // The countries that speak this languge
    let countries: Array<string> = [];
    // The color that countries that speak this language should be
    let color: Leaflet.GeoJSONOptions = {};

    // Set the number of countries, countries, and color for the 
    // specified language
    if(language == "en")
    {
      numCountries = 71;
      countries = english.countries;
      color = {style: {'color': '#00FF00'}};
    }
    else if(language == "fr")
    {
      numCountries = 28;
      countries = french.countries;
      color = {style: {'color': '#0000FF'}};
    }
    else if(language == "es")
    {
      numCountries = 20;
      countries = spanish.countries;
      color = {style: {'color': '#FF0000'}};
    }

    // For each country in the array of countries that speak this
    // language
    for(let i = 0; i < numCountries; i++)
    {
      // Get the JSON using the Overpass API
      fetch(this.urlPrefix + countries[i].toUpperCase() + this.urlSuffix
      ).then((response) => {
        // Return the response as an OSM JSON
        return response.json()
      }).then((data) => {
        // Convert the OSM JSON to a GeoJSON
        let json: any = osmtogeojson(data);

        // Create a Leaflet Layer using the GeoJson
        let layer: Leaflet.Layer = Leaflet.geoJSON(json as any, color);

        // Add the layer to the layers on the map
        this.layers.push(layer);
      })
    }
  }

  // Removed the specified language's layer(s) from the array
  removeLayer(language: string) {
    console.log("Need to reimplement");
    /*
    // Loop through each layer
    for(let i = 0; i < this.layers.length; i++)
    {
      // remove the layer if the language matches the layer
      if(language == "en")
      {
        this.layers.splice(i, 1);
      }
      if(language == "fr")
      {
        this.layers.splice(i, 1);
      }
      if(language == "es")
      {
        this.layers.splice(i, 1);
      }
    }
    */
  }

  constructor() {}
}
