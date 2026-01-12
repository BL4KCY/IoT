// Generate a simple SVG placeholder image
export const generatePlaceholderImage = (text, bgColor = '#3b82f6', textColor = '#ffffff') => {
	const svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="${bgColor}"/><text x="100" y="100" font-family="Arial" font-size="14" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`

	// Use encodeURIComponent for proper UTF-8 encoding instead of btoa
	const encoded = encodeURIComponent(svg)
	return `data:image/svg+xml;charset=utf-8,${encoded}`
}
