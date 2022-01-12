import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-maoa',
  templateUrl: './mini-maoa.component.html',
  styles: [
    `
    div{
      width:100%;
      height:150px;
      margin:0px;
    }`
  ]
})
export class MiniMaoaComponent implements AfterViewInit {

  @Input() lngLat:[number, number] = [0, 0];
  @ViewChild('mapa') divMapa!:ElementRef;

  
  zoomLevel : number  = 15;
  center:[number, number] = [-70.66060651142959,-33.44555948505073]
  constructor() { }

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      // mapa solventar el container debemos colocar el id de elemento que contendra el mapa.
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat ,
      zoom: this.zoomLevel,
      interactive:false
    }); 

    // crear el marcador
    new mapboxgl.Marker().setLngLat(this.lngLat).addTo(mapa)
  }

}
