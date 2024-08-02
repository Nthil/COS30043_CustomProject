<template>
  <section id="tea-category">
    <div class="tea-section wrapper">
      <div class="container-fluid">
        <div class="col-12">
          <h1 class="text-center">Our Tea Collection</h1>
        </div>
        <div class="row align-items-center">
          <div class="col-12 product-banner">
            <ProductBanner />
          </div>
        </div>

        <div class="row search-box align-items-center mb-3">
          <div class="col-6">
            <label for="searchName">Search Tea</label>
            <input type="text" v-model="search" placeholder="Search by name..." class="form-control" />
          </div>
          <div class="col-6">
            <label for="searchIngredient">Search Ingredient</label>
            <input type="text" v-model="ingredientSearch" placeholder="Search by ingredient..." class="form-control" />
          </div>
          <div class="col-8">
            <label for="priceRange">Price Range: {{ priceRange }}</label>
            <input type="range" v-model="priceRange" min="0" max="20" step="1" class="form-range" />
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-lg-3 col-md-4 col-sm-6 card-deck" v-for="tea in paginatedFilteredTeas" :key="tea.id">
            <TeaCard :tea="tea" @toggle-like="toggleLike" />
          </div>
        </div>

        <div class="row mb-3 align-items-center pagination-container">
          <div class="col-12 Page">
            <PagePagination :currentPage="currentPage" :totalPages="totalPages" :set-page="setPage"
              :next-page="nextPage" :prev-page="prevPage" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductBanner from '../components/ProductBanner.vue';
import TeaCard from '../components/TeaCard.vue';
import PagePagination from '../components/PagePagination.vue';

export default {
  components: {
    ProductBanner,
    TeaCard,
    PagePagination,
  },

  data() {
    return {
      products: [],
      teas: [],
      currentPage: 1,
      perPage: 8,
      search: '', 
      ingredientSearch: '',
      priceRange: 20
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredTeas.length / this.perPage);
    },
    paginatedFilteredTeas() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.filteredTeas.slice(startIndex, endIndex);
    },
    filteredTeas() {
      return this.teas.filter(tea => {
        const nameMatch = tea.name && tea.name.toLowerCase().includes(this.search.toLowerCase());
        const ingredientMatch = tea.ingredients && tea.ingredients.toLowerCase().includes(this.ingredientSearch.toLowerCase());
        const priceMatch = tea.price <= this.priceRange;
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
    toggleLike(tea, liked) {
      if (liked) {
        tea.like += 1;
      } else {
        tea.like -= 1;
      }
      this.updateLikedTeas(tea.id, liked);
    },
    updateLikedTeas(teaId, liked) {
      let likedTeas = JSON.parse(localStorage.getItem('likedTeas')) || [];
      if (liked) {
        likedTeas.push(teaId);
      } else {
        likedTeas = likedTeas.filter(id => id !== teaId);
      }
      localStorage.setItem('likedTeas', JSON.stringify(likedTeas));
    }
  },
  created() {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        this.products = data;
      });
    fetch('http://localhost:3000/teas')
      .then(response => response.json())
      .then(data => {
        this.teas = data;
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
