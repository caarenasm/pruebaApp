import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({mode: 'ios'}), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideRemoteConfig(() => getRemoteConfig()), provideFirebaseApp(() => initializeApp(environment.firebase))],
  bootstrap: [AppComponent],
})
export class AppModule {}
