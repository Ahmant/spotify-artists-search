<template>
    <h1 class="text-2xl font-semibold">{{ artist ? artist.name : "" }}</h1>
    <h6>Albums</h6>

    <div v-if="albums && albums.length > 0" class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full mt-10">
        <album-card
            v-for="album in albums"
            :key="album.id"
            :name="album.name"
            :tracks="album.total_tracks"
            :releaseDate="album.release_date"
            :image="album.images[0]"
            :artistName="album.artists[0].name"
            :link="album.external_urls.spotify"
        />
    </div>
</template>

<script setup>
    import { computed, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";
    import AlbumCard from "../components/AlbumCard.vue";

    const route = useRoute();
    const store = useStore();

    const artist = computed(() => store.state.currentArtist);
    const albums = computed(() => store.state.currentArtistAlbums);

    onMounted(() => {
        store.dispatch("getArtist", route.params.id);
        store.dispatch("getArtistAlbums", route.params.id);
    });
</script>