import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlaceService } from '../../shared/model/place/place.service';
import { Place } from '../../shared/model/place/place';
import { Observable } from 'rxjs/observable';
import { PlacePage } from '../../pages/place/place';
import { platoService } from '../../shared/model/platos/platos.service';
import { Plato } from '../../shared/model/platos/plato';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  //segmento
  mod: string = "rest";
  places$: Observable<Place[]>;
  platos$: Observable<Plato[]>;
  placePage = PlacePage;
  restaurant: Observable<any>;
  searchQuery: string = '';
  items: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public placeServ:PlaceService, public platoServ: platoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.places$ = this.placeServ.findAll();
    //this.platos$ = this.platoServ.findAlls();
  }

  /*getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.places$ = this.places$.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }*/

  cargar(id){
    //this.restaurant = this.placeServ.find(id);
    //console.log('asd'+ id+ this.placeServ.find(id));
    //this.navCtrl.push(this.placePage , { data: this.restaurant })

  }

  rout(id){
   
    console.log('did:' + id);
    console.log('data: '+this.placeServ.find(id))
    //this.navCtrl.push(this.placePage , {  })
  }

}
