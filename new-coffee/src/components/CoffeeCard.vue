<template>
    <div class="card" v-if="coffee">
        <img :src="getImage(coffee.image)" class="card-img-top" :alt="coffee.altText">
        <div class="card-body">
            <h5 class="card-title">{{ coffee.name }}</h5>
            <ul class="card-text">
                <li>Ingredients: {{ coffee.ingredients }}</li>
                <li>Price: ${{ coffee.price }}</li>
            </ul>
            <a href="/:pathMatch(.*)*" class="btn btn-primary" @click="addToCart">Add to Cart</a>
            <button class="btn btn-primary" @click="toggleLike">{{ liked ? 'Unlike' : 'Like' }}</button>
            <p>Likes: {{ coffee.like }}</p>
        </div>
    </div>
</template>
<script>
const images = require.context('@/assets', false, /\.png$/)
export default {
    name: 'ProductCard',
    props: ['coffee'],
    methods: {
        getImage(image) {
            return images('./' + image.split('/').pop())
        },
        addtoCart() {
            alert('Item added to cart');
        },
        toggleLike() {
            this.liked = !this.liked;
            this.$emit('toggle-like', this.coffee, this.liked);
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