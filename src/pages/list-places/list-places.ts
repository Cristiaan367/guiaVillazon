import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Area } from './../../shared/model/area/area';
import { PlaceService } from './../../shared/model/place/place.service';
import { Place } from "../../shared/model/place/place";
import { PlacePage } from './../place/place';
import { MapPlacesPage } from './../map-places/map-places';


@IonicPage()
@Component({
  selector: 'page-list-places',
  templateUrl: 'list-places.html',
})
export class ListPlacesPage {

  placePage = PlacePage;
  mapPlacesPage = MapPlacesPage;
  area: Area;
  places$: Observable<Place[]>;
  terms 
  ordenar ='asc';
  descending: boolean = true;
  order: number;
  column: string = 'title';
  mod: string = "rest";

  constructor(public navCtrl: NavController, public navParams: NavParams, public placeService: PlaceService, public loadCtrl: LoadingController, public alertCtrl: AlertController)
  {
  }

  ionViewDidLoad() {
    const loader = this.loadCtrl.create({
      content: "",
      duration: 1000
    });
    loader.present();
    this.area = this.navParams.data;
    this.places$ = this.placeService.findByArea(this.area.$key);
  }

  buscarAlert() {
    const prompt = this.alertCtrl.create({
      title: 'Buscar Restaurante',
      inputs: [
        {
          name: 'buscar',
          placeholder: 'Buscar'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: 'Buscar',
          handler: data => {
            console.log('Saved clicked'+data.buscar);
            this.asignar(data.buscar);
          }
        }
      ]
    });
    prompt.present();
  }

  asignar(term){
    this.terms = term;  
  }

  sort(){
    if(this.ordenar === 'desc'){
      this.ordenar = 'asc';
    }else{
      this.ordenar = 'desc';
    }
  }

}
