<template>
    <section id="explore-page">
        <div class="container-fluid px-0 top-banner">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-10">
                        <h1>Let Coffee Boost Your Mood</h1>
                        <p>Explore our coffee collection and find the perfect one for you</p>
                    </div>
                    <div class="mt-4"> 
                        <span>Start Your Trial</span>
                        <router-link to="/signin">
                            <button class="main-btn">Log In <i class="fa-solid fa-mug-hot"></i></button>
                        </router-link> <br>
                        <span>Haven't Get Account?</span>
                        <router-link to="/signup">
                            <button class="main-btn">Create Account <i class="fa-solid fa-mug-saucer"></i></button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
html {
    scroll-behavior: smooth;
}

h1 {
    font-size: 3.5em;
    font-weight: 800;
    line-height: 1.5em;
    color: #fff;
}

p {
    font-size: 1.25em;
    line-height: 1.5em;
    letter-spacing: 1px;
    color: #fff;
}

span {
    color: #fff;
    font-size: 1.25em;
    line-height: 1.5em;
    letter-spacing: 1px;
    margin-right: 1em;
}

.mt-4 .main-btn {
    margin-bottom: 1em;
}

.top-banner {
    width: 100%;
    min-height: 100vh;
    background: url('../assets/banner.png') no-repeat center center;
    background-size: cover;
    padding-top: 25em; 
    display: block; 
}

.container {
    max-width: 800px; /* Adjust this value as needed */
}

.main-btn {
    background-color: #f8f9fa;
    color: #000;
    font-size: 1.25em;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    border: 1px solid #000;
    cursor: pointer;
    display: inline-block;
    text-transform: capitalize;
    transition: all 0.4s ease-out;
}

.main-btn:hover {
    background-color: transparent;
    color: #fff;
    border: #fff solid 3px;
}
</style>
