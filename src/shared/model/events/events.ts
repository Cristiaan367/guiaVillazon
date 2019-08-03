export class Evento {

  $key: string;
  title: string;
  description: string;
  images: string;
  priority: number;
  date:string; 
  time:string;
  place:string;

  static fromJSON({$key, title, description, images, priority, date, time, place}: any): Evento {
    return new Evento($key, title, description, images, priority, date, time, place );
  }

  static fromJSONArray(json: any[]): Evento[] {
    return json.map(Evento.fromJSON);
  }

  constructor(
    $key: string,
    title: string,
    description: string,
    images: string,
    priority: number,
    date: string,
    time: string,
    place: string
  ) {

    this.$key = $key || '';
    this.title = title || '';
    this.description = description || '';
    this.images = images || '';
    this.priority = priority || 0;
    this.date = date || Date();
    this.time =  time || '';
    this.place = place || '';
  }

}
