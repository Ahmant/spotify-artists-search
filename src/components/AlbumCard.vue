<template>
    <div class="w-full bg-white shadow rounded overflow-hidden relative">
        <div class="w-full h-75-w-container overflow-hidden">
            <div class="h-75-w-child bg-slate-700">
                <img v-if="props.image && props.image.url" :src="props.image.url" class="w-full h-full object-cover object-center" :alt="props.name" />
            </div>
        </div>
        <div class="p-2">
            <h4 class="font-semibold">{{ props.name }}</h4>
            <p class="text-xs">{{ getArtistsNames(props.artists) }}</p>
        </div>

        <div class="mb-24"></div>

        <div class="w-full absolute bottom-0">
            <div class="p-2">
                <p class="text-xs mt-5">{{ props.releaseDate }}</p>
                <p class="text-xs">{{ props.tracks }} {{ props.tracks == 1 ? "track" : "tracks" }}</p>
            </div>

            <a :href="props.link" target="_blank" class="block text-center w-full bg-primary hover:bg-primary-hover text-white py-2">
                Preview On Spotify
            </a>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        name: String,
        artists: Object,
        link: String,
        releaseDate: String,
        tracks: Number,
        image: Object,
    });

    function getArtistsNames() {
        let namesArray = [];

        (props.artists || []).forEach(artist => {
            namesArray.push(artist.name)
        });

        return namesArray.join(', ');
    }
</script>