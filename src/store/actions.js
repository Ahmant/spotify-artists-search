import axios from 'axios';
import router from '@/router/index'

export default {
	// Loader
	startLoader({ commit }) {
		commit('startLoader')
	},
	stopLoader({ commit }) {
		commit('stopLoader')
	},
	setLoaderText({ commit }, text) {
		commit('setLoaderText', text);
	},
	// Spotify Authentication
	async getAccessToken({ commit, dispatch }, code) {
		dispatch("startLoader");

		let body = new URLSearchParams({
			code: code,
			redirect_uri: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_SPOTIFY_REDIRECT_PATH,
			grant_type: "authorization_code",
		}).toString();

		let config = {
			headers: {
				Authorization: localStorage.getItem('spotify_authorization_base64'),
				"Content-Type": "application/x-www-form-urlencoded",
			},
		};

		await axios
			.post("https://accounts.spotify.com/api/token", body, config)
			.then(function (response) {
				localStorage.setItem("spotify_access_token", response.data.access_token);
				localStorage.setItem("spotify_refresh_token", response.data.refresh_token);
				localStorage.setItem("spotify_expires_in", response.data.expires_in);

				let currentDate = new Date();
				let expiresAt = currentDate.setSeconds(currentDate.getSeconds() + response.data.expires_in);
				localStorage.setItem("spotify_expires_at", expiresAt);

				router.push({ name: "artists" });
			})
			.catch(function () {
				commit('handleAuthError');
			})
			.then(() => {
				dispatch("stopLoader");
			});
	},
	async getRefreshToken({ commit, dispatch }) {
		console.log('refresh')
		dispatch("startLoader");

		let body = new URLSearchParams({
			refresh_token: localStorage.getItem('spotify_refresh_token'),
			grant_type: "refresh_token",
		}).toString();

		let config = {
			headers: {
				Authorization: localStorage.getItem('spotify_authorization_base64'),
				"Content-Type": "application/x-www-form-urlencoded",
			},
		};

		await axios
			.post("https://accounts.spotify.com/api/token", body, config)
			.then(function (response) {
				localStorage.setItem("spotify_access_token", response.data.access_token);
				localStorage.setItem("spotify_expires_in", response.data.expires_in);

				let currentDate = new Date();
				let expiresAt = currentDate.setSeconds(currentDate.getSeconds() + response.data.expires_in);
				localStorage.setItem("spotify_expires_at", expiresAt);

				router.push({ name: "artists" });
			})
			.catch(function () {
				commit('handleAuthError');
			})
			.then(() => {
				dispatch("stopLoader");
			});
	},
	handleAuthError({ commit }) {
		commit('handleAuthError');
	},
	// Artists
	setArtistsSearchText({ commit }, searchText) {
		commit('setArtistsSearchText', searchText)
	},
	async getArtist({ commit, dispatch }, artistId) {
		dispatch("startLoader");

		let config = {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("spotify_access_token"),
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		axios
			.get(`https://api.spotify.com/v1/artists/${artistId}`, config)
			.then(function (response) {
				commit('setCurrentArtist', response.data);
			})
			.catch(function (error) {
				dispatch('handleApiError', error)
			})
			.then(() => {
				dispatch("stopLoader");
			});
	},
	async getArtists({ commit, dispatch }, { searchText, offset, overrideData = true }) {
		if (!searchText) {
			commit('setArtists', null);
			return;
		}

		dispatch("startLoader");
		commit('setIsGettingArtists', true)
		commit('setNoMoreArtistsFound', false)

		let parameters = new URLSearchParams({
			q: searchText,
			include_external: true,
			offset: offset || 0,
			type: "artist",
		}).toString();

		let config = {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("spotify_access_token"),
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		await axios
			.get("https://api.spotify.com/v1/search?" + parameters, config)
			.then(function (response) {
				if (overrideData) {
					commit('setArtists', response.data.artists.items);
				}
				else {
					// Used in "scroll down to load more"
					if (response.data.artists.items.length == 0) {
						commit('setNoMoreArtistsFound', true)
					}
					else {
						commit('addArtists', response.data.artists.items);
					}
				}
			})
			.catch(function (error) {
				if (!offset) {
					// Clear items when error happens, only if it's a new search (not scrolling down)
					commit('setArtists', null);
				}
				dispatch('handleApiError', error)
			})
			.then(() => {
				dispatch("stopLoader");
				commit('setIsGettingArtists', false)
			});
	},
	// Albums
	async getArtistAlbums({ commit, dispatch }, { artistId, offset, overrideData = true }) {
		dispatch("startLoader");

		commit('setIsGettingArtistAlbums', true)
		commit('setNoMoreArtistAlbumsFound', false)

		let parameters = new URLSearchParams({
			offset: offset || 0,
		}).toString();

		let config = {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("spotify_access_token"),
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
		axios
			.get(`https://api.spotify.com/v1/artists/${artistId}/albums?${parameters}`, config)
			.then(function (response) {
				if (overrideData) {
					commit('setCurrentArtistAlbums', response.data.items);
				}
				else {
					// Used in "scroll down to load more"
					if (response.data.items.length == 0) {
						commit('setNoMoreArtistAlbumsFound', true)
					}
					else {
						commit('addCurrentArtistAlbums', response.data.items);
					}
				}
			})
			.catch(function (error) {
				dispatch('handleApiError', error)
			})
			.then(() => {
				dispatch("stopLoader");
				commit('setIsGettingArtistAlbums', false)
			});
	},
	// Other
	handleApiError({ dispatch }, error) {
		console.log(error)
		if (error.response.status == 401) {
			dispatch('getRefreshToken');
		}
		else if (error.response.status == 403) {
			dispatch('handleAuthError')
		}
		else {
			dispatch('handleAuthError')
		}
	},
}