import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Orders = () => {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)
	const { isAuthenticated } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/signin')
			return
		}

		// TODO: Fetch orders from backend API
		const mockOrders = [
			{
				id: 'ORD-001',
				date: '2024-01-10',
				status: 'Delivered',
				total: 299.98,
				items: 3,
			},
			{
				id: 'ORD-002',
				date: '2024-01-05',
				status: 'Shipped',
				total: 49.99,
				items: 1,
			},
			{
				id: 'ORD-003',
				date: '2024-01-01',
				status: 'Pending',
				total: 159.97,
				items: 2,
			},
		]
		setOrders(mockOrders)
		setLoading(false)
	}, [isAuthenticated, navigate])

	const getStatusColor = (status) => {
		switch (status) {
			case 'Delivered':
				return 'bg-green-100 text-green-800'
			case 'Shipped':
				return 'bg-blue-100 text-blue-800'
			case 'Pending':
				return 'bg-yellow-100 text-yellow-800'
			case 'Cancelled':
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	if (loading) {
		return <div className="flex h-screen items-center justify-center">Loading orders...</div>
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-7xl px-4 py-12">
				<h1 className="text-3xl font-bold">My Orders</h1>

				{orders.length === 0 ? (
					<div className="mt-12 text-center">
						<p className="text-xl text-gray-600">You haven't placed any orders yet</p>
						<button
							onClick={() => navigate('/')}
							className="mt-6 rounded bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
						>
							Start Shopping
						</button>
					</div>
				) : (
					<div className="mt-8 space-y-4">
						{orders.map((order) => (
							<div key={order.id} className="rounded-lg bg-white p-6 shadow hover:shadow-lg">
								<div className="grid gap-4 sm:grid-cols-5">
									<div>
										<p className="text-sm text-gray-600">Order ID</p>
										<p className="font-semibold">{order.id}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600">Date</p>
										<p className="font-semibold">{order.date}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600">Status</p>
										<span className={`mt-1 inline-block rounded px-3 py-1 text-sm font-semibold ${getStatusColor(order.status)}`}>
											{order.status}
										</span>
									</div>
									<div>
										<p className="text-sm text-gray-600">Items</p>
										<p className="font-semibold">{order.items}</p>
									</div>
									<div className="text-right">
										<p className="text-sm text-gray-600">Total</p>
										<p className="text-2xl font-bold text-blue-600">${order.total}</p>
									</div>
								</div>

								<div className="mt-4 flex gap-2">
									{/* TODO: Implement order detail view */}
									<button className="rounded border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50">
										View Details
									</button>
									{order.status === 'Pending' && (
										<>
											{/* TODO: Implement order cancellation */}
											<button className="rounded border border-red-300 px-4 py-2 font-semibold text-red-600 hover:bg-red-50">
												Cancel Order
											</button>
										</>
									)}
									{order.status === 'Delivered' && (
										<>
											{/* TODO: Implement review submission */}
											<button className="rounded border border-blue-300 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50">
												Leave Review
											</button>
										</>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
