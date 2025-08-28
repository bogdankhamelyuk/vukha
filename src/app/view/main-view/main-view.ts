import { Component, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiPulse } from '@taiga-ui/kit';
import * as L from 'leaflet';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-main-view',
  imports: [TuiButton, TuiDataList, TuiDropdown, TuiIcon],
  templateUrl: './main-view.html',
  styleUrls: ['./main-view.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainView implements AfterViewInit, OnDestroy {

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @ViewChild('markerContainer', { read: ViewContainerRef, static: true })

  private map!: L.Map;
  private userLocationMarker?: L.Marker;
  // Default location (Vienna, Austria - since you're in Innsbruck)
  private defaultLat = 47.2692;
  private defaultLng = 11.4041;

  public menuItems: string[] = ['Konto', 'Parkenverlauf', 'Meine Parkplätze'];
  locationStatus: string = 'Standort wird gesucht...';
  locationError: string = '';

  constructor(private viewContainerRef: ViewContainerRef) { }

  protected open = false;

  protected onClick(): void {
    this.open = false;
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.getUserLocation();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap(): void {
    // Initialize map with default location
    this.map = L.map(this.mapContainer.nativeElement, { zoomControl: false }).setView(
      [this.defaultLat, this.defaultLng],
      13
    );
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }


  public getUserLocation(): void {
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
    // this.viewContainerRef.clear();
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    this.locationStatus = `Standort gefunden (±${Math.round(accuracy)}m Genauigkeit)`;
    this.locationError = '';

    // Remove existing user location marker
    if (this.userLocationMarker) {
      this.map.removeLayer(this.userLocationMarker);
    }

    const tuiPulseIcon = this.createPulseIcon();

    // Add marker for user location
    this.userLocationMarker = L.marker([lat, lng], { icon: tuiPulseIcon })
      .addTo(this.map);

    // Center map on user location
    this.map.setView([lat, lng], 15);
  }


  private createPulseIcon(): L.DivIcon {
    const container = document.createElement('div');
    container.className = 'circle pulse';

    return L.divIcon({
      html: container,
      className: 'tui-pulse-marker',
    });
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