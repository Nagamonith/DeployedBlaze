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
import { MsalModule, MsalService, MSAL_INSTANCE, MsalInterceptor } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConfigService } from './services/app-config.service';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '0e775123-adfb-4b34-990d-3c6ce28a9fcc', // Azure AD App clientId
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: 'https://blaze.qualis40.io/worklog', // must match Azure AD config
    },
    cache: {
      cacheLocation: "localStorage", // ensures tokens persist across page reloads
      storeAuthStateInCookie: true
    }
  });
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    AppConfigService
  ]
};
