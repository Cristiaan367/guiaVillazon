import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { ListAreasPage } from '../list-areas/list-areas';
import { SignupPage } from '../signup/signup';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
	loginError: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth:AuthService, fb:FormBuilder) {
      this.loginForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
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


}
