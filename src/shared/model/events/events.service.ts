import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../common/firebase.service';
import { Evento } from './events';

 
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class EventService extends FirebaseService {

  constructor(private db: AngularFireDatabase) {
    super();
  }


  find(key: string): Observable<Evento> {
    return this.db.object(`/events/${key}`).map(Evento.fromJSON);
  }

  findAll(query?: any): Observable<Evento[]> {
    let options: any = query ? { query } : {};
    return this.db.list('/events', options).map(Evento.fromJSONArray);
  }

}
