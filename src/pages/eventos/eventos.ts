import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Evento } from './../../shared/model/events/events';
import { EventService } from './../../shared/model/events/events.service';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {
	showLoader: boolean =  true;
	loading:Loading;
	events$: Observable<Evento[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService:EventService, public loadingCtrl:LoadingController,
   ) {
  }

  ionViewDidLoad() {
    this.events$ = this.eventService.findAll({orderByChild: 'priority'});
    console.log('ionViewDidLoad EventosPage' + this.events$);
  }

  ionViewDidEnter(){
  	if(!this.showLoader) return;
  	this.loading = this.loadingCtrl.create({
  		content:'Cargando eventos y noticias..',
  		duration: 3000
  	});

  	this.loading.present();
  	this.showLoader =  false;
  }

}
