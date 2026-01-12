import { useState, useContext, createContext, useCallback } from 'react'
import * as authApi from '../api/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		try {
			const saved = localStorage.getItem('user')
			return saved ? JSON.parse(saved) : null
		} catch {
			return null
		}
	})

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const signup = useCallback(async (email, password, fullName) => {
		setLoading(true)
		setError(null)
		try {
			const data = await authApi.signup(email, password, fullName)
			setUser(data.user)
			return data
		} catch (err) {
			setError(err.message || 'Signup failed')
			throw err
		} finally {
			setLoading(false)
		}
	}, [])

	const signin = useCallback(async (email, password) => {
		setLoading(true)
		setError(null)
		try {
			const data = await authApi.signin(email, password)
			setUser(data.user)
			return data
		} catch (err) {
			setError(err.message || 'Signin failed')
			throw err
		} finally {
			setLoading(false)
		}
	}, [])

	const googleSignin = useCallback(async (googleToken) => {
		setLoading(true)
		setError(null)
		try {
			const data = await authApi.googleSignin(googleToken)
			setUser(data.user)
			return data
		} catch (err) {
			setError(err.message || 'Google signin failed')
			throw err
		} finally {
			setLoading(false)
		}
	}, [])

	const logout = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			await authApi.logout()
			setUser(null)
		} catch (err) {
			setError(err.message || 'Logout failed')
			throw err
		} finally {
			setLoading(false)
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				error,
				signup,
				signin,
				googleSignin,
				logout,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}
