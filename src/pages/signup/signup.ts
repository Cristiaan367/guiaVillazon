import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListAreasPage } from '../list-areas/list-areas';
import { AuthService } from '../../shared/auth/auth.service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupError: string;
	form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    fb:FormBuilder, private auth:AuthService) {
      this.form = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
		let data = this.form.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
			() => this.navCtrl.setRoot(ListAreasPage),
			error => this.signupError = error.message
		);
  }

}
