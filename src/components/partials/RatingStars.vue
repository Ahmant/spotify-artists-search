<template>
    <div class="rating-stars">
        <div class="back-stars">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <div class="front-stars" :style="`width: ${props.rating}%`">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
	import { defineProps } from 'vue';

    const props = defineProps({
        rating: Number,
    });
</script>

<style scoped>
    /* Credits: https://codepen.io/filcp/pen/QvZVOg */
    .rating-stars {
        display: flex;
        /* align-items: center; */
        /* justify-content: center; */
        color: #f4d03f;
    }

    .rating-stars .back-stars {
        display: flex;
        position: relative;
    }

    .rating-stars .front-stars {
        display: flex;
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
    }
</style>