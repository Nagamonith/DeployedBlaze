# Microsoft SSO Setup Guide

This guide will help you configure Microsoft SSO (Single Sign-On) for your DataLyzer application.

## ✅ Implementation Complete

The following changes have been made to your application:

1. **Login Component** - Replaced traditional username/password login with Microsoft SSO
2. **Logout Functionality** - Updated to use MSAL logout 
3. **MSAL Configuration** - Set up proper MSAL configuration files
4. **App Configuration** - Enabled MSAL providers in the application
5. **UI Updates** - Added "Login with Microsoft SSO" button with Microsoft branding

## 🔧 Configuration Steps

### Step 1: Azure AD App Registration

You need to register your application in Azure Active Directory:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in the details:
   - **Name**: DataLyzer (or your preferred name)
   - **Supported account types**: Choose based on your needs
     - Single tenant (your organization only) - Recommended
     - Multi-tenant (any Azure AD)
   - **Redirect URI**: 
     - Platform: **Single-page application (SPA)**
     - URI: `http://localhost:4200/login` (for development)
     - Add production URL when deploying (e.g., `https://blaze.qualis40.io/login`)
5. Click **Register**

### Step 2: Configure Your Application

After registration, you'll get your credentials:

1. Copy the **Application (client) ID**
2. Copy the **Directory (tenant) ID**

### Step 3: Update MSAL Configuration

Open the file: `src/app/services/msal-config.ts`

Replace the placeholder values:

```typescript
const TENANT_ID = 'YOUR_TENANT_ID'; // Replace with your Directory (tenant) ID
const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with your Application (client) ID
```

**Example:**
```typescript
const TENANT_ID = '52b7b6d2-2234-49f8-8d65-a57004a008f8';
const CLIENT_ID = '172886d9-63ac-4043-87e2-c4d6b84f7b15';
```

### Step 4: Configure API Permissions (Optional)

If you need additional permissions:

1. In Azure Portal, go to your app registration
2. Click **API permissions** in the left menu
3. Click **Add a permission**
4. Select **Microsoft Graph**
5. Choose **Delegated permissions**
6. Add the following permissions:
   - `User.Read` (already included by default)
   - `openid`
   - `profile`
   - `email`
7. Click **Add permissions**
8. Click **Grant admin consent** (if you're an admin)

### Step 5: Configure Redirect URIs

Add all your redirect URIs (both development and production):

1. In Azure Portal, go to your app registration
2. Click **Authentication** in the left menu
3. Under **Single-page application**, add:
   - `http://localhost:4200/login` (development)
   - `https://blaze.qualis40.io/login` (production)
4. Under **Logout URL**, add:
   - `http://localhost:4200/login` (development)
   - `https://blaze.qualis40.io/login` (production)
5. Enable **ID tokens** under **Implicit grant and hybrid flows** (if needed)
6. Click **Save**

## 🎯 User Role Assignment

The application determines user roles based on the email address by default. You can customize this in `login.component.ts`:

### Current Implementation (Email-based):
```typescript
let role = 'User';
if (userEmail.toLowerCase().includes('admin')) {
  role = 'Admin';
} else if (userEmail.toLowerCase().includes('manager')) {
  role = 'Manager';
} else if (userEmail.toLowerCase().includes('tester')) {
  role = 'Tester';
}
```

### Alternative: Azure AD App Roles

For a more robust solution, configure App Roles in Azure AD:

1. In Azure Portal, go to your app registration
2. Click **App roles** in the left menu
3. Create roles (Admin, Manager, Tester, etc.)
4. Assign users to roles in **Enterprise Applications**
5. Update the login component to read roles from claims:

```typescript
const roles = account.idTokenClaims?.roles || [];
if (roles.includes('Admin')) {
  role = 'Admin';
} else if (roles.includes('Manager')) {
  role = 'Manager';
} else if (roles.includes('Tester')) {
  role = 'Tester';
}
```

## 🚀 Testing Your Setup

1. **Start the application**:
   ```bash
   ng serve
   ```

2. **Navigate to**: `http://localhost:4200/login`

3. **Click** "Login with Microsoft SSO"

4. **You should be redirected** to Microsoft's login page

5. **Enter your Microsoft credentials**

6. **After successful login**, you'll be redirected back to your application at `/assets/pre-dashboard`

## 🔒 Security Considerations

1. **Never commit your credentials** to version control
2. **Use environment variables** for production deployments
3. **Enable MFA** (Multi-Factor Authentication) for your Azure AD users
4. **Review API permissions** regularly
5. **Use HTTPS** in production
6. **Configure CORS** properly on your backend API

## 📋 Environment Variables (Recommended)

For production, use environment files instead of hardcoding credentials:

1. Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  msalConfig: {
    tenantId: 'YOUR_TENANT_ID',
    clientId: 'YOUR_CLIENT_ID'
  }
};
```

2. Update `msal-config.ts` to use environment variables:
```typescript
import { environment } from '../../environments/environment';

const TENANT_ID = environment.msalConfig.tenantId;
const CLIENT_ID = environment.msalConfig.clientId;
```

## 🐛 Troubleshooting

### Issue: "AADSTS50011: The redirect URI specified does not match"
**Solution**: Add the redirect URI in Azure Portal under Authentication > Single-page application

### Issue: Login popup blocked
**Solution**: The implementation uses `loginRedirect()` instead of popup, so this shouldn't occur

### Issue: "User login is required"
**Solution**: Clear browser cache and localStorage, then try again

### Issue: CORS errors
**Solution**: Ensure your backend API has proper CORS configuration to accept requests from your frontend domain

### Issue: Token expired
**Solution**: MSAL automatically handles token refresh. If issues persist, clear localStorage and login again

## 📝 What Changed in Your Code

### Files Modified:
1. ✅ `src/app/services/msal-config.ts` - MSAL configuration
2. ✅ `src/app/app.config.ts` - MSAL providers enabled
3. ✅ `src/main.ts` - HTTP client with interceptors
4. ✅ `src/components/login/login.component.ts` - Microsoft SSO login logic
5. ✅ `src/components/login/login.component.html` - Microsoft login button UI
6. ✅ `src/components/login/login.component.css` - Microsoft button styling
7. ✅ `src/app/leftnavbartree/leftnavigationbar/leftnavigationbar.component.ts` - MSAL logout

### Features Preserved:
- ✅ All existing routes and navigation
- ✅ User role management
- ✅ Gantt chart synchronization
- ✅ Dialog alerts (login success, logout confirmation)
- ✅ Loading service integration
- ✅ All other application features

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Azure AD configuration
3. Ensure redirect URIs are correctly configured
4. Check that MSAL packages are installed: `@azure/msal-angular` and `@azure/msal-browser`

## 🎉 Next Steps

1. ✅ Update the credentials in `msal-config.ts`
2. ✅ Test the login flow
3. ✅ Configure user roles (email-based or Azure AD roles)
4. ✅ Deploy to production with proper environment variables
5. ✅ Update redirect URIs for production domain

Your Microsoft SSO integration is complete and ready to use!
