import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../shared/auth/auth.service'
import { comentarioService } from '../../shared/model/comentarios/comentario.service';
import { Comentario } from '../../shared/model/comentarios/comentario';

import { Observable } from 'rxjs';

/**
 * Generated class for the ComentariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {

  actual = new Date();
  idRest;
  comentarios$: Observable<Comentario[]>
  Comentario

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl:AlertController, public auth: AuthService,
     public comentServ: comentarioService ) {
      this.idRest = navParams.data;
      this.filterByArea(this.idRest);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentariosPage');
  }

  alertComentario() {
    let alert = this.alertCtrl.create({
      title: 'Enviar Comentario',
      inputs: [
        {
          name: 'coment',
          placeholder: 'Comentar'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked'+ data.coment);
          }
        },
        {
          text: 'enviar',
          handler: data => {
            console.log('comentario'+ data.coment)
            let rest = {coment:data.coment, datet:this.actual, name: this.auth.getEmail(), placeId:this.idRest}
            this.save(rest)
          }
        }
      ]
    });
    alert.present();
  }

  enviarComentario(){
    let rest = {coment:this.Comentario, datet:this.actual, name: this.auth.getEmail(), placeId:this.idRest}
    this.save(rest)
  }

  save(rest){
    console.log(rest)
    let comentario: Comentario = Comentario.fromJSON(rest);
    this.comentServ.create(comentario).subscribe(()=>{
      //this.alerta();
      //this.navCtrl.pop();
      //this.navCtrl.push( MapRestaurantPage );
      this.Comentario="";
    })
    //this.nav.setRoot( ListRestaurantPage );
  }

  filterByArea(id){
  	this.comentarios$ = this.comentServ.findByPlace(id);
  	console.log(this.comentarios$);
  }

}
