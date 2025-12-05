# Auto Logout After 60 Minutes Idle Time

## ✅ Implementation Complete

Your application now automatically logs users out after **60 minutes of inactivity**.

## 🎯 Features

### 1. **Idle Time Monitoring**
- Tracks user activity (mouse movements, clicks, keyboard input, scrolling, touch events)
- Resets timer on any user interaction
- Runs efficiently outside Angular zone for better performance

### 2. **Warning Before Logout**
- Shows a warning dialog **5 minutes before** automatic logout
- Displays remaining time
- Gives users two options:
  - **Continue Session** - Extends the session for another 60 minutes
  - **Logout Now** - Immediately logs out

### 3. **Automatic Logout**
- After 60 minutes of no activity, user is automatically logged out
- Clears all local storage, session storage, and cookies
- Logs out from Microsoft SSO
- Redirects to login page

## ⚙️ Configuration

### Default Settings (in `idle-timeout.service.ts`):

```typescript
private readonly IDLE_TIMEOUT = 60 * 60 * 1000; // 60 minutes
private readonly WARNING_TIME = 5 * 60 * 1000;  // 5 minutes warning
```

### To Change Timeout Duration:

Edit `src/app/services/idle-timeout.service.ts`:

**Example: Change to 30 minutes**
```typescript
private readonly IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutes
private readonly WARNING_TIME = 5 * 60 * 1000;  // 5 minutes warning
```

**Example: Change to 2 hours**
```typescript
private readonly IDLE_TIMEOUT = 120 * 60 * 1000; // 120 minutes (2 hours)
private readonly WARNING_TIME = 10 * 60 * 1000;  // 10 minutes warning
```

## 📋 How It Works

### Timeline:
1. **User logs in** → Idle timer starts
2. **User activity** → Timer resets to 60 minutes
3. **55 minutes idle** → Warning dialog appears (5 minutes before logout)
4. **User clicks "Continue Session"** → Timer resets to 60 minutes
5. **60 minutes idle** → Automatic logout

### Activities That Reset the Timer:
- Mouse movements
- Mouse clicks
- Keyboard presses
- Scrolling
- Touch events (mobile)

## 🔧 Files Created/Modified

### New Files:
1. **`src/app/services/idle-timeout.service.ts`**
   - Main service that handles idle time monitoring
   - Manages timers and logout logic

2. **`src/app/shared/dialogs/session-timeout-dialog/session-timeout-dialog.component.ts`**
   - Warning dialog component
   - Shown 5 minutes before logout

### Modified Files:
1. **`src/app/app.component.ts`**
   - Initializes idle timeout service
   - Handles session warnings and timeout events

2. **`src/components/login/login.component.ts`**
   - Starts idle timeout monitoring after successful login

## 🧪 Testing

### Test Idle Timeout:
For testing, you can temporarily reduce the timeout:

```typescript
// In idle-timeout.service.ts - FOR TESTING ONLY
private readonly IDLE_TIMEOUT = 2 * 60 * 1000; // 2 minutes for testing
private readonly WARNING_TIME = 30 * 1000;     // 30 seconds warning
```

### Test Steps:
1. Login to the application
2. Don't interact with the app for the specified time
3. You should see the warning dialog
4. After warning period expires, you'll be logged out

**Remember to change back to production values after testing!**

## 🎨 Customizing the Warning Dialog

Edit `src/app/shared/dialogs/session-timeout-dialog/session-timeout-dialog.component.ts`:

- Change message text
- Modify button labels
- Adjust styling
- Change colors

## 🔒 Security Features

1. **Complete session cleanup** on timeout:
   - Clears localStorage
   - Clears sessionStorage
   - Removes all cookies
   - MSAL logout (Microsoft SSO)

2. **Prevents multiple dialogs** from appearing
3. **Secure redirect** back to login page

## 📱 Mobile Compatibility

The idle timeout service also monitors:
- Touch events
- Mobile scrolling
- Touch gestures

## ⚠️ Important Notes

1. **Timer only runs when user is logged in**
   - Service stops when user logs out or navigates to login page

2. **User can extend session indefinitely**
   - Each activity or "Continue Session" click resets the timer

3. **Background tabs**
   - Timer continues even if tab is in background
   - Warning dialog will appear when tab becomes active

4. **Multiple tabs**
   - Each tab has its own independent timer
   - Logout from one tab doesn't affect others (unless MSAL cache is shared)

## 🐛 Troubleshooting

### Issue: User logged out too quickly
**Solution**: Check the IDLE_TIMEOUT value in `idle-timeout.service.ts`

### Issue: Warning dialog not appearing
**Solution**: Check browser console for errors, ensure MatDialog is properly configured

### Issue: Timer not resetting on activity
**Solution**: Check that event listeners are properly attached in the service

## 🚀 Production Recommendations

1. Keep timeout at **60 minutes** for security
2. Show warning **5 minutes** before logout
3. Log timeout events for security auditing
4. Consider adding analytics to track timeout frequency

## 📊 Optional: Add Analytics

You can track timeout events by adding analytics in the service:

```typescript
private handleTimeout() {
  // Add your analytics here
  console.log('Session timeout - logging out user');
  // Example: analytics.track('session_timeout');
  
  this.onTimeout.next();
  // ... rest of logout code
}
```

Your auto-logout feature is now fully implemented and ready to use!
