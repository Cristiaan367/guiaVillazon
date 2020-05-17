export class Comentario {

  $key: string;
  coment: string;
  datet: string;
  name: string;
  placeId:string;


  static fromJSON({$key, coment, datet, name, placeId}: any): Comentario {
    return new Comentario($key,coment , datet, name, placeId);
  }

  static fromJSONArray(json: any[]): Comentario[] {
    return json.map(Comentario.fromJSON);
  }

  constructor(
    $key: string,
    coment: string,
    datet: string,
    name: string,
    placeId:string,
    
  ) {

    this.$key = $key || '';
    this.coment = coment || '';
    this.datet = datet || '';
    this.name = name || '';
    this.placeId = placeId || '';
  }

}
