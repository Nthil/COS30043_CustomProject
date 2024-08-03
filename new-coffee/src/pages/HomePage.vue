<template>
    <section id="home-page">
        <div class="home-section wrapper">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-12">
                        <h1 class="text-center" v-highlight="{style: 'italic'}">Welcome to our store</h1>
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-12">
                        <ProductBanner />
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-4" v-for="(product, index) in products" :key="index">
                        <ProductsSection :product="product" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ProductsSection from '../components/ProductsSection.vue';
import ProductBanner from '../components/ProductBanner.vue';

export default {
    components: {
        ProductsSection,
        ProductBanner
    },
    directives: {
        highlight: {
            beforeMount(el, binding) {
                el.style.fontStyle = binding.value.style;
            }
        }
    },
    data() {
        return {
            products: []
        }
    },
    created() {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                this.products = data;
            });
    }
}
</script>

<style scoped>
h1 {
    font-size: 3em;
    font-weight: 800;
    line-height: 1.5em;
    color: #5a3300;
}
</style>
