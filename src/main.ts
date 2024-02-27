import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';

import { AppModule } from './app/app.module';
import { Enviroment } from '../src/app/enviroments/enviroment';

if (Enviroment.production) {
  enableProdMode();
}

// Inicializa Firebase
initializeApp(Enviroment.firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));