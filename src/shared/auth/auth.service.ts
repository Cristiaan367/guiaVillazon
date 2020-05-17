import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
	private user: firebase.User;

	public userProfile: any;
	usuario: any;
	constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase ) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});

		this.userProfile = firebase.database().ref('users');
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then((newUser)=>{
			this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then((authenticatedUser)=>{
				this.userProfile.child(authenticatedUser.uid).set(
					credentials
				);
			});
		});

		//return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password).then( success => {
        //    console.log("Firebase success: " + JSON.stringify(success));
        //    this.userProfile.child(success.uid).set(success);
        //  });
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}
	getName(){
		return this.user.displayName;
	}
	getpic(){
		return this.user.photoURL
	}
	getid(){
		return this.user.uid;
	}

	signOut(){
		this.afAuth.auth.signOut();
	}

	signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}
	

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential.accessToken;
					// The signed-in user info.
					let user = result.user;

					console.log(token, user);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}

	find(key: string){
		//return this.db.object(`/areas/${key}`).map(this.usuario.fromJSON);
	  }

}
