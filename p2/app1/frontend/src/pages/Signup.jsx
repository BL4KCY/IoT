import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Signup = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [localError, setLocalError] = useState('')
	const navigate = useNavigate()
	const { signup, loading, error } = useAuth()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLocalError('')

		// Validation
		if (!formData.fullName.trim()) {
			setLocalError('Full name is required')
			return
		}
		if (!formData.email.includes('@')) {
			setLocalError('Valid email is required')
			return
		}
		if (formData.password.length < 6) {
			setLocalError('Password must be at least 6 characters')
			return
		}
		if (formData.password !== formData.confirmPassword) {
			setLocalError('Passwords do not match')
			return
		}

		try {
			await signup(formData.email, formData.password, formData.fullName)
			navigate('/')
		} catch (err) {
			setLocalError(err.message || 'Signup failed')
		}
	}

	const handleGoogleSignup = async (credentialResponse) => {
		try {
			// TODO: Implement Google OAuth signup
			console.log('Google signup:', credentialResponse)
		} catch (err) {
			setLocalError('Google signup failed')
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4">
			<div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
				<div>
					<h2 className="text-center text-3xl font-bold text-gray-900">Create Account</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Join our marketplace to start shopping
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{(localError || error) && (
						<div className="rounded bg-red-50 p-4 text-red-700">{localError || error}</div>
					)}

					<div>
						<label className="block text-sm font-medium text-gray-700">Full Name</label>
						<input
							type="text"
							name="fullName"
							value={formData.fullName}
							onChange={handleChange}
							className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
							placeholder="John Doe"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
							placeholder="••••••"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Confirm Password</label>
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
							placeholder="••••••"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
					>
						{loading ? 'Creating account...' : 'Sign Up'}
					</button>
				</form>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="bg-white px-2 text-gray-500">Or continue with</span>
					</div>
				</div>

				<button
					type="button"
					disabled
					className="w-full rounded bg-gray-300 py-2 font-semibold text-gray-500 cursor-not-allowed"
				>
					Google Sign Up (Configure in .env)
				</button>

				<p className="text-center text-sm text-gray-600">
					Already have an account?{' '}
					<Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-700">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	)
}
