import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import osmtogeojson from 'osmtogeojson';
import english from '../assets/english.json';
import french from '../assets/french.json';
import spanish from '../assets/spanish.json';
import mandarin from '../assets/mandarin.json';
import hindi from '../assets/hindi.json';
import arabic from '../assets/arabic.json';
import portuguese from '../assets/portuguese.json';
import russian from '../assets/russian.json';
import japanese from '../assets/japanese.json';
import korean from '../assets/korean.json';

@Injectable({
  providedIn: 'root'
})
export class MapLayersService {
  public codeToGeoJSON: Map<string, any> = new Map<string, any>; // Cache for fetched GeoJSONs

  public layers: Array<Leaflet.Layer> = []; // Stores all the current layers on the map

  // Stores all the current layers for each languge;
  public englishLayers: Leaflet.Layer[] = []; // Stores the current Enlgish layers
  public frenchLayers: Leaflet.Layer[] = []; // Stores the current French layers
  public spanishLayers: Leaflet.Layer[] = []; // Stores the current Spanish layers
  public mandarinLayers: Leaflet.Layer[] = []; // Stores the current Mandarin layers
  public hindiLayers: Leaflet.Layer[] = []; // Stores the current Hindi layers
  public arabicLayers: Leaflet.Layer[] = []; // Stores the current Arabic layers
  public portugueseLayers: Leaflet.Layer[] = []; // Stores the current Portuguese layers
  public russianLayers: Leaflet.Layer[] = []; // Stores the current Russian layers
  public japaneseLayers: Leaflet.Layer[] = []; // Stores the current Japanese layers
  public koreanLayers: Leaflet.Layer[] = []; // Stores the current Korean layers

  // Get the prefix and suffix of the URL used to get the geojson data
  public urlPrefix: string = "https://overpass-api.de/api/interpreter?data=[out:json];rel[admin_level=2][\"ISO3166-1\"=\""
  public urlSuffix: string = "\"];out%20geom;"

  // Add the specified language's layer(s) to the array
  addLayers(language: String) {
    let numCountries: number = 0; // The number of countries that speak this language
    let countries: Array<string> = []; // The countries that speak this languge
    let color: Leaflet.GeoJSONOptions = {}; // The color that countries that speak this language should be
    let languageLayers: Leaflet.Layer[] = []; // The layers array each layer should be stored in

    // Set the number of countries, countries, color for the specified language, and language layers array
    if(language == "en")
    {
      numCountries = 71;
      countries = english.countries;
      color = {style: {'color': '#00FF00'}};
      languageLayers = this.englishLayers;
    }
    else if(language == "fr")
    {
      numCountries = 28;
      countries = french.countries;
      color = {style: {'color': '#0000FF'}};
      languageLayers = this.frenchLayers;
    }
    else if(language == "es")
    {
      numCountries = 20;
      countries = spanish.countries;
      color = {style: {'color': '#FF0000'}};
      languageLayers = this.spanishLayers;
    }
    else if(language == "md")
    {
      numCountries = 3;
      countries = mandarin.countries;
      color = {style: {'color': '#FFFF00'}};
      languageLayers = this.mandarinLayers;
 
    }
    else if(language == "hd")
    {
      numCountries = 1;
      countries = hindi.countries;
      color = {style: {'color': '#FF00FF'}};
      languageLayers = this.hindiLayers;
    }
    else if(language == "ab")
    {
      numCountries = 24;
      countries = arabic.countries;
      color = {style: {'color': '#00FFFF'}};
      languageLayers = this.arabicLayers;
    }
    else if(language == "pt")
    {
      numCountries = 9;
      countries = portuguese.countries;
      color = {style: {'color': '#008B00'}};
      languageLayers = this.portugueseLayers;
    }
    else if(language == "ru")
    {
      numCountries = 5;
      countries = russian.countries;
      color = {style: {'color': '#00008B'}};
      languageLayers = this.russianLayers;
    }
    else if(language == "jp")
    {
      numCountries = 2;
      countries = japanese.countries;
      color = {style: {'color': '#640064'}};
      languageLayers = this.japaneseLayers;
    }
    else if(language == "kr")
    {
      numCountries = 2;
      countries = korean.countries;
      color = {style: {'color': '#8B0000'}};
      languageLayers = this.koreanLayers;
    }

    // For each country in the array of countries that speak this language
    for(let i = 0; i < numCountries; i++)
    {
      // If this country's GeoJSON has already been found
      if(this.codeToGeoJSON.has(countries[i].toUpperCase()))
      {
        let layer: Leaflet.Layer = Leaflet.geoJSON(
          this.codeToGeoJSON.get(countries[i].toUpperCase()) as any, color); // Create a Leaflet Layer using the GeoJson
        this.layers.push(layer); // Add the layer to the layers on the map 
        languageLayers.push(layer); // Add the layer to the layers for this language

      }
      // If we need to fetch this country's GeoJSON
      else
      {
        // Get the JSON using the Overpass API
        fetch(this.urlPrefix + countries[i].toUpperCase() + this.urlSuffix
        ).then((response) => {
          return response.json() // Return the response as an OSM JSON
        }).then((data) => {
          let json: any = osmtogeojson(data); // Convert the OSM JSON to a GeoJSON

          // Remove any points on the map in the GeoJSON (the things that look like pins)
          json["features"] = json["features"].filter((feature: any) => feature["geometry"]["type"] != "Point");

          // Add this GeoJSON to the cache of fetched GeoJSONs
          this.codeToGeoJSON.set(countries[i].toUpperCase(), json);

          let layer: Leaflet.Layer = Leaflet.geoJSON(json as any, color); // Create a Leaflet Layer using the GeoJson
          this.layers.push(layer); // Add the layer to the layers on the map 
          languageLayers.push(layer); // Add the layer to the layers for this language
        })
      }
    }
  }

  // Removed the specified language's layer(s) from the array
  removeLayers(language: String) {
    let languageLayers: Leaflet.Layer[] = []; // The layers array for this language

    // Get the languageLayers array for this language
    if(language == "en")
    {
      languageLayers = this.englishLayers;
    }
    else if(language == "fr")
    {
      languageLayers = this.frenchLayers;
    }
    else if(language == "es")
    {
      languageLayers = this.spanishLayers;
    }
    else if(language == "md")
    {
      languageLayers = this.mandarinLayers;
 
    }
    else if(language == "hd")
    {
      languageLayers = this.hindiLayers;
    }
    else if(language == "ab")
    {
      languageLayers = this.arabicLayers;
    }
    else if(language == "pt")
    {
      languageLayers = this.portugueseLayers;
    }
    else if(language == "ru")
    {
      languageLayers = this.russianLayers;
    }
    else if(language == "jp")
    {
      languageLayers = this.japaneseLayers;
    }
    else if(language == "kr")
    {
      languageLayers = this.koreanLayers;
    }

    // For each layer for this languageLayers array
    languageLayers.forEach(element => {
        let index: number = this.layers.indexOf(element); // Get the index of this layer

        if(index != -1) // If this layer is in the array of layers on the map
        {
          this.layers.splice(index, 1); // Remove it from the array of layers on the map
        }
    });
  }

  constructor() {}
}
