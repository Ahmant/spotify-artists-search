import router from '@/router/index'

export default {
	// Loader
	startLoader(state) {
		state.loader.count++;
	},
	stopLoader(state) {
		state.loader.count--;

		if (state.loader.count <= 0) {
			state.loader.count = 0;
			state.loader.text = '';
		}
	},
	setLoaderText(state, text) {
		state.loader.text = text;
	},
	// Spotify Authentication
	handleAuthError() {
		localStorage.removeItem("spotify_access_token");
		localStorage.removeItem("spotify_expires_in");
		localStorage.removeItem("spotify_refresh_token");

		router.push({ name: "login", query: { error: "1" } });
	},
	// Artists
	setArtistsSearchText(state, searchText) {
		state.artistsSearchText = searchText
	},
	setArtists(state, artists) {
		state.artists = artists
	},
	setCurrentArtist(state, artist) {
		state.currentArtist = artist
	},
	// Albums
	setCurrentArtistAlbums(state, albums) {
		state.currentArtistAlbums = albums
	}
	// Other
}