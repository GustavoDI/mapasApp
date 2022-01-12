import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';


interface MarcadorColor {
  color:string;
  marker?: mapboxgl.Marker;
  centro?:[number,number];
  // al crear centro no ayuda a que nuestra interfaz nos permita hacer la flexible
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [

    `.mapa-container{
      width:100%;
      height:100%;
    }
    .list-group{
      position: fixed;
      top:20px;
      right:20px;
      z-index: 99;
    }
    li{
      cursor:pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map;

  zoomLevel : number  = 15;
  center:[number, number] = [-70.66060651142959,-33.44555948505073]

  // arreglo marcadores
  marcadores: MarcadorColor[] =[] ;


  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      // mapa solventar el container debemos colocar el id de elemento que contendra el mapa.
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center ,
      zoom: this.zoomLevel
    });
    this.leerLocalStorage();

    // const marker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.mapa)
  }

  irMarcador(marker: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({draggable:true, color}).setLngLat(this.center).addTo(this.mapa);
    this.marcadores.push({
      color, marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();
    nuevoMarcador.on('dragend', ()=>{
      this.guardarMarcadoresLocalStorage();
    });
  }

  guardarMarcadoresLocalStorage(){

    // crar arreglo para almacenar los datos
    const lngLatArr : MarcadorColor[]= [];

    this.marcadores.forEach(m =>{
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });

    })
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr) )
    

  }

  leerLocalStorage(){
    if (!localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr: MarcadorColor[]= JSON.parse( localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m =>{
      const newMarker =  new mapboxgl.Marker({
        color:m.color,
        draggable:true
      })
      .setLngLat(m.centro!).addTo(this.mapa)
      console.log(m.centro);
      this.marcadores.push({
        marker:newMarker,
        color: m.color
      });

      newMarker.on('dragend', ()=>{
        this.guardarMarcadoresLocalStorage();
      });
    })
  }
  // borrando los marcadores
  borrarMarcador(i: number){

    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadoresLocalStorage();
  }
}
