<template>
  <section id="coffee-category">
    <div class="coffee-section wrapper">
      <div class="container-fluid">
        <div class="col-12">
          <h1 class="text-center">Our Coffee Collection</h1>
        </div>
        <div class="row align-items-center">
          <div class="col-12 product-banner">
            <ProductBanner />
          </div>
        </div>

        <div class="row search-box align-items-center mb-3">
          <div class="col-6">
            <label for="searchName">Search Coffee</label>
            <input type="text" v-model="search" placeholder="Search by name..." class="form-control" />
          </div>
          <div class="col-6">
            <label for="searchIngredient">Search Ingredient</label>
            <input type="text" v-model="ingredientSearch" placeholder="Search by ingredient..." class="form-control" />
          </div>
          <div class="col-8">
            <label for="priceRange">Price Range: {{ priceRange }}</label>
            <input type="range" v-model="priceRange" min="0" max="50" step="1" class="form-range" />
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-lg-3 col-md-4 col-sm-6 card-deck" v-for="coffee in paginatedFilteredCoffees" :key="coffee.id">
            <CoffeeCard :coffee="coffee" @toggle-like="toggleLike"/>
          </div>
        </div>

        <div class="row mb-3 align-items-center pagination-container">
          <div class="col-12 Page">
            <page-pagination :currentPage="currentPage" :totalPages="totalPages" :set-page="setPage"
              :next-page="nextPage" :prev-page="prevPage" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductBanner from '../components/ProductBanner.vue'
import CoffeeCard from '../components/CoffeeCard.vue'
import PagePagination from '../components/PagePagination.vue'

export default {
  components: {
    ProductBanner,
    CoffeeCard,
    PagePagination,
  },
  data() {
    return {
      products: [],
      coffees: [],
      currentPage: 1,
      perPage: 8,
      search: '', // Add this line to define the search property
      ingredientSearch: '',
      priceRange: 50 // Define the price range
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredCoffees.length / this.perPage);
    },
    paginatedFilteredCoffees() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.filteredCoffees.slice(startIndex, endIndex);
    },
    filteredCoffees() {
      return this.coffees.filter(coffee => {
        const nameMatch = coffee.name && coffee.name.toLowerCase().includes(this.search.toLowerCase());
        const ingredientMatch = coffee.ingredients && coffee.ingredients.toLowerCase().includes(this.ingredientSearch.toLowerCase());
        const priceMatch = coffee.price <= this.priceRange;
        return nameMatch && ingredientMatch && priceMatch;
      });
    }
  },
  methods: {
    setPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    toggleLike(coffee, liked) {
      if (liked) {
        coffee.like += 1;
      } else {
        coffee.like -= 1;
      }
      this.updateLikedCoffees(coffee.id, liked);
    },
    updateLikedCoffees(coffeeId, liked) {
      let likedCoffees = JSON.parse(localStorage.getItem('likedCoffees')) || [];
      if (liked) {
        likedCoffees.push(coffeeId);
      } else {
        likedCoffees = likedCoffees.filter(id => id !== coffeeId);
      }
      localStorage.setItem('likedCoffees', JSON.stringify(likedCoffees));
    }
  },
  created() {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        this.products = data;
      });
    fetch('http://localhost:3000/coffees')
      .then(response => response.json())
      .then(data => {
        this.coffees = data;
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

.card-deck,
.Page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination {
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.search-box {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 1em;
}

label {
  font-size: 1.5em;
  font-weight: 700;
  color: #5a3300;
  padding-top: 1em;
}
</style>
