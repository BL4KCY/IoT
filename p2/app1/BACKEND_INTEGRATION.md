# Backend API Integration Guide

This document provides a quick reference for integrating the backend with this frontend.

## Quick Start

1. **Update API Base URL** in `src/api/client.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api'
```

2. **Update Google Client ID** in `src/main.jsx`:
```javascript
const GOOGLE_CLIENT_ID = 'your-google-client-id'
```

3. **Implement Backend Endpoints** following the specifications below.

## API Endpoints Specification

### Authentication API (`src/api/auth.js`)

#### POST /auth/signup
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Response (200):**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

---

#### POST /auth/signin
Login an existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

---

#### POST /auth/google
OAuth login with Google.

**Request:**
```json
{
  "token": "google_id_token"
}
```

**Response (200):**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "User Name"
  }
}
```

---

#### POST /auth/logout
Logout user (requires auth).

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

#### POST /auth/refresh
Refresh JWT token.

**Response (200):**
```json
{
  "token": "new_jwt_token"
}
```

---

### Products API (`src/api/products.js`)

#### GET /products
Get paginated products list.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- Additional filter parameters as needed

**Response (200):**
```json
{
  "products": [
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 99.99,
      "image": "url",
      "description": "...",
      "category": "Category",
      "rating": 4.5,
      "reviews": 100,
      "inStock": true
    }
  ],
  "total": 500,
  "pages": 25
}
```

---

#### GET /products/:id
Get single product details.

**Response (200):**
```json
{
  "id": "product_id",
  "name": "Product Name",
  "price": 99.99,
  "image": "url",
  "description": "Detailed description",
  "category": "Category",
  "rating": 4.5,
  "reviews": 100,
  "features": ["feature1", "feature2"],
  "inStock": true,
  "shippingInfo": "Free shipping info"
}
```

---

#### GET /products/search
Search products.

**Query Parameters:**
- `q` (string, required) - Search query
- Additional filter parameters

**Response (200):**
```json
{
  "products": [ ... ]
}
```

---

#### GET /categories
Get all product categories.

**Response (200):**
```json
{
  "categories": [
    {
      "id": "cat_id",
      "name": "Category Name"
    }
  ]
}
```

---

#### POST /products/:id/reviews
Add review to product (requires auth).

**Request:**
```json
{
  "rating": 5,
  "review": "Great product!"
}
```

**Response (201):**
```json
{
  "id": "review_id",
  "rating": 5,
  "review": "Great product!",
  "userId": "user_id",
  "createdAt": "2024-01-12T10:00:00Z"
}
```

---

### Wishlist API (`src/api/products.js`)

#### GET /wishlist
Get user's wishlist (requires auth).

**Response (200):**
```json
{
  "wishlist": [
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 99.99
    }
  ]
}
```

---

#### POST /wishlist
Add product to wishlist (requires auth).

**Request:**
```json
{
  "productId": "product_id"
}
```

**Response (201):**
```json
{
  "message": "Added to wishlist"
}
```

---

#### DELETE /wishlist/:productId
Remove from wishlist (requires auth).

**Response (200):**
```json
{
  "message": "Removed from wishlist"
}
```

---

### Cart API (`src/api/orders.js`)

#### GET /cart
Get user's cart (requires auth).

**Response (200):**
```json
{
  "items": [
    {
      "id": "cart_item_id",
      "productId": "product_id",
      "name": "Product Name",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "total": 199.98
}
```

---

#### POST /cart
Add item to cart (requires auth).

**Request:**
```json
{
  "productId": "product_id",
  "quantity": 2
}
```

**Response (201):**
```json
{
  "id": "cart_item_id",
  "productId": "product_id",
  "quantity": 2
}
```

---

#### PUT /cart/:cartItemId
Update cart item quantity (requires auth).

**Request:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "id": "cart_item_id",
  "quantity": 3
}
```

---

#### DELETE /cart/:cartItemId
Remove item from cart (requires auth).

**Response (200):**
```json
{
  "message": "Item removed"
}
```

---

#### DELETE /cart
Clear entire cart (requires auth).

**Response (200):**
```json
{
  "message": "Cart cleared"
}
```

---

### Orders API (`src/api/orders.js`)

#### POST /orders
Create new order (requires auth).

**Request:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "123456789",
    "address": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345"
  },
  "paymentMethod": "credit_card"
}
```

**Response (201):**
```json
{
  "id": "order_id",
  "orderNumber": "ORD-001",
  "items": [ ... ],
  "total": 199.98,
  "status": "pending",
  "createdAt": "2024-01-12T10:00:00Z"
}
```

---

#### GET /orders
Get user's orders (requires auth).

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)

**Response (200):**
```json
{
  "orders": [
    {
      "id": "order_id",
      "orderNumber": "ORD-001",
      "total": 199.98,
      "status": "shipped",
      "createdAt": "2024-01-12T10:00:00Z"
    }
  ],
  "total": 15,
  "pages": 2
}
```

---

#### GET /orders/:orderId
Get specific order details (requires auth).

**Response (200):**
```json
{
  "id": "order_id",
  "orderNumber": "ORD-001",
  "items": [ ... ],
  "total": 199.98,
  "status": "shipped",
  "shippingAddress": { ... },
  "createdAt": "2024-01-12T10:00:00Z"
}
```

---

#### POST /orders/:orderId/cancel
Cancel an order (requires auth).

**Response (200):**
```json
{
  "id": "order_id",
  "status": "cancelled"
}
```

---

## Error Handling

All endpoints should return appropriate HTTP status codes:

- **400** - Bad Request (validation error)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (user not allowed)
- **404** - Not Found (resource doesn't exist)
- **500** - Server Error

**Error Response Format:**
```json
{
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

The frontend automatically adds this header in `src/api/client.js` interceptor.

---

## CORS Configuration

Ensure your backend allows requests from the frontend:

```javascript
app.use(cors({
  origin: 'http://localhost:3000', // or your frontend URL
  credentials: true
}))
```

---

## Testing the Integration

1. Start your backend server
2. Update `API_BASE_URL` in `src/api/client.js`
3. Run the frontend: `npm run dev`
4. Test features in this order:
   - Sign up / Sign in
   - View products
   - Add to cart
   - Checkout
   - View orders

---

## Notes

- All timestamps should be in ISO 8601 format
- Prices should be numbers (not strings)
- Images should be complete URLs or CDN paths
- Implement proper pagination for large datasets
- Add rate limiting to prevent abuse
