import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../common/firebase.service';
import { Comentario } from './comentario';
import * as firebase from 'firebase';


@Injectable()
export class comentarioService extends FirebaseService {

  constructor(private db: AngularFireDatabase) {
    super();
  }


  find(key: string): Observable<Comentario> {
    return this.db.object(`/platos/${key}`).map(Comentario.fromJSON);
  }

  findAll(query?: any): Observable<Comentario[]> {
    let options: any = query ? { query } : {};
    return this.db.list('/platos', options).map(Comentario.fromJSONArray);
  }
  
   findAlls(): Observable<Comentario[]> {
    return this.db.list('/platos').map(Comentario.fromJSONArray);
  }
  

  /*create(plato: Plato): Observable<any> {
    delete plato.$key;
    const action: firebase.Promise<any> = this.db.list('/platos').push(plato);
    return super.actionAsObservable(action);
  }*/

  create(coment: Comentario): Observable<any> {
    delete coment.$key;

    const newPlaceKey: string = this.db.list('/comentario').push(null).key;
    let updates: any = {};

    updates[`/comentario/${newPlaceKey}`] = coment;
    updates[`/comentarioPerplace/${coment.placeId}/${newPlaceKey}`] = true;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);

  }

  findByPlace(Id: string): Observable<Comentario[]> {

    return this.db.list(`/comentarioPerplace/${Id}`)
      .map(comentarios => comentarios.map(comentario => comentario.$key))
      .map(comentarios => comentarios.map(comentKey => this.db.object(`/comentario/${comentKey}`)))
      .flatMap(comentarios => (comentarios.length === 0) ? Observable.of([]) : Observable.combineLatest(comentarios));
  }

  update(plato:Comentario): Observable<any> {
    let updatedEvent: Comentario = Object.assign({}, plato);
    delete updatedEvent.$key;
    const action: firebase.Promise<any> = this.db.list('/platos').update(plato.$key, updatedEvent);
    return super.actionAsObservable(action);
  }


  /*delete(key: string): Observable<any> {
    const action: firebase.Promise<any> = this.db.list('/platos').remove(key);
    return super.actionAsObservable(action);
  }*/

    delete(plato: Comentario): Observable<any> {
    let updates: any = {};

    updates[`/platos/${plato.$key}`] = null;
    updates[`/platosPerplace/${plato.placeId}/${plato.$key}`] = null;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);
  }  
}
