import store from '@/store';

export default function auth({ next, router }) {
	let currentDate = new Date();
	let expiresAt = localStorage.spotify_expires_at;

	if (!expiresAt || !localStorage.getItem('spotify_access_token')) {
		return router.push({ name: 'login' });
	}
	else if (currentDate > expiresAt) {
		store.dispatch('getRefreshToken')
	}

	return next();
}