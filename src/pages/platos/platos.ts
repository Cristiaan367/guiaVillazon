import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Plato } from '../../shared/model/platos/plato';
import { Place }from  '../../shared/model/place/place';  
import { platoService } from '../../shared/model/platos/platos.service';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the PlatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-platos',
  templateUrl: 'platos.html',
})
export class PlatosPage {
  platos$: Observable<Plato[]>;
  place = Place;
  id;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platoservice:platoService,) {
    this.place = navParams.data;
    this.id = this.place;
    console.log('aver: '+ this.place);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlatosPage');
    this.filterByArea(this.id);
  }


  filterByArea(id){
  	this.platos$ = this.platoservice.findByArea(id);
  	console.log(this.platos$);
  }

}
