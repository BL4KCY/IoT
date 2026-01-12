import { GoogleLogin } from '@react-oauth/google'

export const GoogleSignInButton = ({ onSuccess, onError }) => {
	// Check if GoogleOAuthProvider is available
	try {
		return (
			<GoogleLogin
				onSuccess={onSuccess}
				onError={() => onError?.()}
			/>
		)
	} catch (error) {
		// If GoogleOAuthProvider is not available, show a placeholder
		return (
			<div className="p-3 text-center text-sm text-gray-500 bg-gray-50 rounded border border-gray-200">
				Google OAuth not configured. Use email/password instead.
			</div>
		)
	}
}
