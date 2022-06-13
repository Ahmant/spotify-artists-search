<template>
    <h1 class="text-2xl font-semibold">{{ artist ? artist.name : "" }}</h1>
    <h6>Albums</h6>

    <div v-if="albums && albums.length > 0">
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full mt-10">
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

        <div v-if="noMoreArtistAlbumsFound" class="my-6">
            <p class="font-semibold text-center">No more albums found</p>
        </div>
        <div v-else class="text-center my-6">
            <!-- The "Load More" button is included in case the loaded items didn't fill the screen or exceed it (in which case the scrollbar will not show), the user can click the button to load more. -->
            <button
                class="
                    bg-primary
                    hover:bg-primary-hover
                    text-body
                    rounded-full
                    w-max
                    font-bold
                    text-lg
                    px-4
                    py-1outline-all-0
                "
                @click="getNextAlbums()"
                :disabled="isGettingArtistAlbums"
            >
                Load More
            </button>
        </div>
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
    const isGettingArtistAlbums = computed(() => store.state.isGettingArtistAlbums);
    const noMoreArtistAlbumsFound = computed(() => store.state.noMoreArtistAlbumsFound);

    onMounted(() => {
        store.dispatch("getArtist", route.params.id);
        getAlbums();
    });

    function getAlbums(offset = 0, overrideData = true) {
        let searchData = {
            artistId: route.params.id,
            offset: offset,
            overrideData: overrideData,
        };

        store.dispatch("getArtistAlbums", searchData);
    }

    function getNextAlbums() {
        if (!isGettingArtistAlbums.value && !noMoreArtistAlbumsFound.value) {
            getAlbums(albums.value ? albums.value.length : 0, false);
        }
    }

    window.onscroll = () => {
        let scrollOffset = 10;
        let bottomOfWindow =
            document.documentElement.scrollTop + window.innerHeight + scrollOffset >= document.documentElement.offsetHeight;

        if (bottomOfWindow) {
            getNextAlbums();
        }
    };
</script>