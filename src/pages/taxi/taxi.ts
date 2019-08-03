import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any

@IonicPage()
@Component({
  selector: 'page-taxi',
  templateUrl: 'taxi.html',
})
export class TaxiPage {
	/*
"name":"parada 1",
			"latitude": -22.091434052730897,
			"longitude": -65.59542194667972

	*/

@ViewChild('map') mapContainer: ElementRef;
map: any;
museumList = [
      {
        "name": "National Science Centre,",
        "state": "Delhi",
        "latitude": 20.6132098,
        "longitude": 77.245437
      },
      {
        "name": "20 de mayo",
        "state": "parada",
        "latitude": -22.091434052730897,
        "longitude": -65.59542194667972
      },
      {
        "name": "ATL",
        "state": "Parada",
        "latitude": -22.090484667121643,
        "longitude": -65.5965162879578
      },
      {
        "name": "ATL",
        "state": "parada",
        "latitude": -22.092373490844516,
        "longitude": -65.59621588054813
      },
      {
        "name": "20 de mayo",
        "state": "parada",
        "latitude": -22.08635401981408,
        "longitude": -65.59689179721988

      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.085255475939466,
        "longitude": -65.59991196457065
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.086189984393677,
        "longitude": -65.60018554989017
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.08548413283488,
        "longitude": -65.60234204593814
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.084042594043257,
        "longitude": -65.6022562152499
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.083058362552208,
        "longitude": -65.60191825691402
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.09614609204426,
        "longitude": -65.5962051517123
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.09436169903846,
        "longitude": -65.59697226349056
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.083766712165687,
        "longitude": -65.59288457695186
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.077761787433662,
        "longitude": -65.5902989274615
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.076896818631333,
        "longitude": -65.59022382560909
      },
      {
      	"name": "20 de mayo",
        "state": "parada",
        "latitude": -22.08928425730608,
        "longitude": -65.59634462658107
      },
];
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  
  }

  ionViewDidLoad() {
    this.displayGoogleMap();
    this.getMarkers();
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(-22.09102149327675, -65.59570089641727);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    for (let _i = 0; _i < this.museumList.length; _i++) {
      if(_i > 0 )
       this.addMarkersToMap(this.museumList[_i]);
    }
  }

  addMarkersToMap(museum) {
      var position = new google.maps.LatLng(museum.latitude, museum.longitude);
      var museumMarker = new google.maps.Marker({position: position, title: museum.name});
      museumMarker.setMap(this.map);
  }

}
