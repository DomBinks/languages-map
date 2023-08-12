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

  // Stores the number of countries for each language
  public numCountriesMap: Map<string, number> = new Map<string,number>([
    ["en", 71],
    ["fr", 28],
    ["ab", 24],
    ["es", 20],
    ["pt", 9],
    ["ru", 5],
    ["md", 3],
    ["jp", 2],
    ["kr", 2],
    ["hd", 1]
  ]);

  // Storest the list of countries for each language
  public countriesMap: Map<string, any> = new Map<string,any>([
    ["en", english.countries],
    ["fr", french.countries],
    ["ab", arabic.countries],
    ["es", spanish.countries],
    ["pt", portuguese.countries],
    ["ru", russian.countries],
    ["md", mandarin.countries],
    ["jp", japanese.countries],
    ["kr", korean.countries],
    ["hd", hindi.countries],
  ]);

  // Stores the color for each language
  public colorMap: Map<string, any> = new Map<string,any>([
    ["en", {style: {'color': '#00FF00'}}],
    ["fr", {style: {'color': '#0000FF'}}],
    ["ab", {style: {'color': '#00FFFF'}}],
    ["es", {style: {'color': '#FF0000'}}],
    ["pt", {style: {'color': '#008B00'}}],
    ["ru", {style: {'color': '#00008B'}}],
    ["md", {style: {'color': '#FFFF00'}}],
    ["jp", {style: {'color': '#640064'}}],
    ["kr", {style: {'color': '#8B0000'}}],
    ["hd", {style: {'color': '#FF00FF'}}],
  ]);

  // Stores all the layers for each language
  public layersMap: Map<string, Leaflet.Layer[]> = new Map<string,Leaflet.Layer[]>([
    ["en", []],
    ["fr", []],
    ["ab", []],
    ["es", []],
    ["pt", []],
    ["ru", []],
    ["md", []],
    ["jp", []],
    ["kr", []],
    ["hd", []],
  ]);

  // Get the prefix and suffix of the URL used to get the geojson data
  public urlPrefix: string = "https://overpass-api.de/api/interpreter?data=[out:json];rel[admin_level=2][\"ISO3166-1\"=\""
  public urlSuffix: string = "\"];out%20geom;"

  public checked: Array<string> = []; // Stores the languages that have checked checkboxes
  public disabled: Array<string> = []; // Stores the language that have disabled checkboxes

  // Add the specified language's layer(s) to the array
  addLayers(language: string) {
    let numCountries: number = this.numCountriesMap.get(language) || 0; // The number of countries that speak this language
    let countries: Array<string> = this.countriesMap.get(language); // The countries that speak this languge
    let color: Leaflet.GeoJSONOptions = this.colorMap.get(language); // The color that countries that speak this language should be
    let languageLayers: Leaflet.Layer[] = this.layersMap.get(language) || []; // The layers array each layer should be stored in

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

        // If all the layers have been added
        if(languageLayers.length == numCountries) {
          // Remove the language from the disabled list
          this.disabled = this.disabled.filter((elem) => elem !== language);
          // Enable the checkbox again
          (<HTMLInputElement> document.getElementById(language)).disabled = false;
        }
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
        }).then(() => {
          // If all the layers have been added
          if(languageLayers.length == numCountries) {
            // Remove the language from the disabled list
            this.disabled = this.disabled.filter((elem) => elem !== language);
            // Enable the checkbox again
            (<HTMLInputElement> document.getElementById(language)).disabled = false;
          }
        })
      }
    }
  }

  // Removed the specified language's layer(s) from the array
  removeLayers(language: string) {
    let languageLayers: Leaflet.Layer[] = this.layersMap.get(language) || []; // Get the layers array for this language

    // Remove all the layers in the layers array for this language from the current layers array
    this.layers = this.layers.filter((elem) => languageLayers.indexOf(elem) == -1);

    this.layersMap.set(language, []); // Set the layers array for this language to an empty array
  }

  constructor() {}
}
