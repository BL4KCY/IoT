import { useState, useContext, createContext, useCallback } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(() => {
		try {
			const saved = localStorage.getItem('cart')
			return saved ? JSON.parse(saved) : []
		} catch {
			return []
		}
	})

	const saveCart = useCallback((newCart) => {
		setCart(newCart)
		localStorage.setItem('cart', JSON.stringify(newCart))
	}, [])

	const addToCart = useCallback(
		(product, quantity = 1) => {
			setCart((prevCart) => {
				const existing = prevCart.find((item) => item.id === product.id)
				let newCart
				if (existing) {
					newCart = prevCart.map((item) =>
						item.id === product.id
							? { ...item, quantity: item.quantity + quantity }
							: item,
					)
				} else {
					newCart = [...prevCart, { ...product, quantity }]
				}
				localStorage.setItem('cart', JSON.stringify(newCart))
				return newCart
			})
		},
		[],
	)

	const removeFromCart = useCallback((productId) => {
		setCart((prevCart) => {
			const newCart = prevCart.filter((item) => item.id !== productId)
			localStorage.setItem('cart', JSON.stringify(newCart))
			return newCart
		})
	}, [])

	const updateQuantity = useCallback((productId, quantity) => {
		if (quantity <= 0) {
			removeFromCart(productId)
			return
		}
		setCart((prevCart) => {
			const newCart = prevCart.map((item) =>
				item.id === productId ? { ...item, quantity } : item,
			)
			localStorage.setItem('cart', JSON.stringify(newCart))
			return newCart
		})
	}, [removeFromCart])

	const clearCart = useCallback(() => {
		setCart([])
		localStorage.removeItem('cart')
	}, [])

	const getTotalPrice = useCallback(
		() => cart.reduce((total, item) => total + item.price * item.quantity, 0),
		[cart],
	)

	const getTotalItems = useCallback(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getTotalPrice,
				getTotalItems,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within CartProvider')
	}
	return context
}
