import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController, AlertController } from 'ionic-angular';
import { Area } from './../../shared/model/area/area';
import { AreaService } from '../../shared/model/area/area.service';
import { Observable } from 'rxjs/Observable';
import { ListPlacesPage } from '../list-places/list-places';
import { Network } from '@ionic-native/network';
@IonicPage()
@Component({
  selector: 'page-list-areas',
  templateUrl: 'list-areas.html',
})
export class ListAreasPage {
  showLoader: boolean = true;
  loading: Loading
  listPlaces = ListPlacesPage;
  areas$: Observable<Area[]>;
  areaDetail :string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public areaService: AreaService, public loadingCtrl: LoadingController,
  public toast: ToastController, private network: Network, public alert: AlertController) {
    
    this.network.onConnect().subscribe(()=>{
      this.toast.create({
        message:"Conexion a internet",
        duration: 6000
      }).present();
    });

    this.network.onDisconnect().subscribe(()=>{
      /*this.toast.create({
        message:"Conexion fallida porfavor active su conexion a internet",
        duration: 6000
      }).present();*/

      let alerta = this.alert.create({
        title: 'conexion fallida!!',
        subTitle:'porfavor active la conexion a internet ',
        buttons:['ok']
      });

      alerta.present();

    });


  }

  ionViewDidLoad() {
    this.areas$ = this.areaService.findAll({orderByChild: 'priority'});
  }

  ionViewDidEnter() {

    if (!this.showLoader) return;

    this.loading = this.loadingCtrl.create({
      content: 'Cargando Categorias...',
      duration: 3000
    });

    this.loading.present();
    this.showLoader = false;

  }



}
