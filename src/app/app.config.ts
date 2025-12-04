// import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { CoolStorageModule } from '@angular-cool/storage';
// import { MsalModule, MSAL_INSTANCE } from '@azure/msal-angular';
// import { PublicClientApplication } from '@azure/msal-browser';
// import { msalConfig } from './services/msal-config';
// import { AppConfigService } from './services/app-config.service';

// export function MSALInstanceFactory() {
//   return new PublicClientApplication(msalConfig);
// }

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     importProvidersFrom(CoolStorageModule.forRoot()),
//     importProvidersFrom(MsalModule),
//     {
//       provide: MSAL_INSTANCE,
//       useFactory: MSALInstanceFactory
//   },
//   AppConfigService
//   ],
// };
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CoolStorageModule } from '@angular-cool/storage';
import { AppConfigService } from './services/app-config.service';
import { MsalModule, MSAL_INSTANCE, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './services/msal-config';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(CoolStorageModule.forRoot()),
    importProvidersFrom(MsalModule),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    AppConfigService
  ]
};
