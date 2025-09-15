// import { bootstrapApplication } from '@angular/platform-browser';

// import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { appConfig } from './app/app.config';
// import { Component } from '@angular/core';
// import { AppComponent } from './app/app.component';
// import { ConfigService } from './app/services/config.service';
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),   
//     ...appConfig.providers,
//      {
//       provide: 'APP_CONFIG_LOADER',
//       useFactory: (config: ConfigService) => () => config.loadConfig(),
//       deps: [ConfigService],
//     }
//   ]
// }).catch(err => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppConfigService } from './app/services/app-config.service';
import { appConfig } from './app/app.config';

export function configInitializer(config: AppConfigService) {
  return () => config.loadConfig();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    ...appConfig.providers,
    {
      provide: APP_INITIALIZER,
      useFactory: configInitializer,
      deps: [AppConfigService],
      multi: true
    }
  ]
}).catch(err => console.error(err));
