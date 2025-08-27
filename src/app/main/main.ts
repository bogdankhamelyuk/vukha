import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit, OnDestroy {

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private map!: L.Map;
  private userLocationMarker?: L.Marker;

  // Default location (Vienna, Austria - since you're in Innsbruck)
  private defaultLat = 47.2692;
  private defaultLng = 11.4041;

  locationStatus: string = 'Standort wird gesucht...';
  locationError: string = '';


  ngOnInit(): void {
    this.initializeMap();
    this.getUserLocation();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap(): void {
    // Fix for default marker icons in Angular
    this.fixLeafletIcons();

    // Initialize map with default location
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [this.defaultLat, this.defaultLng],
      13
    );

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
  private fixLeafletIcons(): void {
    // Fix for Leaflet default marker icons not working in Angular
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';

    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = iconDefault;
  }

  getUserLocation(): void {
    this.locationStatus = 'Standort wird gesucht...';
    this.locationError = '';

    if (!navigator.geolocation) {
      this.locationError = 'Geolocation wird von diesem Browser nicht unterstützt.';
      this.locationStatus = 'Standort nicht verfügbar';
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => this.onLocationSuccess(position),
      (error) => this.onLocationError(error),
      options
    );
  }

  private onLocationSuccess(position: GeolocationPosition): void {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    this.locationStatus = `Standort gefunden (±${Math.round(accuracy)}m Genauigkeit)`;
    this.locationError = '';

    // Remove existing user location marker
    if (this.userLocationMarker) {
      this.map.removeLayer(this.userLocationMarker);
    }

    // Create custom icon for user location
    const userIcon = L.icon({
      iconUrl: 'assets/user-location.png',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });

    // Add marker for user location
    this.userLocationMarker = L.marker([lat, lng], { icon: userIcon })
      .addTo(this.map)
      .bindPopup(`
        <b>Ihr Standort</b><br>
        Breitengrad: ${lat.toFixed(6)}<br>
        Längengrad: ${lng.toFixed(6)}<br>
        Genauigkeit: ±${Math.round(accuracy)}m
      `);

    // Center map on user location
    this.map.setView([lat, lng], 15);

    // Add accuracy circle
    L.circle([lat, lng], {
      radius: accuracy,
      color: '#3388ff',
      fillColor: '#3388ff',
      fillOpacity: 0.1,
      weight: 2
    }).addTo(this.map);
  }

  private onLocationError(error: GeolocationPositionError): void {
    let errorMessage = '';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Standortzugriff wurde verweigert. Bitte erlauben Sie den Zugriff in den Browser-Einstellungen.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Standortinformationen sind nicht verfügbar.';
        break;
      case error.TIMEOUT:
        errorMessage = 'Zeitüberschreitung beim Abrufen des Standorts.';
        break;
      default:
        errorMessage = 'Ein unbekannter Fehler ist aufgetreten.';
        break;
    }

    this.locationError = errorMessage;
    this.locationStatus = 'Standort nicht gefunden';
    console.error('Geolocation error:', error);
  }

  // Additional utility methods
  centerOnUserLocation(): void {
    if (this.userLocationMarker) {
      const position = this.userLocationMarker.getLatLng();
      this.map.setView([position.lat, position.lng], 15);
    } else {
      this.getUserLocation();
    }
  }

  addCustomMarker(lat: number, lng: number, popupText: string): void {
    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(popupText);
  }

}
