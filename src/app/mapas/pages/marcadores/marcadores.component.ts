import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [

    `.mapa-container{
      width:100%;
      height:100%;
    }

    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map;

  zoomLevel : number  = 15;
  center:[number, number] = [-70.66060651142959,-33.44555948505073]
  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      // mapa solventar el container debemos colocar el id de elemento que contendra el mapa.
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center ,
      zoom: this.zoomLevel
    });

    const marker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.mapa)
  }

}
