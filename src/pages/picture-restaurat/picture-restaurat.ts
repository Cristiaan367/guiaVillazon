import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PlaceService } from '../../shared/model/place/place.service';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the PictureRestauratPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picture-restaurat',
  templateUrl: 'picture-restaurat.html',
})
export class PictureRestauratPage {

  public idRest
  base64Image
  picture
  constructor(public placeServ: PlaceService, public navCtrl: NavController, public navParams: NavParams, public cameraPlugin: Camera,
    public alertCtrl: AlertController) {

    this.idRest = navParams.data;
  }

  ionViewDidLoad() {
    console.log('Resultado: '+this.idRest);
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

  takePicture(){
    this.cameraPlugin.getPicture({
      quality : 70,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
       // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      //this.Picture is passing the string to our DB
      this.picture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  guardar(){
    this.placeServ.savePictureUser(this.idRest,this.picture)
    this.alerta();
    this.navCtrl.pop();
    //this.navCtrl.setRoot( NewRestaurantPage );
  }

  alerta(){
    const alert = this.alertCtrl.create({
      title: 'guardado',
      subTitle: 'imagen guardada exitosamente',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  cancelar(){
    this.navCtrl.pop();
  }
}
