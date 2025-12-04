// ===================================================================
// EXAMPLE: msal-config.ts with YOUR credentials filled in
// ===================================================================
// 
// THIS IS AN EXAMPLE FILE - Do not use this directly
// Copy your actual Tenant ID and Client ID from Azure Portal
//
// Location to update: src/app/services/msal-config.ts
// ===================================================================

import { Configuration, LogLevel } from '@azure/msal-browser';

// ⬇️⬇️⬇️ REPLACE THESE VALUES WITH YOUR AZURE AD CREDENTIALS ⬇️⬇️⬇️
const TENANT_ID = '52b7b6d2-2234-49f8-8d65-a57004a008f8'; // Your Azure AD Tenant ID
const CLIENT_ID = '4ab42685-3dd7-4d35-a499-3e48e90c608a'; // Your Application (client) ID
// ⬆️⬆️⬆️ REPLACE THESE VALUES WITH YOUR AZURE AD CREDENTIALS ⬆️⬆️⬆️

export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: window.location.origin + '/login',
    postLogoutRedirectUri: window.location.origin + '/login',
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) { return; }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      logLevel: LogLevel.Warning,
      piiLoggingEnabled: false
    }
  }
};

export const loginRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'email']
};

// ===================================================================
// How your authority URL will look:
// https://login.microsoftonline.com/12345678-1234-1234-1234-123456789abc
//
// How your redirectUri will look:
// - Development: http://localhost:4200/login
// - Production: https://yourdomain.com/login
// ===================================================================
