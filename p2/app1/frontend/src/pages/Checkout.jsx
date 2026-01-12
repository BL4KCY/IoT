import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Checkout = () => {
	const { cart, getTotalPrice, clearCart } = useCart()
	const { user } = useAuth()
	const navigate = useNavigate()
	const [step, setStep] = useState('shipping')
	const [shippingData, setShippingData] = useState({
		fullName: user?.fullName || '',
		email: user?.email || '',
		phone: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
	})
	const [paymentData, setPaymentData] = useState({
		cardNumber: '',
		cardName: '',
		expiryDate: '',
		cvv: '',
	})
	const [loading, setLoading] = useState(false)

	if (cart.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50">
				<div className="mx-auto max-w-7xl px-4 py-12 text-center">
					<p className="text-xl text-gray-600">Cart is empty. Please add items before checkout.</p>
					<button
						onClick={() => navigate('/')}
						className="mt-6 rounded bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
					>
						Back to Shopping
					</button>
				</div>
			</div>
		)
	}

	const handleShippingChange = (e) => {
		setShippingData({
			...shippingData,
			[e.target.name]: e.target.value,
		})
	}

	const handlePaymentChange = (e) => {
		setPaymentData({
			...paymentData,
			[e.target.name]: e.target.value,
		})
	}

	const handleShippingSubmit = (e) => {
		e.preventDefault()
		// TODO: Validate shipping address on backend
		setStep('payment')
	}

	const handlePaymentSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			// TODO: Call backend to create order
			// TODO: Integrate payment gateway (Stripe, PayPal)
			// TODO: Handle payment processing and order confirmation
			console.log('Order data:', {
				items: cart,
				shipping: shippingData,
				payment: paymentData,
				total: getTotalPrice(),
			})

			// Simulate successful order
			alert('Order placed successfully!')
			clearCart()
			navigate('/orders')
		} catch (error) {
			console.error('Checkout error:', error)
			alert('Checkout failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const total = getTotalPrice()
	const tax = total * 0.1
	const grandTotal = total + tax

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-7xl px-4 py-12">
				<h1 className="text-3xl font-bold">Checkout</h1>

				<div className="mt-8 grid gap-8 lg:grid-cols-3">
					{/* Checkout Form */}
					<div className="lg:col-span-2">
						{/* Steps */}
						<div className="mb-8 flex gap-4 rounded-lg bg-white p-6 shadow">
							<button
								onClick={() => setStep('shipping')}
								className={`flex-1 py-2 font-semibold text-center rounded ${step === 'shipping'
										? 'bg-blue-600 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
									}`}
							>
								1. Shipping
							</button>
							<button
								onClick={() => step !== 'shipping' && setStep('payment')}
								className={`flex-1 py-2 font-semibold text-center rounded ${step === 'payment'
										? 'bg-blue-600 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
									}`}
							>
								2. Payment
							</button>
						</div>

						{/* Shipping Form */}
						{step === 'shipping' && (
							<form onSubmit={handleShippingSubmit} className="rounded-lg bg-white p-6 shadow">
								<h2 className="mb-6 text-xl font-bold">Shipping Address</h2>

								<div className="grid gap-4 sm:grid-cols-2">
									<div>
										<label className="block text-sm font-medium">Full Name</label>
										<input
											type="text"
											name="fullName"
											value={shippingData.fullName}
											onChange={handleShippingChange}
											required
											className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium">Email</label>
										<input
											type="email"
											name="email"
											value={shippingData.email}
											onChange={handleShippingChange}
											required
											className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium">Phone</label>
										<input
											type="tel"
											name="phone"
											value={shippingData.phone}
											onChange={handleShippingChange}
											required
											className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div></div>
									<div className="sm:col-span-2">
										<label className="block text-sm font-medium">Address</label>
										<input
											type="text"
											name="address"
											value={shippingData.address}
											onChange={handleShippingChange}
											required
											className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium">City</label>
										<input
											type="text"
											name="city"
											value={shippingData.city}
											onChange={handleShippingChange}
											required
											className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium">State</label>
										<input
											type="text"
											name="state"
											value={shippingData.state}
											onChange={handleShippingChange}
											required
											className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium">Zip Code</label>
										<input
											type="text"
											name="zipCode"
											value={shippingData.zipCode}
											onChange={handleShippingChange}
											required
											className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
								</div>

								<button
									type="submit"
									className="mt-6 w-full rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
								>
									Continue to Payment
								</button>
							</form>
						)}

						{/* Payment Form */}
						{step === 'payment' && (
							<form onSubmit={handlePaymentSubmit} className="rounded-lg bg-white p-6 shadow">
								<h2 className="mb-6 text-xl font-bold">Payment Information</h2>

								{/* TODO: Integrate with Stripe or PayPal for secure payment processing */}
								<div className="mb-6 rounded bg-blue-50 p-4 text-blue-800">
									<p className="font-semibold">Note:</p>
									<p className="mt-2">
										This is a demo checkout. In production, this will be integrated with a payment
										gateway (Stripe, PayPal, etc.) for secure payment processing.
									</p>
								</div>

								<div className="grid gap-4">
									<div>
										<label className="block text-sm font-medium">Card Holder Name</label>
										<input
											type="text"
											name="cardName"
											value={paymentData.cardName}
											onChange={handlePaymentChange}
											required
											className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium">Card Number</label>
										<input
											type="text"
											name="cardNumber"
											value={paymentData.cardNumber}
											onChange={handlePaymentChange}
											placeholder="1234 5678 9012 3456"
											required
											className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div className="grid gap-4 sm:grid-cols-2">
										<div>
											<label className="block text-sm font-medium">Expiry Date</label>
											<input
												type="text"
												name="expiryDate"
												value={paymentData.expiryDate}
												onChange={handlePaymentChange}
												placeholder="MM/YY"
												required
												className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium">CVV</label>
											<input
												type="text"
												name="cvv"
												value={paymentData.cvv}
												onChange={handlePaymentChange}
												placeholder="123"
												required
												className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
											/>
										</div>
									</div>
								</div>

								<div className="mt-6 flex gap-4">
									<button
										type="button"
										onClick={() => setStep('shipping')}
										className="flex-1 rounded border border-gray-300 py-3 font-semibold hover:bg-gray-50"
									>
										Back
									</button>
									<button
										type="submit"
										disabled={loading}
										className="flex-1 rounded bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
									>
										{loading ? 'Processing...' : 'Place Order'}
									</button>
								</div>
							</form>
						)}
					</div>

					{/* Order Summary */}
					<div className="rounded-lg bg-white p-6 shadow h-fit">
						<h2 className="text-xl font-bold">Order Summary</h2>

						<div className="mt-6 space-y-3 border-b pb-4 max-h-64 overflow-y-auto">
							{cart.map((item) => (
								<div key={item.id} className="flex justify-between text-sm">
									<span>
										{item.name} x {item.quantity}
									</span>
									<span>${(item.price * item.quantity).toFixed(2)}</span>
								</div>
							))}
						</div>

						<div className="mt-4 space-y-2 text-sm">
							<div className="flex justify-between">
								<span>Subtotal:</span>
								<span>${total.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Tax (10%):</span>
								<span>${tax.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping:</span>
								<span className="text-green-600">Free</span>
							</div>
						</div>

						<div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg">
							<span>Total:</span>
							<span>${grandTotal.toFixed(2)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
