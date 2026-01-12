import axios from 'axios'

// TODO: Replace with actual backend URL when backend is ready
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
	baseURL: API_BASE_URL,
})

// TODO: Add request interceptor to include JWT token from localStorage
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error),
)

// TODO: Add response interceptor to handle 401 errors and refresh tokens
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// TODO: Implement token refresh or logout logic
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			window.location.href = '/signin'
		}
		return Promise.reject(error)
	},
)

export default api
