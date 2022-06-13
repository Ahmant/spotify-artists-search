<template>
    <!-- <div class="w-full h-full flex justify-center items-center flex-col"> -->
    <div
        class="
            w-full
            h-full
            absolute
            top-1/2
            left-1/2
            transform
            -translate-x-1/2 -translate-y-1/2
            flex
            justify-center
            items-center
            flex-col
        "
    >
        <button
            class="
                shadow
                bg-white
                p-3
                w-3/4
                md:w-1/2
                border
                text-center
                hover:shadow-md
                transition
                duration-300
                relative
                rounded-full
            "
            @click="login()"
        >
            <span class="font-semibold text-xl">Login with Spotify</span>
            <span class="absolute top-1/2 transform -translate-y-1/2 right-5 text-4xl text-primary">
                <i class="fa-brands fa-spotify"></i>
            </span>
        </button>
        <p v-if="isError" class="text-red-500 font-semibold py-1">Something went wrong. Please try logging in again.</p>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { useGenerateUID } from "@/plugins/useGenerateUID";

    const router = useRouter();
    const route = useRoute();
    const isError = ref(false);
    router.isReady().then(() => {
        // Error Handler
        if (route.query.error == "1") {
            isError.value = true;

            // Remove "error" parameter from uel
            router.replace({
                ...router.currentRoute,
                query: {},
            });
        }
    });

    const generateUID = useGenerateUID();
    function login() {
        let state = generateUID();
        let scope = "";

        let authUrl = "https://accounts.spotify.com/authorize";
        let parameters = {
            response_type: "code",
            client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_SPOTIFY_REDIRECT_PATH,
            state: state,
        };
        authUrl += "?" + new URLSearchParams(parameters).toString();

        window.location.href = authUrl;
    }
</script>