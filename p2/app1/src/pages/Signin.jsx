import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Signin = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [localError, setLocalError] = useState('')
	const navigate = useNavigate()
	const { signin, loading, error } = useAuth()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLocalError('')

		if (!formData.email || !formData.password) {
			setLocalError('Email and password are required')
			return
		}

		try {
			await signin(formData.email, formData.password)
			navigate('/')
		} catch (err) {
			setLocalError(err.message || 'Signin failed')
		}
	}

	const handleGoogleSignin = async (credentialResponse) => {
		try {
			// TODO: Implement Google OAuth signin
			console.log('Google signin:', credentialResponse)
		} catch (err) {
			setLocalError('Google signin failed')
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4">
			<div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
				<div>
					<h2 className="text-center text-3xl font-bold text-gray-900">Sign In</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Welcome back to our marketplace
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{(localError || error) && (
						<div className="rounded bg-red-50 p-4 text-red-700">{localError || error}</div>
					)}

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

					<div className="flex items-center justify-between">
						<label className="flex items-center">
							<input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
							<span className="ml-2 text-sm text-gray-600">Remember me</span>
						</label>
						<a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
							Forgot password?
						</a>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
					>
						{loading ? 'Signing in...' : 'Sign In'}
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
					Google Sign In (Configure in .env)
				</button>

				<p className="text-center text-sm text-gray-600">
					Don't have an account?{' '}
					<Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}
