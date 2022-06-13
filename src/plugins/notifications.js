import NotificationsList from '@/components/notifications/NotificationsList'
import { ref } from 'vue'

export default {
	install: (app) => {
		app.config.globalProperties.$notifications = ref({})
		app.config.globalProperties.$notify = (type, body, title = null, data = {}) => {
			let uid = Date.now().toString()
			app.config.globalProperties.$notifications.value = Object.assign({[uid]: {
				title: title,
				body: body,
				type: type,
				data: data
			}}, app.config.globalProperties.$notifications.value)

			setTimeout(() => {
				delete app.config.globalProperties.$notifications.value[uid]
			}, data.duration ?? 3000)
		}

		app.component('notifications-list', NotificationsList)
		app.provide('notifications', app.config.globalProperties.$notifications)
	}
}