import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth()

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-xl">Loading...</div>
			</div>
		)
	}

	if (!isAuthenticated) {
		return <Navigate to="/signin" replace />
	}

	return children
}
