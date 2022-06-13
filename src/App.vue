<template>
    <the-loader />
    <router-view v-slot="{ Component, route }">
        <transition name="fade">
            <component :is="Component" :key="route.path" />
        </transition>
    </router-view>
</template>

<script setup>
    import { onMounted, watch } from "vue";
    import { useRoute } from "vue-router";
    import TheLoader from "./components/partials/TheLoader.vue";

    const route = useRoute();

    // * When moving from route to another, and due to the "transition/animation" a vertical scrllbar appear even
    watch(route, () => {
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        setTimeout(() => {
            document.getElementsByTagName("body")[0].style.overflowY = "auto";
        }, 500); // 500ms until the transition is done
    });

    onMounted(() => {
        localStorage.setItem(
            "spotify_authorization_base64",
            "Basic " +
                Buffer.from(
                    process.env.VUE_APP_SPOTIFY_CLIENT_ID + ":" + process.env.VUE_APP_SPOTIFY_CLIENT_SECRET,
                    "utf-8"
                ).toString("base64")
        );
    });
</script>

<style>
    #app {
        height: 100%;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>
