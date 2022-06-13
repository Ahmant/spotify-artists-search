import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue';
import LoginCallback from '@/pages/LoginCallback.vue';
import ArtistsSearch from '@/pages/ArtistsSearch.vue';
import ArtistAlbums from '@/pages/ArtistAlbums.vue';
import Empty from '@/components/layout/Empty.vue';

import AuthMiddleware from '@/middleware/auth'


const routes = [
	{
		path: "/",
		redirect: "artists"
	},
	{
		path: "/login",
		component: Empty,
		children: [
			{
				path: "",
				name: "login",
				component: Login,
				meta: {
					title: "Login",
				}
			},
			{
				path: "callback",
				name: "login.callback",
				component: LoginCallback,
				meta: {
					title: "Login Callback",
				}
			},
		]
	},
	{
		path: "/artists",
		component: Empty,
		children: [
			{
				path: "",
				name: "artists",
				component: ArtistsSearch,
				meta: {
					title: "Artists",
					middleware: AuthMiddleware
				}
			},
			{
				path: ":id/albums",
				name: "artists.albums",
				component: ArtistAlbums,
				meta: {
					title: "Artist Albums",
					middleware: AuthMiddleware
				}
			},
		]
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

function nextFactory(context, middleware, index) {
	const subsequenceMiddleware = middleware[index];
	if (!subsequenceMiddleware) {
		return context.next;
	}

	return (...parameters) => {
		context.next(...parameters);
		const nextMiddleware = nextFactory(context, middleware, index + 1);
		subsequenceMiddleware({...context, next: nextMiddleware})
	}
}

router.beforeEach((to, from, next) => {
	if (to.meta.middleware) {
		const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
		const context = {from, next, router, to};
		const nextMiddleware = nextFactory(context, middleware, 1);

		return middleware[0]({...context, next: nextMiddleware});
	}

	return next();
})

export default router
