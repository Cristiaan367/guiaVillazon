import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController } from 'ionic-angular';
import { Place } from '../../shared/model/place/place';
import { PlaceService } from '../../shared/model/place/place.service';
import { Area } from '../../shared/model/area/area';
import { AreaService } from '../../shared/model/area/area.service';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the EditRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-restaurant',
  templateUrl: 'edit-restaurant.html',
})
export class EditRestaurantPage {
  rest: Place;
  @ViewChild(Nav) nav: NavController;
  areas$: Observable<Area[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public placeServ: PlaceService,
    public areaService: AreaService, public alertCtrl: AlertController) {
  this.rest = navParams.data;
  }

  ionViewDidLoad() {
    this.areas$ = this.areaService.findAll();
    console.log('ionViewDidLoad EditRestaurantPage');
  }

  update(){
    //this.placeServ.update(this.rest);
    const confirm = this.alertCtrl.create({
      title: 'confirmar',
      message: 'Esta seguro de Actualizar los datos del restaurate?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            this.placeServ.update(this.rest);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  cancelar(){
    this.navCtrl.pop();
  }

}
