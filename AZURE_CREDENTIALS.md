# 🔑 Azure AD Credentials - Quick Setup

## Where to Update Your Credentials

**File Location**: `src/app/services/msal-config.ts`

---

## Current Configuration

```typescript
const TENANT_ID = '52b7b6d2-2234-49f8-8d65-a57004a008f8'; // ⬅️ REPLACE THIS
const CLIENT_ID = '4ab42685-3dd7-4d35-a499-3e48e90c608a'; // ⬅️ REPLACE THIS
```

---

## How to Get Your Credentials

### 1. Get Tenant ID
1. Go to [Azure Portal](https://portal.azure.com)
2. Click **Azure Active Directory**
3. In the Overview page, copy **Tenant ID** (also called Directory ID)

### 2. Get Client ID
1. In Azure Active Directory, click **App registrations**
2. Click on your application (or create new one)
3. In the Overview page, copy **Application (client) ID**

---

## Example Configuration

Replace the placeholders with your actual values:

```typescript
// Example - DO NOT use these values, they are examples only
const TENANT_ID = '52b7b6d2-2234-49f8-8d65-a57004a008f8';
const CLIENT_ID = '172886d9-63ac-4043-87e2-c4d6b84f7b15';
```

---

## ⚠️ Important Notes

- ✅ Keep these credentials **private**
- ✅ Never commit to public repositories
- ✅ Use environment variables for production
- ✅ Update redirect URIs in Azure Portal to match your domain

---

## Redirect URIs to Configure in Azure

### Development
- **Redirect URI**: `http://localhost:4200/login`
- **Logout URI**: `http://localhost:4200/login`

### Production (Update with your domain)
- **Redirect URI**: `https://yourdomain.com/login`
- **Logout URI**: `https://yourdomain.com/login`

---

## After Updating Credentials

1. Save the `msal-config.ts` file
2. Run `ng serve`
3. Navigate to `http://localhost:4200/login`
4. Click "Login with Microsoft SSO"
5. You should be redirected to Microsoft login

---

## Need Help?

See the full setup guide: `MICROSOFT_SSO_SETUP.md`
