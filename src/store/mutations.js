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
	addArtists(state, artists) {
		state.artists = [...state.artists, ...artists]
	},
	setCurrentArtist(state, artist) {
		state.currentArtist = artist
	},
	setIsGettingArtists(state, status) {
		state.isGettingArtists = status
	},
	setNoMoreArtistsFound(state, status) {
		state.noMoreArtistsFound = status
	},
	// Albums
	setCurrentArtistAlbums(state, albums) {
		state.currentArtistAlbums = albums
	},
	addCurrentArtistAlbums(state, albums) {
		state.currentArtistAlbums = [...state.currentArtistAlbums, ...albums];
	},
	setIsGettingArtistAlbums(state, status) {
		state.isGettingArtistAlbums = status
	},
	setNoMoreArtistAlbumsFound(state, status) {
		state.noMoreArtistAlbumsFound = status
	},
	// Other
}