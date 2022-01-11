import { Component} from '@angular/core';

interface menuItem {
  ruta:string;
  nombre:string;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `li{
      cursor:pointer
    }`
  ]
})
export class MenuComponent  {

  // Crear un menú del tipo menuItem
  menuItems : menuItem[]=[
    // asignar los valores
    {
      ruta:'/mapas/fullscreen',
      nombre:'fullscreen'
    },
    {
      ruta:'/mapas/zoom-range',
      nombre:'zoom-range'
    },
    {
      ruta:'/mapas/marcadores',
      nombre:'marcadores'
    },
    {
      ruta:'/mapas/propiedades',
      nombre:'propiedades'
    }
  ]

}
