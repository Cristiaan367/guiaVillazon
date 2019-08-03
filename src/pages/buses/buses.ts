import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BusesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buses',
  templateUrl: 'buses.html',
})
export class BusesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusesPage');
  }

  destinos = [

  {
  	"empresa":"AutoTrans. Tupiza",
  	"destino":"Uyuni",
  	"hora":"8:30"
  },
  {
  	"empresa":"Boqueron",
  	"destino":"Potosi",
  	"hora":"8:30"
  },
  {
  	"empresa":"Trans. Tentacion",
  	"destino":"Potosi",
  	"hora":"8:30"
  },
  {
  	"empresa":"Narvaez",
  	"destino":"Tarija",
  	"hora":"9:00"
  },
  {
  	"empresa":"SAMA",
  	"destino":"Tarija",
  	"hora":"9:00"
  },
  {
  	"empresa":"Trans. del Sur 1",
  	"destino":"La Paz",
  	"hora":"10:00"
  },
  {
  	"empresa":"Trans. Panamericano",
  	"destino":"Potosi",
  	"hora":"10:00"
  },
  {
  	"empresa":"Trans. Illimani",
  	"destino":"Cochabamba",
  	"hora":"11:00"
  },
  {
  	"empresa":"Trans. El Inca",
  	"destino":"La Paz",
  	"hora":"12:00"
  },
  {
  	"empresa":"Trans. del Norte",
  	"destino":"Potosi",
  	"hora":"13:00"
  },
  {
  	"empresa":"Trans. El Inca",
  	"destino":"La Paz",
  	"hora":"15:00"
  },
  {
  	"empresa":"Trans. del Sur 1",
  	"destino":"La Paz",
  	"hora":"15:00"
  },
  {
  	"empresa":"Trans. Illimani",
  	"destino":"La Paz",
  	"hora":"15:00"
  },
  {
  	"empresa":"Expreso Tupiza",
  	"destino":"La Paz",
  	"hora":"15:30"
  },
  {
  	"empresa":"Trans. illimani",
  	"destino":"Cochabamba",
  	"hora":"16:00"
  },
  {
  	"empresa":"AutoTrans. Tupiza",
  	"destino":"Uyuni",
  	"hora":"16:30"
  },
  {
  	"empresa":"Trans. Tentacion",
  	"destino":"Cochabamba",
  	"hora":"16:30"
  },
  {
  	"empresa":"Trans. 11 de Julio",
  	"destino":"Uyuni",
  	"hora":"16:00"
  },
  {
  	"empresa":"Trans. Azul",
  	"destino":"Oruro",
  	"hora":"17:40"
  },
  {
  	"empresa":"Trans. del Sur 1",
  	"destino":"Cochabamaba",
  	"hora":"18:00"
  },
  {
  	"empresa":"Trans. Trans del sur 1",
  	"destino":"La Paz",
  	"hora":"18:15"
  },
  {
  	"empresa":"Panamericanano",
  	"destino":"La Paz",
  	"hora":"18:30"
  },
  {
  	"empresa":"Trans. El Inca",
  	"destino":"La Paz",
  	"hora":"18:30"
  },
  {
  	"empresa":"Trans.  del Sur 1",
  	"destino":"La Paz",
  	"hora":"19:00"
  },
  {
  	"empresa":"Trans. Illimani",
  	"destino":"Oruro - La Paz",
  	"hora":"19:00"
  },
  {
  	"empresa":"Trans. Narvaez",
  	"destino":"Tarija",
  	"hora":"19:30"
  },
  {
  	"empresa":"Expreso Tupiza",
  	"destino":"LA Paz",
  	"hora":"19:30"
  },
  {
  	"empresa":"Trans. Narvaez",
  	"destino":"Tarija",
  	"hora":"19:30"
  },
  {
  	"empresa":"6 de Octubre",
  	"destino":"Sucre",
  	"hora":"20:00"
  },
  {
  	"empresa":"Real Audiencia",
  	"destino":"Sucre",
  	"hora":"20:00"
  },
  {
  	"empresa":"Trans. del Sur 1",
  	"destino":"Sucre",
  	"hora":"20:30"
  },
  {
  	"empresa":"Crucero del Sur ",
  	"destino":"Sucre",
  	"hora":"20:30"
  },
  {
  	"empresa":"Trans. SAMA",
  	"destino":"Tarija",
  	"hora":"20:30"
  },
  {
  	"empresa":"Oglobo",
  	"destino":"Potosi",
  	"hora":"20:30"
  },
  {
  	"empresa":"Villa Imperial",
  	"destino":"Potosi",
  	"hora":"20:30"
  },
  {
  	"empresa":"Expreso Tarija",
  	"destino":"Tarija",
  	"hora":"20:30"
  },
  {
  	"empresa":"Flota Mundo",
  	"destino":"Potosi",
  	"hora":"21:00"
  },
  {
  	"empresa":"Chicheño",
  	"destino":"Potosi",
  	"hora":"21:00"
  },
  {
  	"empresa":"Trans. Narvaez",
  	"destino":"Tarija",
  	"hora":"21:30"
  },
  {
  	"empresa":"Trans. Boqueron",
  	"destino":"Potosi",
  	"hora":"22:00"
  },
  {
  	"empresa":"Trans. Diamante",
  	"destino":"Potosi",
  	"hora":"22:00"
  },
  ]
}
