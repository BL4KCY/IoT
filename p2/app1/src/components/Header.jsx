import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export const Header = () => {
	const { cart } = useCart()
	const { user, logout, isAuthenticated } = useAuth()
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		navigate('/signin')
	}

	const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0)

	return (
		<header className="sticky top-0 z-50 bg-white shadow">
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex items-center justify-between py-4">
					{/* Logo */}
					<Link to="/" className="text-2xl font-bold text-blue-600">
						MarketPlace
					</Link>

					{/* Navigation */}
					<nav className="hidden md:flex items-center gap-8">
						<Link to="/" className="hover:text-blue-600">
							Home
						</Link>
						{isAuthenticated && (
							<>
								<Link to="/orders" className="hover:text-blue-600">
									Orders
								</Link>
								{/* TODO: Add wishlist page */}
								<a href="#" className="hover:text-blue-600">
									Wishlist
								</a>
							</>
						)}
					</nav>

					{/* Right Actions */}
					<div className="flex items-center gap-4">
						{/* Cart */}
						<Link to="/cart" className="relative hover:text-blue-600">
							<AiOutlineShoppingCart size={24} />
							{getTotalItems() > 0 && (
								<span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
									{getTotalItems()}
								</span>
							)}
						</Link>

						{/* Auth Actions */}
						{isAuthenticated ? (
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<AiOutlineUser size={20} />
									<span className="text-sm font-semibold">{user?.fullName || 'User'}</span>
								</div>
								<button
									onClick={handleLogout}
									className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
								>
									<AiOutlineLogout size={18} />
									Logout
								</button>
							</div>
						) : (
							<div className="flex gap-2">
								<Link
									to="/signin"
									className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
								>
									Sign In
								</Link>
								<Link
									to="/signup"
									className="rounded border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
								>
									Sign Up
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
