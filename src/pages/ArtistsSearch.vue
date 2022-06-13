<template>
    <div class="w-full flex flex-col items-center h-max justify-start">
        <div
            class="
                shadow
                bg-white
                p-3
                w-3/4
                md:w-1/2
                border
                hover:shadow-md
                transition
                duration-300
                rounded-full
                flex
                justify-between
                z-50
                fixed
            "
        >
            <input
                class="font-semibold text-lg px-2 w-full outline-all-0"
                placeholder="Search for an artist..."
                @input="handleSearchInput"
                :value="searchText"
            />
            <span class="text-2xl text-primary px-2 cursor-pointer" @click="search()">
                <i class="fa-solid fa-magnifying-glass"></i>
            </span>
        </div>

        <div class="mt-20 w-full">
            <div v-if="artists && artists.length > 0" class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <transition-group name="list">
                    <artist-card
                        v-for="artist in artists"
                        :key="artist.id"
                        :name="artist.name"
                        :popularity="artist.popularity"
                        :followers="artist.followers.total"
                        :image="artist.images[0]"
                        :id="artist.id"
                    />
                </transition-group>
            </div>
            <div v-else-if="searchText && artists && artists.length == 0" class="font-semibold text-center">Nothing Found</div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";
    import ArtistCard from "../components/ArtistCard.vue";

    const store = useStore();

    const searchText = computed(() => store.state.artistsSearchText);
    const artists = computed(() => store.state.artists);

    let searchTimeout;
    function handleSearchInput(event) {
        store.dispatch('setArtistsSearchText', event.target.value)

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(search, 700);
    }

    function search() {
        store.dispatch("getArtists", searchText.value);
    }
</script>



<style scoped>
    .list-enter-from {
        opacity: 0;
        transform: scale(0.6);
    }
    .list-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    .list-enter-active {
        transition: all 0.4s ease;
    }

    .list-leave-from {
        opacity: 1;
        transform: scale(1);
    }
    .list-leave-to {
        opacity: 0;
        transform: scale(0.6);
    }

    .list-leave-active {
        transition: all 0.4s ease;
    }

    .list-move {
        transition: all 0.3s ease;
    }
</style>