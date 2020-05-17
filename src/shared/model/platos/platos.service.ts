import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../common/firebase.service';
import { Plato } from './plato';
import * as firebase from 'firebase';
import * as _ from 'lodash';


@Injectable()
export class platoService extends FirebaseService {

  constructor(private db: AngularFireDatabase) {
    super();
  }


  find(key: string): Observable<Plato> {
    return this.db.object(`/platos/${key}`).map(Plato.fromJSON);
  }

  findAll(query?: any): Observable<Plato[]> {
    let options: any = query ? { query } : {};
    return this.db.list('/platos', options).map(Plato.fromJSONArray);
  }
  
   findAlls(): Observable<Plato[]> {
    return this.db.list('/platos').map(Plato.fromJSONArray);
  }
  

  /*create(plato: Plato): Observable<any> {
    delete plato.$key;
    const action: firebase.Promise<any> = this.db.list('/platos').push(plato);
    return super.actionAsObservable(action);
  }*/

  create(plato: Plato): Observable<any> {
    delete plato.$key;

    const newPlaceKey: string = this.db.list('/platos').push(null).key;
    let updates: any = {};

    updates[`/platos/${newPlaceKey}`] = plato;
    updates[`/platosPerplace/${plato.placeId}/${newPlaceKey}`] = true;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);

  }

  findByArea(Id: string): Observable<Plato[]> {

    return this.db.list(`/platosPerplace/${Id}`)
      .map(platos => platos.map(plato => plato.$key))
      .map(platos => platos.map(platoKey => this.db.object(`/platos/${platoKey}`)))
      .flatMap(platos => (platos.length === 0) ? Observable.of([]) : Observable.combineLatest(platos))
      .map(this.sortPlacesByPriority);
  }

  sortPlacesByPriority(platos: Plato[]): Plato[] {
    return platos.sort((a: Plato, b: Plato) => {
      return a.price -  b.price;
    });
  }

  update(plato:Plato): Observable<any> {
    let updatedEvent: Plato = Object.assign({}, plato);
    delete updatedEvent.$key;
    const action: firebase.Promise<any> = this.db.list('/platos').update(plato.$key, updatedEvent);
    return super.actionAsObservable(action);
  }


  /*delete(key: string): Observable<any> {
    const action: firebase.Promise<any> = this.db.list('/platos').remove(key);
    return super.actionAsObservable(action);
  }*/

    delete(plato: Plato): Observable<any> {
    let updates: any = {};

    updates[`/platos/${plato.$key}`] = null;
    updates[`/platosPerplace/${plato.placeId}/${plato.$key}`] = null;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);
  }



  uploadImages(plato:Plato, files: File[] | File): void {
    if (files instanceof FileList) {
      _.each(files, (file) => this.uploadImage(plato, file));
    } else {
      this.uploadImage(plato, files);
    }
  }  

  uploadImage(plato:Plato, file: any): void {
    let storageRef: firebase.storage.Reference = firebase.storage().ref();
    let uploadTask: firebase.storage.UploadTask = storageRef.child(`platos/images/${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { console.log('Area files uploaded'); },
      (error) => { console.warn('Area error uploading files:', error.message); },
      () => {
        plato.images = uploadTask.snapshot.downloadURL;
        this.update(plato);
      }
    );

  }

}
