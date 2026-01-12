import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { useCart } from '../context/CartContext'

export const ProductDetail = () => {
	const { id } = useParams()
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [quantity, setQuantity] = useState(1)
	const { addToCart } = useCart()

	useEffect(() => {
		// TODO: Replace with actual backend API call to getProductById(id)
		const mockProduct = {
			id: parseInt(id),
			name: 'Premium Wireless Headphones',
			price: 199.99,
			image: 'https://via.placeholder.com/400?text=Headphones',
			rating: 4.5,
			reviews: 234,
			category: 'Electronics',
			description:
				'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality.',
			features: [
				'Active Noise Cancellation',
				'30-hour battery life',
				'Bluetooth 5.0',
				'Comfortable over-ear design',
				'Built-in microphone',
			],
			inStock: true,
			shippingInfo: 'Free shipping on orders over $50. Delivery in 3-5 business days.',
		}
		setProduct(mockProduct)
		setLoading(false)
	}, [id])

	if (loading) {
		return <div className="flex h-screen items-center justify-center">Loading...</div>
	}

	if (!product) {
		return <div className="flex h-screen items-center justify-center">Product not found</div>
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-7xl px-4 py-8">
				<div className="grid gap-8 md:grid-cols-2">
					{/* Image */}
					<div>
						<img
							src={product.image}
							alt={product.name}
							className="h-96 w-full object-cover rounded-lg"
						/>
					</div>

					{/* Product Info */}
					<div>
						<p className="text-sm text-gray-500">{product.category}</p>
						<h1 className="mt-2 text-4xl font-bold">{product.name}</h1>

						<div className="mt-4 flex items-center gap-4">
							<span className="text-2xl font-bold text-yellow-500">★ {product.rating}</span>
							<span className="text-gray-600">({product.reviews} reviews)</span>
						</div>

						<div className="mt-6 border-t border-b py-4">
							<p className="text-4xl font-bold text-gray-900">${product.price}</p>
							<p className="mt-2 text-green-600">
								{product.inStock ? '✓ In Stock' : 'Out of Stock'}
							</p>
						</div>

						<p className="mt-6 text-gray-700">{product.description}</p>

						<div className="mt-6">
							<h3 className="font-semibold">Features:</h3>
							<ul className="mt-3 space-y-2">
								{product.features.map((feature, idx) => (
									<li key={idx} className="flex items-center gap-2 text-gray-700">
										<span className="text-blue-600">✓</span> {feature}
									</li>
								))}
							</ul>
						</div>

						<div className="mt-8 space-y-4">
							<div className="flex items-center gap-4">
								<label className="font-semibold">Quantity:</label>
								<select
									value={quantity}
									onChange={(e) => setQuantity(parseInt(e.target.value))}
									className="rounded border border-gray-300 px-4 py-2"
								>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
										<option key={num} value={num}>
											{num}
										</option>
									))}
								</select>
							</div>

							<div className="flex gap-4">
								<button
									onClick={() => addToCart(product, quantity)}
									className="flex-1 rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
								>
									Add to Cart
								</button>
								<button className="flex-1 rounded border border-gray-300 py-3 font-semibold hover:bg-gray-50 flex items-center justify-center gap-2">
									<AiOutlineHeart size={20} />
									Wishlist
								</button>
							</div>
						</div>

						<div className="mt-8 rounded bg-blue-50 p-4">
							<h3 className="font-semibold text-blue-900">Shipping Information</h3>
							<p className="mt-2 text-blue-800">{product.shippingInfo}</p>
						</div>
					</div>
				</div>

				{/* TODO: Add reviews section with backend integration */}
				<div className="mt-16 border-t pt-8">
					<h2 className="text-2xl font-bold">Customer Reviews</h2>
					<p className="mt-4 text-gray-600">
						Reviews feature will be integrated with backend. Users will be able to rate and review
						products here.
					</p>
					{/* TODO: List reviews from backend */}
					{/* TODO: Show review form for authenticated users */}
				</div>
			</div>
		</div>
	)
}
