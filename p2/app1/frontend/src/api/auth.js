import api from './client'

// TODO: Implement signup endpoint with email/password validation on backend
export const signup = async (email, password, fullName) => {
	try {
		const response = await api.post('/auth/signup', {
			email,
			password,
			fullName,
		})
		// TODO: Backend should return { token, user }
		if (response.data.token) {
			localStorage.setItem('token', response.data.token)
			localStorage.setItem('user', JSON.stringify(response.data.user))
		}
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Signup failed' }
	}
}

// TODO: Implement signin endpoint with email/password validation
export const signin = async (email, password) => {
	try {
		const response = await api.post('/auth/signin', { email, password })
		// TODO: Backend should return { token, user }
		if (response.data.token) {
			localStorage.setItem('token', response.data.token)
			localStorage.setItem('user', JSON.stringify(response.data.user))
		}
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Signin failed' }
	}
}

// TODO: Implement Google OAuth signin endpoint
export const googleSignin = async (googleToken) => {
	try {
		const response = await api.post('/auth/google', { token: googleToken })
		// TODO: Backend should return { token, user }
		if (response.data.token) {
			localStorage.setItem('token', response.data.token)
			localStorage.setItem('user', JSON.stringify(response.data.user))
		}
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Google signin failed' }
	}
}

// TODO: Implement logout endpoint
export const logout = async () => {
	try {
		// TODO: Call backend logout endpoint to invalidate token
		await api.post('/auth/logout')
	} catch (error) {
		console.error('Logout error:', error)
	} finally {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
	}
}

// TODO: Implement refresh token endpoint
export const refreshToken = async () => {
	try {
		const response = await api.post('/auth/refresh')
		// TODO: Backend should return { token }
		if (response.data.token) {
			localStorage.setItem('token', response.data.token)
		}
		return response.data
	} catch (error) {
		throw error.response?.data || { message: 'Token refresh failed' }
	}
}

export const getCurrentUser = () => {
	const user = localStorage.getItem('user')
	return user ? JSON.parse(user) : null
}

export const isAuthenticated = () => {
	return !!localStorage.getItem('token')
}
