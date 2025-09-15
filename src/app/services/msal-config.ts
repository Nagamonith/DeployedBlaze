import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Replace with your Azure AD App clientId
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Replace with your tenant info
    redirectUri: 'http://localhost:4200/login', // Update as needed
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) { return; }
        console.log(message);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false
    }
  }
};