# Quick Start Guide

## What Was Fixed

The blank page issue was caused by:
1. Duplicate `<BrowserRouter>` components
2. Mismatched provider nesting
3. Missing ES module declarations in config files

All issues have been resolved. The app is now running successfully! ✅

## Current Status

- ✅ Dev server running on http://localhost:3000
- ✅ React, Tailwind CSS, and all dependencies working
- ✅ All pages loading without errors
- ✅ Google OAuth placeholder (not required for demo)

## Try It Now

The app is fully functional as a demo! Here's what you can do:

### 1. **Browse Products**
   - Home page loads with 6 sample products
   - Search functionality works
   - Click "View Details" to see product details

### 2. **Test Shopping Cart**
   - Add products to cart (stored in localStorage)
   - View cart with quantity management
   - Cart persists on page refresh

### 3. **Test Authentication** (Demo Mode)
   - Click "Sign Up" or "Sign In"
   - Fill in any email/password (no backend validation)
   - Redirects to home page (stored in localStorage)
   - Click user menu to see logged-in state

### 4. **Checkout Flow**
   - Add items to cart
   - Go to Cart page
   - Click "Proceed to Checkout"
   - Enter shipping address
   - Submit payment form (demo - no real payment processing)

### 5. **View Orders**
   - Click on "Orders" in navigation (when logged in)
   - See mock order history

## Next Steps

### To Add Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials (Web application)
3. Copy the Client ID
4. Create `.env.local` file with:
   ```
   VITE_GOOGLE_CLIENT_ID=your_client_id_here
   ```
5. Restart dev server

### To Connect Backend:
When ready to build the backend, refer to `BACKEND_INTEGRATION.md` for complete API specifications.

Update `src/api/client.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api'
```

## File Structure

```
src/
├── api/              # Backend API calls (organized by domain)
├── pages/            # Page components (Home, Cart, Checkout, etc.)
├── components/       # Reusable components (Header, Footer, etc.)
├── context/          # State management (Auth, Cart)
└── index.css         # Global Tailwind styles
```

## Available Commands

```bash
npm run dev      # Start development server (currently running)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## Troubleshooting

### Page still blank?
- Check browser console (F12 → Console tab)
- Look for JavaScript errors
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Styles not showing?
- Tailwind CSS is included
- Check that `src/index.css` is being loaded
- Clear browser cache

### Google OAuth not working?
- This is expected without a Client ID
- The app works fine without it for now
- You can still test sign up/sign in with email/password

## Development Tips

1. **Hot Module Reloading**: Changes to code automatically reload in browser
2. **Console Logs**: Open DevTools (F12) → Console to see debug messages
3. **Local Storage**: Cart and user data persist in localStorage
4. **Mock Data**: Home page uses mock products - replace when backend is ready

---

**The app is ready for demo and learning!** Start building your backend API and connect it using the specifications in `BACKEND_INTEGRATION.md`.
