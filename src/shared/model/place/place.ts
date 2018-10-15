
export class Place {

  $key: string;
  title: string;
  description: string;
  excerpt: string;
  latitude: number;
  longitude: number;
  address: string;
  images: string[];
  priority: number;
  areaId: string;
  detail:string;
  contact:number;
  social:string;
  hour:string;

  static fromJSON({$key, title, description, excerpt, latitude, longitude, address, images, priority, areaId,detail,contact,social,hour}: any): Place {
    return new Place($key, title, description, excerpt, latitude, longitude, address, images, priority, areaId,detail,contact,social,hour );
  }

  static fromJSONArray(json: any[]): Place[] {
    return json.map(Place.fromJSON);
  }

  constructor(
    $key: string,
    title: string,
    description: string,
    excerpt: string,
    latitude: number,
    longitude: number,
    address: string,
    images: string[],
    priority: number,
    areaId: string,
    detail: string,
    contact: number,
    social: string,
    hour: string
  ) {

    this.$key = $key || '';
    this.title = title || '';
    this.description = description || '';
    this.excerpt = excerpt || '';
    this.latitude = latitude || 0;
    this.longitude = longitude || 0;
    this.address = address || '';
    this.images = images || [];
    this.priority = priority || 0;
    this.areaId = areaId || '';
    this.detail = detail || '';
    this.contact = contact || 0;
    this.social = social || '';
    this.hour = hour || '';
  }

}
