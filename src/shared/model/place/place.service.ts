import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../common/firebase.service';
import { Place } from './place';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import { AuthService } from '../../auth/auth.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';


@Injectable()
export class PlaceService extends FirebaseService {

  constructor(private db: AngularFireDatabase, public auth:AuthService) {
    super();
  }


  find(key: string): Observable<Place> {
    return this.db.object(`/places/${key}`).map(Place.fromJSON);
  }

  findAll(): Observable<Place[]> {
    return this.db.list('/places').map(Place.fromJSONArray);
  }

  findByArea(areaId: string): Observable<Place[]> {

    return this.db.list(`/placesPerArea/${areaId}`)
      .map(places => places.map(place => place.$key))
      .map(places => places.map(placeKey => this.db.object(`/places/${placeKey}`)))
      .flatMap(places => (places.length === 0) ? Observable.of([]) : Observable.combineLatest(places))
      .map(this.sortPlacesByPriority);
  }

  findByAdmin(userId: string): Observable<Place[]> {

    return this.db.list(`/placesPerAdmin/${userId}`)
      .map(places => places.map(place => place.$key))
      .map(places => places.map(placeKey => this.db.object(`/places/${placeKey}`)))
      .flatMap(places => (places.length === 0) ? Observable.of([]) : Observable.combineLatest(places))
      .map(this.sortPlacesByPriority);
  }

  findByUser(userId: string): Observable<Place[]> {

    return this.db.list(`/userPerPlace/${userId}`)
      .map(places => places.map(place => place.$key))
      .map(places => places.map(placeKey => this.db.object(`/places/${placeKey}`)))
      .flatMap(places => (places.length === 0) ? Observable.of([]) : Observable.combineLatest(places))
      .map(this.sortPlacesByPriority);
  }

  sortPlacesByPriority(places: Place[]): Place[] {
    return places.sort((a: Place, b: Place) => {
      return a.priority -  b.priority;
    });
  }

  create(place: Place): Observable<any> {
    delete place.$key;
    let admin = this.auth.getid();
    const newPlaceKey: string = this.db.list('/places').push(null).key;
    let updates: any = {};

    updates[`/places/${newPlaceKey}`] = place;
    updates[`/placesPerArea/${place.areaId}/${newPlaceKey}`] = true;
    updates[`/placesPerAdmin/${admin}/${newPlaceKey}`] = true;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);

  }
  
  savePictureUser(idrest, picture): Observable<any> {

    let link;
    /*updates[`/places/${newPlaceKey}`] = place;
    updates[`/placesPerArea/${place.areaId}/${newPlaceKey}`] = true;
    updates[`/placesPerAdmin/${admin}/${newPlaceKey}`] = true;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);*/
    firebase.storage().ref('/restaurante').child('restaurante')
    .child(idrest + 'Picture.jpg')
    .putString(picture, 'base64', {contentType: 'image/jpeg'})
    .then((savedPicture) => {
     link = savedPicture.downloadURL;
    //var post = this.DbRef.push(resraurante).key;
    var updates={};
    updates[`/places/${idrest}/images/0`] = link;
    //updates['/places/'+idrest+'/'+images+/] = true;
    //updates['/CategoriaRestaurante/'+resraurante['ciudad']+'/'+post] = true;
    firebase.database().ref('/').update(updates);
    //this.DbRef.update(updates);

    });
    return 

  }
  saveCords(lat, lng, plc){

    let updates: any = {};

    updates[`/places/${plc.$key}/latitude`] = lat;
    updates[`/places/${plc.$key}/longitude`] = lng;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);
  }

  /*public saveFruit(fruit){
    let key = this.afDB.list('/fruits/').push(fruit).key;
    //Guardamos la fruta y obetenemos el id que firebase pone al nudulo de nuestra fruta.
    //Al guardarse sin id nuestra fruta, ahora la actualizamos con el id que firebase nos devuelve.
    fruit.id = key;
    this.afDB.database.ref('fruits/'+fruit.id).set(fruit);
   }*/

  savePlace(user, idplace): Observable<any> {
    //delete place.$key;

    //const newPlaceKey: string = this.db.list('/userPerPlace').push(null).key;
    let updates: any = {};

    //updates[`/places/${newPlaceKey}`] = place;
    updates[`/userPerPlace/${user}/${idplace}`] = true;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);

  }


  update(place: Place): Observable<any> {
    let updatedPlace: Place = Object.assign({}, place);
    delete updatedPlace.$key;
    const action: firebase.Promise<any> = this.db.list('/places').update(place.$key, updatedPlace);
    return super.actionAsObservable(action);
  }

  delete(place: Place,idAdmin): Observable<any> {
    let updates: any = {};

    updates[`/places/${place.$key}`] = null;
    updates[`/placesPerArea/${place.areaId}/${place.$key}`] = null;
    updates[`/placesPerAdmin/${idAdmin}/${place.$key}`] = null;


    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);
  }

  deleteFav(user): Observable<any> {
    let updates: any = {};

    //updates[`/places/${place.$key}`] = null;
    updates[`/userPerPlace/${user}`] = null;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);
  }


  uploadImages(place: Place, files: File[] | File): void {
    if (files instanceof FileList) {
      _.each(files, (file) => this.uploadImage(place, file));
    } else {
      this.uploadImage(place, files);
    }
  }

  uploadImage(place: Place, file: any): void {
    let storageRef: firebase.storage.Reference = firebase.storage().ref();
    let uploadTask: firebase.storage.UploadTask = storageRef.child(`places/images/${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { console.log('Place files uploaded'); },
      (error) => { console.warn('Place error uploading files:', error.message); },
      () => {
        if (!place.images) place.images = [];
        place.images.push(uploadTask.snapshot.downloadURL);
        this.update(place);
      }
    );

  }

  guardarCordenadas(id, lat, lng){
    var updates={};
    updates['/place/'+id+'/lat']=lat;
    updates['/place/'+id+'/lng']=lng;
     return this.db.object('/').update(updates);
  }

}

