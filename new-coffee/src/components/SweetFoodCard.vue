<template>
    <div class="card" v-if="sweetfood">
        <img :src="getImage(sweetfood.image)" class="card-img-top" :alt="sweetfood.altText">
        <div class="card-body">
            <h5 class="card-title">{{ sweetfood.name }}</h5>
            <ul class="card-text">
                <li>Ingredients: {{ sweetfood.ingredients }}</li>
                <li>Price: ${{ sweetfood.price }}</li>
            </ul>
            <a href="/:pathMatch(.*)*" class="btn btn-primary" @click="addToCart">Add to Cart</a>
            <button class="btn btn-primary" @click="toggleLike">{{ liked ? 'Unlike' : 'Like' }}</button>
            <p>Likes: {{ sweetfood.like }}</p>
        </div>
    </div>
</template>

<script>
const images = require.context('@/assets', false, /\.png$/);

export default {
    name: 'SweetFoodCard',
    props: ['sweetfood'],
    data() {
        return {
            liked: false
        };
    },
    mounted() {
        const likedSweetFoods = JSON.parse(localStorage.getItem('likedSweetFoods')) || [];
        this.liked = likedSweetFoods.includes(this.sweetfood.id);
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
            this.$emit('toggle-like', this.sweetfood, this.liked);
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