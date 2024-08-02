<template>
    <section id="about-page" class="container mt-5">
        <div class="row">
            <div class="col-lg-12 text-left">
                <h1>About Us</h1>
                <p class="lead">
                    Welcome to our coffee shop! We are passionate about providing the best coffee experience.
                    Our mission is to bring you the finest coffee beans from around the world and ensure every cup is perfect.
                </p>
                <p>
                    Our story began with a love for coffee and a desire to create a space where coffee enthusiasts can come together.
                    We believe in sustainability, quality, and the joy of sharing a great cup of coffee.
                </p>
                <p>
                    Thank you for being part of our journey. We look forward to serving you the best coffee you've ever had.
                </p>
                <router-link to="/homepage" class="btn btn-primary mt-3">Learn More</router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AboutPage'
}
</script>

<style scoped>
#about-page {
    background-color: #f9f9f9;
    padding: 2em 1em;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 2.5em;
    font-weight: 700;
    margin-bottom: 0.5em;
}

.lead {
    font-size: 1.25em;
    font-weight: 300;
    margin-bottom: 1.5em;
}

p {
    font-size: 1em;
    line-height: 1.6;
    margin-bottom: 1em;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}
</style>
