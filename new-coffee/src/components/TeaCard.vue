<template>
    <div class="card" v-if="tea">
        <img :src="getImage(tea.image)" class="card-img-top" :alt="tea.altText">
        <div class="card-body">
            <h5 class="card-title">{{ tea.name }}</h5>
            <ul class="card-text">
                <li>Ingredients: {{ tea.ingredients }}</li>
                <li>Price: ${{ tea.price }}</li>
            </ul>
            <a href="/:pathMatch(.*)*" class="btn btn-primary" @click="addToCart">Add to Cart</a>
            <button class="btn btn-primary" @click="toggleLike">{{ liked ? 'Unlike' : 'Like' }}</button>
            <p>Likes: {{ tea.like }}</p>
        </div>
    </div>
</template>

<script>
const images = require.context('@/assets', false, /\.png$/);

export default {
    name: 'TeaCard',
    props: ['tea'],
    data() {
        return {
            liked: false
        };
    },
    mounted() {
        const likedTeas = JSON.parse(localStorage.getItem('likedTeas')) || [];
        this.liked = likedTeas.includes(this.tea.id);
    },
    methods: {
        getImage(image) {
            return images('./' + image.split('/').pop());
        },
        addToCart() {
            alert('Item added to cart');
        },
        toggleLike() {
            this.liked = !this.liked;
            this.$emit('toggle-like', this.tea, this.liked);
        }
    }
}
</script>

<style scoped>
.card {
    margin-bottom: 2em;
    margin-right: 1em;
}

button {
    margin-left: 1em;
}

@media screen and (min-width: 1300px) {
    .card {
        width: 20rem;
    }
}

@media screen and (min-width: 1550px) {
    .card {
        width: 30rem;
    }
}
</style>