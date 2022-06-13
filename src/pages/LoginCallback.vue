<template>
    <span></span>
</template>

<script setup>
    import { useRoute, useRouter } from "vue-router";
    import { useStore } from "vuex";

    const store = useStore();
    store.dispatch("startLoader");
    store.dispatch("setLoaderText", "Logging In...");

    const router = useRouter();
    const route = useRoute();

    router.isReady().then(() => {
        // Store the "Spotify Authentication Code"
        let code = route.query.code;
        let state = route.query.state;

        if (state == null) {
            store.dispatch('handleAuthError');
        } else {
            store.dispatch('getAccessToken', code)
        }
        
        store.dispatch("stopLoader");
    });
</script>