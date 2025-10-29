import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '172886d9-63ac-4043-87e2-c4d6b84f7b15', // replace with your local SPA app ID
    authority: 'https://login.microsoftonline.com/52b7b6d2-2234-49f8-8d65-a57004a008f8',
    redirectUri: 'https://localhost:4200/worklog',
  },
};
