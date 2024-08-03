<template>
    <div class="container-fixed d-flex justify-content-center align-items-center min-vh-100">
        <div class="row border rounded-5 p-3 bg-white shadow box-area">
            <!-- Left Box -->
            <div class="col-md-6 rounded-4 d-flex flex-column justify-content-center align-items-center left-box">
                <div class="featured-image position-relative">
                    <img src="../assets/coffee-logo.png" class="img-fluid" alt="logo">
                    <div class="header-text mb-3 d-flex flex-column justify-content-start align-items-center">
                        <p class="fs-3 fw-100">Hello, Again <i class="fa-regular fa-face-smile-wink"></i> </p>
                        <p class="fs-5 fw-100">We are happy to have you back!</p>
                    </div>
                </div>
            </div>

            <!-- Right Box -->
            <div class="col-md-6 right-box">
                <div class="row align-items-center form-container">
                    <form action="http://localhost:3000/user" @submit.prevent="onSubmit">
                        <div class="form-group mb-3">
                            <input type="email" class="form-control form-control-lg bg-light fs-6" v-model="email"
                                placeholder="Email address">
                        </div>
                        <div class="form-group mb-5">
                            <input type="password" class="form-control form-control-lg bg-light fs-6" v-model="password"
                                placeholder="Password">
                        </div>
                        <div class="form-group mb-3">
                            <button class="btn btn-lg btn-primary w-100 fs-6" type="submit">Login</button>
                        </div>
                        <div class="row">
                            <small>Don't have account? <router-link to="/signup">Register Now!!</router-link> </small>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'SigninForm',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async onSubmit() {
            try {
                let response = await axios.get('http://localhost:3000/user');
                if (response.status === 200 && response.data.length > 0) {
                    let user = response.data.find(user => user.email === this.email);
                    if (user && user.password === this.password) {
                        this.$router.push('/homepage');
                        this.$emit('emailSubmitted', this.email); // Emit email to parent component
                        localStorage.setItem("user-infor", JSON.stringify(user)); // Optionally store user info in localStorage
                        console.log(response);
                    } else {
                        alert('Invalid email or password. Please try again.');
                    }
                    this.email = ''; // Clear input after login
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        }
    },

    mounted() {
        let user = JSON.parse(localStorage.getItem("user-infor"));
        if (user) {
            this.$router.push('/homepage');
        }
    }
}
</script>
<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}

.container-fixed {
    background: url('../assets/login.png') no-repeat center;
    background-color: rgba(0, 0, 0, 0.5);
    background-size: cover;
}

.left-box {
    min-height: 20em;
}

@media (max-width: 1200px) {
    .img-fluid {
        max-width: 20em;
    }
}
</style>