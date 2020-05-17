
export class Area {

  $key: string;
  title: string;
  description: string;
  imageUrl: string;
  distance:number;
  gastronomy: string;
  tour: string;
  festivity: string;
  latitude: number;
  longitude: number;
  placesCount: number;
  priority: number;

  static fromJSON({$key, title, description, imageUrl, distance, gastronomy, tour, festivity, latitude, longitude, placesCount, priority}: any): Area {
    return new Area($key, title, description, imageUrl,distance, gastronomy, tour, festivity, latitude, longitude, placesCount, priority );
  }

  static fromJSONArray(json: any[]): Area[] {
    return json.map(Area.fromJSON);
  }

  constructor(
    $key: string,
    title: string,
    description: string,
    imageUrl: string,
    distance: number,
    gastronomy: string,
    tour: string,
    festivity: string,
    latitude: number,
    longitude: number,
    placesCount: number,
    priority: number
  ) {

    this.$key = $key || '';
    this.title = title || '';
    this.description = description || '';
    this.imageUrl = imageUrl || '';
    this.distance = distance || 0;
    this.gastronomy = gastronomy || '';
    this.tour = tour || '';
    this.festivity = festivity || '';
    this.latitude = latitude || 0;
    this.longitude = longitude || 0;
    this.placesCount = placesCount || 0;
    this.priority = priority || 0;

  }

}