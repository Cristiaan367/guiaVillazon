import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { platoService } from '../../shared/model/platos/platos.service';
import { Plato } from '../../shared/model/platos/plato';
import { Observable } from 'rxjs/Observable';
import { Place } from '../../shared/model/place/place';

@IonicPage()
@Component({
  selector: 'page-new-plato',
  templateUrl: 'new-plato.html',
})
export class NewPlatoPage {
  places$: Observable<Place[]>;
  platos$: Observable<Plato[]>;
  place: Place;
  selectedId: string;
  idRest 
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public platoServ: platoService) {
      this.idRest = navParams.data;
      this.filterByArea(this.idRest);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPlatoPage'+ this.idRest);
    
  }


  filterByArea(id){
  	this.platos$ = this.platoServ.findByArea(id);
  	console.log(this.platos$);
  }

  delete(plato: Plato) {
      this.platoServ.delete(plato).subscribe(
        () => console.log('eliminado'),
        err => console.log('error al eliminar'+err)
      );

  }


  alertNewPlato() {
    let alert = this.alertCtrl.create({
      title: 'Agregar Plato al menu',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre Plato'
        },
        {
          name: 'detail',
          placeholder: 'Detalles'
        },
        {
          name: 'price',
          placeholder: 'Precio'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked'+ data);
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            let rest = {name:data.name, description:data.detail, price:data.price, placeId:this.idRest}
            this.save(rest)
          }
        }
      ]
    });
    alert.present();
  }

  save(platos){
    console.log(platos)
    let plato: Plato = Plato.fromJSON(platos);
    this.platoServ.create(plato).subscribe(()=>{
      //this.alerta();
      //this.navCtrl.pop();
      //this.navCtrl.push( MapRestaurantPage );
    })
    //this.nav.setRoot( ListRestaurantPage );
  }

}
