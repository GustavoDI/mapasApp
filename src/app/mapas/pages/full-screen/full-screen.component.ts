import { Component, OnInit } from '@angular/core';
// la importacion de esto se hace de la siguiente forma.
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `#mapa{
      width:100%;
      height:100%;
    }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // esto arroja un error de la manera normal y para solvertar que no aparezca se debe dejar de esta forma
    // (mapboxgl as any).accessToken = environment.mapboxToken;
    var map = new mapboxgl.Map({
      // mapa solventar el container debemos colocar el id de elemento que contendra el mapa.
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.66060651142959,-33.44555948505073],
      zoom:16
    });
  }
   
}
