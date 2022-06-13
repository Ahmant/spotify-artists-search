<template>
    <div
        v-if="loader.count > 0"
        class="
            fixed
            top-0
            left-0
            w-screen
            h-screen
            z-1000
            bg-black bg-opacity-20
            flex
            justify-center
            items-center
            flex-col
        "
    >
        <div id="loader">
            <div class="bg-primary"></div>
            <div class="bg-primary"></div>
            <div class="bg-primary"></div>
            <div class="bg-primary"></div>
        </div>
        <p class="font-semibold mt-4">{{ loader.text }}</p>
    </div>
</template>

<script setup>
    import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

    const store = useStore();

    const loader = computed(() => store.state.loader);
</script>

<style scoped>
    #loader {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #loader.active {
        display: flex;
    }

    #loader div {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin: 5px;
        animation: bouncer 0.5s cubic-bezier(0.19, 0.57, 0.3, 0.98) infinite alternate;
    }

    #loader div:nth-child(2) {
        animation-delay: 0.1s;
        opacity: 0.8;
    }

    #loader div:nth-child(3) {
        animation-delay: 0.2s;
        opacity: 0.6;
    }

    #loader div:nth-child(4) {
        animation-delay: 0.3s;
        opacity: 0.4;
    }

    @keyframes bouncer {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(-100px);
        }
    }
</style>