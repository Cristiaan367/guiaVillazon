import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Nav } from 'ionic-angular';
import { AreaService } from '../../shared/model/area/area.service';
import { Area } from '../../shared/model/area/area';
import { PlaceService } from '../../shared/model/place/place.service';
//import { Place } from '../../shared/model/place/place';
import { ListRestaurantPage } from '../../pages/list-restaurant/list-restaurant';
import { Place } from '../../shared/model/place/place';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the NewRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-restaurant',
  templateUrl: 'new-restaurant.html',
})
export class NewRestaurantPage {
  @ViewChild(Nav) nav: NavController;
  areas$: Observable<Area[]>;
  public base64Image;
  public picture;
  
  rest = {title:null, description:null, excerpt:null, address:null,contact:0, social:null,hour:null, areaId:null, images:[this.picture,this.picture]}
  constructor(public cameraPlugin: Camera, public navCtrl: NavController, public navParams: NavParams,
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
    })
    //this.nav.setRoot( ListRestaurantPage );
  }

  alerta(){
    const alert = this.alertCtrl.create({
      title: 'Registrado',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

  galletyOptions(){
    this.cameraPlugin.getPicture({
      quality: 70,
      allowEdit:  true,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.cameraPlugin.EncodingType.JPEG,
      targetWidth:720,
      targetHeight: 360,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.base64Image =  "data:image/jpeg;base64," + imageData;
      this.picture = imageData;
    }, error =>{
        console.log("ERROR ->" + JSON.stringify(error));
    });
  }

}
