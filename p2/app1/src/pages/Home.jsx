import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { getProducts } from '../api/products'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { generatePlaceholderImage } from '../utils/placeholders'

export const Home = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')
	const { addToCart } = useCart()
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true)
				// TODO: Replace with actual backend API call
				const mockProducts = [
					{
						id: 1,
						name: 'Premium Wireless Headphones',
						price: 199.99,
						image: generatePlaceholderImage('🎧 Headphones'),
						rating: 4.5,
						reviews: 234,
						category: 'Electronics',
					},
					{
						id: 2,
						name: 'Organic Coffee Beans',
						price: 24.99,
						image: generatePlaceholderImage('☕ Coffee'),
						rating: 4.8,
						reviews: 156,
						category: 'Food & Beverages',
					},
					{
						id: 3,
						name: 'Professional Camera',
						price: 1299.99,
						image: generatePlaceholderImage('📷 Camera'),
						rating: 4.7,
						reviews: 245,
						category: 'Electronics',
					},
					{
						id: 4,
						name: 'Stainless Steel Water Bottle',
						price: 39.99,
						image: generatePlaceholderImage('💧 Bottle'),
						rating: 4.6,
						reviews: 420,
						category: 'Sports',
					},
					{
						id: 5,
						name: 'Smart Watch',
						price: 299.99,
						image: generatePlaceholderImage('⌚ Watch'),
						rating: 4.4,
						reviews: 512,
						category: 'Electronics',
					},
					{
						id: 6,
						name: 'Bamboo Cutting Board Set',
						price: 34.99,
						image: generatePlaceholderImage('🔪 Board'),
						rating: 4.7,
						reviews: 201,
						category: 'Kitchen',
					},
				]
				setProducts(mockProducts)
			} catch (err) {
				setError('Failed to fetch products')
				console.error('Error fetching products:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [])

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<h1 className="text-4xl font-bold">Welcome to MarketPlace</h1>
					<p className="mt-4 text-xl">Discover amazing products at unbeatable prices</p>
				</div>
			</div>

			{/* Search Bar */}
			<div className="bg-white shadow">
				<div className="mx-auto max-w-7xl px-4 py-8">
					<div className="flex gap-4">
						<div className="relative flex-1">
							<BsSearch className="absolute left-3 top-3 text-gray-400" size={20} />
							<input
								type="text"
								placeholder="Search products..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full rounded border border-gray-300 pl-10 py-2 focus:border-blue-500 focus:outline-none"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Products Grid */}
			<div className="mx-auto max-w-7xl px-4 py-12">
				{error && <div className="mb-8 rounded bg-red-50 p-4 text-red-700">{error}</div>}

				{loading ? (
					<div className="text-center text-xl">Loading products...</div>
				) : (
					<>
						<h2 className="mb-8 text-2xl font-bold">Featured Products</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{filteredProducts.map((product) => (
								<div key={product.id} className="rounded-lg bg-white shadow hover:shadow-lg">
									<div className="relative">
										<img
											src={product.image}
											alt={product.name}
											className="h-48 w-full object-cover"
										/>
										<button
											className="absolute right-4 top-4 rounded-full bg-white p-2 shadow hover:bg-gray-100"
											title="Add to wishlist"
										>
											<AiOutlineHeart size={20} />
										</button>
									</div>

									<div className="p-4">
										<p className="text-sm text-gray-500">{product.category}</p>
										<h3 className="mt-2 line-clamp-2 font-semibold">{product.name}</h3>

										<div className="mt-2 flex items-center gap-2">
											<span className="text-sm font-semibold text-yellow-500">
												★ {product.rating}
											</span>
											<span className="text-xs text-gray-500">({product.reviews})</span>
										</div>

										<div className="mt-4 flex items-center justify-between">
											<span className="text-2xl font-bold text-gray-900">${product.price}</span>
											<button
												onClick={() => addToCart(product)}
												className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
												title="Add to cart"
											>
												<AiOutlineShoppingCart size={20} />
											</button>
										</div>

										<Link
											to={`/product/${product.id}`}
											className="mt-4 block w-full rounded bg-gray-200 py-2 text-center font-semibold text-gray-900 hover:bg-gray-300"
										>
											View Details
										</Link>
									</div>
								</div>
							))}
						</div>

						{filteredProducts.length === 0 && (
							<div className="text-center py-12">
								<p className="text-lg text-gray-600">No products found matching your search</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
