import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { ListAreasPage } from '../list-areas/list-areas';
import { SignupPage } from '../signup/signup';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginError: string;
  public userProfile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth:AuthService, fb:FormBuilder, private googlePlus: GooglePlus, public loadCtrl: LoadingController) {
      this.loginForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      this.userProfile = firebase.database().ref('users');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(ListAreasPage),
				error => this.loginError = error.message
			);
    }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {
  this.auth.signInWithGoogle()
    .then(
      () => this.navCtrl.setRoot(ListAreasPage),
      error => console.log(error.message)
    );
  }

  singGoogle(){
      this.googlePlus.login({
        'webClientId': '177051075379-ve05bi7tp602h1n7c0jn26uhpd7ia1rt.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then( success => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile.child(success.uid).set(success);

          })
          .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
        }).catch(err => console.error("Error: ", err));
  }

  presentLoading() {
    const loader = this.loadCtrl.create({
      content: "",
      duration: 2000
    });
    loader.present();
  }


}
