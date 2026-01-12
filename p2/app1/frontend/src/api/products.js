import api from './client'

// TODO: Implement backend endpoint to fetch products with pagination
export const getProducts = async (page = 1, limit = 20, filters = {}) => {
	try {
		const response = await api.get('/products', {
			params: { page, limit, ...filters },
		})
		// TODO: Backend should return { products: [], total, pages }
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to fetch products' }
	}
}

// TODO: Implement backend endpoint to fetch single product details
export const getProductById = async (productId) => {
	try {
		const response = await api.get(`/products/${productId}`)
		// TODO: Backend should return complete product with reviews, ratings, etc.
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to fetch product' }
	}
}

// TODO: Implement backend endpoint to search products
export const searchProducts = async (query, filters = {}) => {
	try {
		const response = await api.get('/products/search', {
			params: { q: query, ...filters },
		})
		// TODO: Backend should return filtered products
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Search failed' }
	}
}

// TODO: Implement backend endpoint to get product categories
export const getCategories = async () => {
	try {
		const response = await api.get('/categories')
		// TODO: Backend should return { categories: [] }
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to fetch categories' }
	}
}

// TODO: Implement backend endpoint to add product review (requires auth)
export const addProductReview = async (productId, rating, review) => {
	try {
		const response = await api.post(`/products/${productId}/reviews`, {
			rating,
			review,
		})
		// TODO: Backend should validate user is authenticated and product exists
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to add review' }
	}
}

// TODO: Implement backend endpoint to get wishlisted products (requires auth)
export const getWishlist = async () => {
	try {
		const response = await api.get('/wishlist')
		// TODO: Backend should return { wishlist: [] }
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to fetch wishlist' }
	}
}

// TODO: Implement backend endpoint to add product to wishlist (requires auth)
export const addToWishlist = async (productId) => {
	try {
		const response = await api.post('/wishlist', { productId })
		// TODO: Backend should add product to user's wishlist
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to add to wishlist' }
	}
}

// TODO: Implement backend endpoint to remove from wishlist (requires auth)
export const removeFromWishlist = async (productId) => {
	try {
		const response = await api.delete(`/wishlist/${productId}`)
		// TODO: Backend should remove product from user's wishlist
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Failed to remove from wishlist' }
	}
}
