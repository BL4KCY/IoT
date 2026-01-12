import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'

export const Cart = () => {
	const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()
	const navigate = useNavigate()

	if (cart.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50">
				<div className="mx-auto max-w-7xl px-4 py-12">
					<h1 className="text-3xl font-bold">Shopping Cart</h1>
					<div className="mt-12 text-center">
						<p className="text-xl text-gray-600">Your cart is empty</p>
						<button
							onClick={() => navigate('/')}
							className="mt-6 rounded bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
						>
							Continue Shopping
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-7xl px-4 py-12">
				<h1 className="text-3xl font-bold">Shopping Cart</h1>

				<div className="mt-8 grid gap-8 lg:grid-cols-3">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-4 rounded-lg bg-white p-6 shadow">
						{cart.map((item) => (
							<div key={item.id} className="flex gap-4 border-b pb-4 last:border-0">
								<img
									src={item.image}
									alt={item.name}
									className="h-24 w-24 rounded object-cover"
								/>
								<div className="flex-1">
									<h3 className="font-semibold">{item.name}</h3>
									<p className="text-gray-600">${item.price}</p>
								</div>

								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2 border rounded">
										<button
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
											className="px-2 py-1"
										>
											−
										</button>
										<span className="px-4">{item.quantity}</span>
										<button
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
											className="px-2 py-1"
										>
											+
										</button>
									</div>
									<p className="w-20 text-right font-semibold">
										${(item.price * item.quantity).toFixed(2)}
									</p>
									<button
										onClick={() => removeFromCart(item.id)}
										className="p-2 text-red-600 hover:bg-red-50 rounded"
									>
										<AiOutlineDelete size={20} />
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className="rounded-lg bg-white p-6 shadow h-fit">
						<h2 className="text-xl font-bold">Order Summary</h2>

						<div className="mt-6 space-y-4 border-b pb-4">
							<div className="flex justify-between">
								<span>Subtotal:</span>
								<span>${getTotalPrice().toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping:</span>
								<span className="text-green-600">Free</span>
							</div>
							<div className="flex justify-between">
								<span>Tax:</span>
								<span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
							</div>
						</div>

						<div className="mt-4 flex justify-between text-xl font-bold">
							<span>Total:</span>
							<span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
						</div>

						<button
							onClick={() => navigate('/checkout')}
							className="mt-6 w-full rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
						>
							Proceed to Checkout
						</button>

						<button
							onClick={() => navigate('/')}
							className="mt-3 w-full rounded border border-gray-300 py-3 font-semibold hover:bg-gray-50"
						>
							Continue Shopping
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
