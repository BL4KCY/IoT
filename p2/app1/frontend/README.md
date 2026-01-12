# E-Commerce Marketplace Frontend

A modern React-based e-commerce marketplace frontend with full authentication (email/password and Google OAuth), shopping cart, and checkout functionality. This is a learning-focused project designed to work as a standalone demo and to be deployed on Kubernetes.

## Features

### 🔐 Authentication
- Email/Password Sign Up and Sign In
- Google OAuth Integration
- JWT token-based authentication
- Protected routes for authenticated users
- Mock authentication (works without backend)

### 🛍️ Shopping Features
- Product Listing with Search
- Product Details View
- Shopping Cart (local storage)
- Wishlist Support (UI ready)
- Order Checkout
- Order History (mock data)

### 🎨 Design
- Modern Tailwind CSS styling
- Responsive design (mobile, tablet, desktop)
- Clean component architecture
- Reusable context providers

### 📦 Deployment Ready
- Docker support
- Kubernetes manifests included
- Docker Compose setup
- Environment configuration

## Backend TODO Items

This frontend is designed to work independently while you develop the backend. Here are the key backend endpoints needed:

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/google` - Google OAuth
- `POST /auth/logout` - Logout
- `POST /auth/refresh` - Token refresh

### Product Endpoints
- `GET /products` - List products with pagination
- `GET /products/:id` - Get product details
- `GET /products/search` - Search products
- `GET /categories` - Get categories
- `POST /products/:id/reviews` - Add product review

### Cart & Order Endpoints
- `POST /orders` - Create order
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order details
- `POST /orders/:id/cancel` - Cancel order
- `GET /cart` - Get cart items
- `POST /cart` - Add to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove from cart

### Wishlist Endpoints
- `GET /wishlist` - Get wishlist
- `POST /wishlist` - Add to wishlist
- `DELETE /wishlist/:id` - Remove from wishlist

## Project Structure

```
src/
├── api/
│   ├── client.js          # Axios instance with interceptors
│   ├── auth.js            # Authentication API calls
│   ├── products.js        # Product API calls
│   └── orders.js          # Order/Cart API calls
├── pages/
│   ├── Home.jsx           # Product listing page
│   ├── ProductDetail.jsx  # Product details page
│   ├── Signin.jsx         # Sign in page
│   ├── Signup.jsx         # Sign up page
│   ├── Cart.jsx           # Shopping cart page
│   ├── Checkout.jsx       # Checkout process
│   └── Orders.jsx         # Order history page
├── components/
│   ├── Header.jsx         # Navigation header
│   ├── Footer.jsx         # Footer
│   └── ProtectedRoute.jsx # Route protection
├── context/
│   ├── AuthContext.jsx    # Authentication state
│   └── CartContext.jsx    # Shopping cart state
├── main.jsx               # App entry point
└── index.css              # Global styles
```

## Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Update Google OAuth Client ID in `src/main.jsx`:
```javascript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE'
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

### Environment Variables

Create a `.env` file for custom configuration:
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Demo Data

The app works with mock data until the backend is implemented:
- Sample products are displayed on the home page
- Cart is stored in browser's localStorage
- Orders are displayed as mock data

## Docker Setup

### Build Image
```bash
docker build -t ecommerce-frontend:latest .
```

### Run Container
```bash
docker run -p 3000:3000 \
  -e REACT_APP_API_URL=http://backend:5000/api \
  ecommerce-frontend:latest
```

### Docker Compose
```bash
docker-compose up
```

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (minikube, kind, or cloud provider)
- kubectl configured

### Deploy
```bash
kubectl apply -f k8s-deployment.yaml
```

### Access the App
```bash
# Get service IP
kubectl get svc ecommerce-frontend

# Port forward for local access
kubectl port-forward svc/ecommerce-frontend 3000:80
```

### Configuration
Update the ConfigMap in `k8s-deployment.yaml`:
```yaml
data:
  google_client_id: "YOUR_GOOGLE_CLIENT_ID"
```

## Building for Production

```bash
npm run build
```

This creates a `dist` folder ready for deployment.

## Future Enhancements

### Authentication
- [ ] Forgot password functionality
- [ ] Email verification
- [ ] Social login (Facebook, GitHub)
- [ ] Two-factor authentication

### Shopping
- [ ] Filter and sort products
- [ ] Product reviews and ratings (backend integration)
- [ ] Compare products
- [ ] Save for later
- [ ] Recommendation engine

### Checkout
- [ ] Multiple payment methods (Stripe, PayPal)
- [ ] Address validation
- [ ] Coupon/discount code support
- [ ] Order tracking with real-time updates

### User Profile
- [ ] User profile management
- [ ] Saved addresses
- [ ] Payment methods management
- [ ] Order analytics

### Admin Features
- [ ] Product management
- [ ] Order management
- [ ] User management
- [ ] Analytics dashboard

## Learning Resources

This project is great for learning:
- React hooks and context API
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Docker containerization
- Kubernetes deployment
- JWT authentication
- RESTful API integration

## Troubleshooting

### "Google OAuth not working"
- Make sure `GOOGLE_CLIENT_ID` is set in `src/main.jsx`
- Check Google OAuth credentials in your Google Cloud Console

### "API calls failing"
- Check if the backend URL is correctly set in environment variables
- Verify CORS settings on the backend

### "Styles not loading"
- Clear browser cache
- Rebuild with `npm run build`

## Support

For issues or questions, check the TODO comments throughout the codebase marked with `// TODO:` for areas that need backend implementation.

## License

MIT License - feel free to use for learning and projects.

---

**Note**: This is a learning-focused frontend. All backend integration points are marked with TODO comments. Implement the backend API endpoints as documented in the Backend TODO section.
