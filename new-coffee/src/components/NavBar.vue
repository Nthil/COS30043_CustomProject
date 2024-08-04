<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- Logo on the left -->
      <router-link class="navbar-brand" to="/homepage">
        <img src="../assets/coffee-logo.png" alt="logo" width="60" height="60">
      </router-link>

      <!-- Toggle Button and Avatar on the right -->
      <div class="d-flex align-items-center ms-auto order-lg-3">
        <!-- Toggle Button -->
        <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Avatar -->
        <div class="dropdown avatar">
          <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <span><i class="fa-solid fa-user"></i></span>
          </a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/user">Account</router-link></li>
            <li><a class="dropdown-item" href="#" @click="LogOut">Log Out</a></li>
          </ul>
        </div>
      </div>

      <!-- Collapsible content -->
      <div class="collapse navbar-collapse order-lg-2" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.path === '/homepage' }" to="/homepage">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.path === '/about' }" to="/about">About Us</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Menu
            </a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" :class="{ active: $route.path === '/coffee' }" to="/coffee">Coffee</router-link></li>
              <li><router-link class="dropdown-item" :class="{ active: $route.path === '/tea' }" to="/tea">Tea</router-link></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><router-link class="dropdown-item" :class="{ active: $route.path === '/sweetfood' }" to="/sweetfood">Sweets & Foods</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.path === '/instruction' }" to="/instruction">Instruction</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    LogOut() {
      localStorage.clear();
      this.$router.push('/signin');
    }
  }
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.avatar .dropdown-menu {
  right: 0;
  left: auto;
}

.navbar-toggler {
  margin-bottom: -.1em;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}

.navbar-toggler-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link.active {
  text-decoration: underline;
}

@media (max-width: 991.98px) {
  .navbar-toggler,
  .avatar {
    order: 1;
  }

  .collapse.navbar-collapse {
    order: 2;
  }
}

@media (min-width: 992px) {
  .navbar-collapse {
    display: flex !important;
    justify-content: space-between;
    flex-grow: 1;
  }

  .navbar-collapse .me-auto {
    display: flex;
    align-items: center;
  }

  .avatar {
    margin-left: 1em;
  }

  .ms-auto {
    margin-left: auto;
  }

  .order-lg-2 {
    order: 2 !important;
  }

  .order-lg-3 {
    order: 3 !important;
  }
}
</style>
