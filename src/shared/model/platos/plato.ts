export class Plato {

  $key: string;
  name: string;
  description: string;
  images: string;
  price: number;
  placeId:string;


  static fromJSON({$key, name, description, images, price, placeId}: any): Plato {
    return new Plato($key, name, description, images, price, placeId);
  }

  static fromJSONArray(json: any[]): Plato[] {
    return json.map(Plato.fromJSON);
  }

  constructor(
    $key: string,
    name: string,
    description: string,
    images: string,
    price: number,
    placeId:string,
    
  ) {

    this.$key = $key || '';
    this.name = name || '';
    this.description = description || '';
    this.images = images || '';
    this.price = price || 0;
    this.placeId = placeId || '';
  }

}
