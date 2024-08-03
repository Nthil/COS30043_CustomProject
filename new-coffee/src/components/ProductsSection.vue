<template>
    <div class="card border-0">
        <img :src="getImage(product.image)" :alt="product.altText">
    </div>
    <div class="align-items-center text-sec">
        <h3 class="card-header">{{ product.title }}</h3>
        <div class="card-body">
            <p>{{ product.description }}</p>
            <router-link :to="product.link">
                <button class="main-btn">{{ product.buttonText }} <i class="fa-regular fa-heart"></i></button>
            </router-link>
        </div>
    </div>
</template>

<script>
const images = require.context('@/assets', false, /\.png$/)
export default {
    props: ['product'],
    methods: {
        getImage(image) {
            return images('./' + image.split('/').pop())
        }
    }
}
</script>
<style scoped>
html {
    scroll-behavior: smooth;
}

.avatar .dropdown-menu {
    right: 0;
    left: auto;
}

h3 {
    font-size: 2em;
    font-weight: 800;
    line-height: 1.5em;
    color: #5a3300;
}

p {
    font-size: 1.25em;
    line-height: 1.5em;
    letter-spacing: 1px;
    color: #5a3300;
}

.main-btn {
    background-color: #f8f9fa;
    color: #5a3300;
    font-size: 1.25em;
    padding: 0.5em 1em;
    border: 1px solid #000;
    cursor: pointer;
    display: inline-block;
    text-transform: capitalize;
    -webkit-transition: all 0.4s ease-out 0s;
    -o-transition: all 0.4s ease-out 0s;
    -moz-transition: all 0.4s ease-out 0s;
    transition: all 0.4s ease-out 0s;
}

.main-btn:hover {
    background-color: #5a3300;
    color: #fff;
    border: #5a3300 solid 3px;
}
</style>