<template>
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(banner, index) in banners" :key="index" :class="{ 'carousel-item': true, active: index === 0 }">
          <img :src="getImage(banner.image)" class="d-block w-100" :alt="banner.altText">
        </div>
      </div>
    </div>
  </template>
<script>
const images = require.context('@/assets', false, /\.png$/)
export default {
    name: 'ProductBanner',
    data() {
        return {
            banners: []
        }
    },
    methods: {
        getImage(image) {
            return images('./' + image.split('/').pop())
        }
    },
    created() {
        fetch('http://localhost:3000/banners')
            .then(response => response.json())
            .then(data => {
                this.banners = data
            })
    }
}
</script>

<style scoped>
.carousel{
    margin-bottom: 2em;
}
</style>