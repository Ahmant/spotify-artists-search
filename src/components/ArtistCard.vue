<template>
    <div
        class="
            w-full
            bg-white
            shadow
            rounded
            overflow-hidden
            cursor-pointer
            hover:shadow-lg
            transition-all
            duration-700
            relative
        "
        @click="openArtistAlbums(props.id)"
    >
        <div class="w-full h-75-w-container overflow-hidden">
            <div class="h-75-w-child bg-gray-500">
                <img v-if="props.image && props.image.url" :src="props.image.url" class="w-full h-full object-cover object-center" :alt="props.name" />
            </div>
        </div>
        <div class="p-2">
            <h4 class="font-semibold">{{ props.name }}</h4>
            <span class="text-xs">{{ props.followers }} {{ props.followers == 1 ? "folower" : "folowers" }}</span>
        </div>

        <div class="mb-10"></div>
        
        <div class="w-full absolute bottom-0 p-2">
            <rating-stars class="mt-5" :rating="props.popularity"></rating-stars>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";
    import RatingStars from "./partials/RatingStars.vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const props = defineProps({
        id: String,
        name: String,
        image: Object,
        followers: Number,
        popularity: Number,
    });

    function openArtistAlbums(id) {
        router.push({ name: "artists.albums", params: { id: id } });
    }
</script>