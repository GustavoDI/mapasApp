import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `.mapa-container{
      width:100%;
      height:100%;
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom:50px;
      left:50px;
      padding: 10px;
      position: fixed;
      z-index: 999; 
      width:400px;
    }
    `
  ]
})

/**
 * por ciclo de vida en el oninit no se pued einicializar debido que el mapa carga despues de iniciar la aplicaciony  no con la aplicación.
 * es por esto que se necesita el afterInit para que logre inizializar el mapa
 */
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map;

  zoomLevel : number  = 10;
  center:[number, number] = [-70.66060651142959,-33.44555948505073]

  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoomend', ()=>{});
    this.mapa.off('move', ()=>{});
  }

      
    ngAfterViewInit(): void {
     // esto arroja un error de la manera normal y para solvertar que no aparezca se debe dejar de esta forma
    // (mapboxgl as any).accessToken = environment.mapboxToken;
    this.mapa = new mapboxgl.Map({
      // mapa solventar el container debemos colocar el id de elemento que contendra el mapa.
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center ,
      zoom: this.zoomLevel
    });
    // on es como un event listener y es un metodo de mapbox

    // obtener el zoom del mapa
    this.mapa.on('zoom', ()=>{
      this.zoomLevel = this.mapa.getZoom();
    });

    // restringir el zoom a 18
    this.mapa.on('zoomend',()=>{
      if (this.mapa.getZoom()>18) {
        this.mapa.zoomTo(18);
      }
    })

    // Movimiento del mapa
    this.mapa.on('move',(event)=>{
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.center = [lng, lat];
    })
  }

  zoomOut(){
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }
  zoomIn(){
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio(valor:string){
    this.mapa.zoomTo(Number(valor))
  }

}
