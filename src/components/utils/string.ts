export function capitalize(string: string) {
	return string
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function strLimiter(s: string, limiter = 150) {
	return s.length > limiter ? s.slice(0, limiter) + '...' : s;
}
