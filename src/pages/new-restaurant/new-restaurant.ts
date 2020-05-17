import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Nav } from 'ionic-angular';
import { AreaService } from '../../shared/model/area/area.service';
import { Area } from '../../shared/model/area/area';
import { PlaceService } from '../../shared/model/place/place.service';
import { Place } from '../../shared/model/place/place';
import { MapRestaurantPage } from '../../pages/map-restaurant/map-restaurant'

@IonicPage()
@Component({
  selector: 'page-new-restaurant',
  templateUrl: 'new-restaurant.html',
})

export class NewRestaurantPage {
  @ViewChild(Nav) nav: NavController;
  areas$: Observable<Area[]>;
  mapRest: MapRestaurantPage;
  rest = {title:null, description:null, excerpt:null, address:null,contact:0, social:null,hour:null, areaId:null}
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public areaService: AreaService, public placeServ: PlaceService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.areas$ = this.areaService.findAll();
    //this.areaService.findAll().subscribe((areas: Area[]) => this.areas = areas )
    console.log('ionViewDidLoad NewRestaurantPage');
  }

  save(){
    let place: Place = Place.fromJSON(this.rest);
    this.placeServ.create(place).subscribe(()=>{
      this.alerta();
      this.navCtrl.pop();
      //this.navCtrl.push( MapRestaurantPage );
    })
    //this.nav.setRoot( ListRestaurantPage );
  }

  alerta(){
    const alert = this.alertCtrl.create({
      title: 'Registrado',
      subTitle: 'Su Restaurante Fue Registrado Correctamente. complete los siguiente formularios de ubicacion e imagenes.',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  cancelar(){
    this.navCtrl.pop();
  }



}
