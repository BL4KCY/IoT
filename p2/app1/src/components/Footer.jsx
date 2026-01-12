export const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
					<div>
						<h3 className="text-lg font-bold">MarketPlace</h3>
						<p className="mt-4 text-gray-400">Your favorite online marketplace for quality products</p>
					</div>

					<div>
						<h4 className="font-semibold">Shop</h4>
						<ul className="mt-4 space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white">Products</a></li>
							<li><a href="#" className="hover:text-white">Categories</a></li>
							<li><a href="#" className="hover:text-white">Best Sellers</a></li>
							<li><a href="#" className="hover:text-white">New Arrivals</a></li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold">Support</h4>
						<ul className="mt-4 space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white">Contact Us</a></li>
							<li><a href="#" className="hover:text-white">Help Center</a></li>
							<li><a href="#" className="hover:text-white">FAQ</a></li>
							<li><a href="#" className="hover:text-white">Shipping Info</a></li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold">Company</h4>
						<ul className="mt-4 space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white">About Us</a></li>
							<li><a href="#" className="hover:text-white">Privacy Policy</a></li>
							<li><a href="#" className="hover:text-white">Terms of Service</a></li>
							<li><a href="#" className="hover:text-white">Careers</a></li>
						</ul>
					</div>
				</div>

				<div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
					<p>&copy; 2024 MarketPlace. All rights reserved.</p>
					<p className="mt-2 text-sm">This is a demo app built for learning and Kubernetes deployment</p>
				</div>
			</div>
		</footer>
	)
}
