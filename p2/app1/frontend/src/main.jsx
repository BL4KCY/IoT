import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { Orders } from './pages/Orders'

function App() {
	return (
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<AuthProvider>
				<CartProvider>
					<div className="flex flex-col min-h-screen">
						<Header />
						<main className="flex-grow">
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/signin" element={<Signin />} />
								<Route path="/signup" element={<Signup />} />
								<Route path="/product/:id" element={<ProductDetail />} />
								<Route path="/cart" element={<Cart />} />
								<Route
									path="/checkout"
									element={
										<ProtectedRoute>
											<Checkout />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/orders"
									element={
										<ProtectedRoute>
											<Orders />
										</ProtectedRoute>
									}
								/>
								<Route path="*" element={<Navigate to="/" replace />} />
							</Routes>
						</main>
						<Footer />
					</div>
				</CartProvider>
			</AuthProvider>
		</BrowserRouter>
	)
} ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
