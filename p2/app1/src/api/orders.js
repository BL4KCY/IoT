import api from './client'

// TODO: Implement backend endpoint to create order (requires auth)
export const createOrder = async (items, shippingAddress, paymentMethod) => {
	try {
		const response = await api.post('/orders', {
			items,
			shippingAddress,
			paymentMethod,
		})
		// TODO: Backend should validate items, calculate total, create order in DB
		// TODO: Integrate payment processing (Stripe, PayPal, etc.)
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to create order' }
	}
}

// TODO: Implement backend endpoint to get user orders (requires auth)
export const getOrders = async (page = 1, limit = 10) => {
	try {
		const response = await api.get('/orders', {
			params: { page, limit },
		})
		// TODO: Backend should return user's orders with pagination
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to fetch orders' }
	}
}

// TODO: Implement backend endpoint to get order details (requires auth)
export const getOrderById = async (orderId) => {
	try {
		const response = await api.get(`/orders/${orderId}`)
		// TODO: Backend should verify user owns this order
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to fetch order' }
	}
}

// TODO: Implement backend endpoint to cancel order (requires auth)
export const cancelOrder = async (orderId) => {
	try {
		const response = await api.post(`/orders/${orderId}/cancel`)
		// TODO: Backend should verify order status and process cancellation/refund
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to cancel order' }
	}
}

// TODO: Implement backend endpoint to get cart items (requires auth)
export const getCart = async () => {
	try {
		const response = await api.get('/cart')
		// TODO: Backend should return user's cart items
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to fetch cart' }
	}
}

// TODO: Implement backend endpoint to add item to cart (requires auth)
export const addToCart = async (productId, quantity) => {
	try {
		const response = await api.post('/cart', { productId, quantity })
		// TODO: Backend should add item or update quantity if exists
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to add to cart' }
	}
}

// TODO: Implement backend endpoint to update cart item (requires auth)
export const updateCartItem = async (cartItemId, quantity) => {
	try {
		const response = await api.put(`/cart/${cartItemId}`, { quantity })
		// TODO: Backend should update item quantity or remove if quantity is 0
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to update cart' }
	}
}

// TODO: Implement backend endpoint to remove from cart (requires auth)
export const removeFromCart = async (cartItemId) => {
	try {
		const response = await api.delete(`/cart/${cartItemId}`)
		// TODO: Backend should remove item from cart
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to remove from cart' }
	}
}

// TODO: Implement backend endpoint to clear cart (requires auth)
export const clearCart = async () => {
	try {
		const response = await api.delete('/cart')
		// TODO: Backend should clear all items from user's cart
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to clear cart' }
	}
}
