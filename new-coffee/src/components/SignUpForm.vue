<template>
    <div class="container-fixed d-flex justify-content-center align-items-center min-vh-100">
        <div class="row border rounded-5 p-3 bg-white shadow box-area">
            <!-- Left Box -->
            <div class="col-md-6 rounded-4 d-flex flex-column justify-content-center align-items-center left-box">
                <div class="featured-image position-relative">
                    <img src="../assets/coffee-logo.png" class="img-fluid" alt="logo">
                    <div class="header-text mb-3 d-flex flex-column justify-content-start align-items-center">
                        <p class="fs-3 fw-100">Welcome to Aria Bean!!!</p>
                    </div>
                </div>
            </div>

            <!-- Right Box -->
            <div class="col-md-6 right-box">
                <div class="row align-items-center">
                    <form action="http://localhost:3000/user" @submit.prevent="onsubmit">
                        <!-- Form Inputs -->
                        <div class="form-group mt-3">
                            <input type="text" class="form-control form-control-lg bg-light fs-6" :class="{ error: error.firstname }" v-model="form.firstname"
                                placeholder="First Name">
                            <p class="error-text" v-if="error.firstname">{{ error.firstname }}</p>
                        </div>
                        <div class="form-group mt-3">
                            <input type="text" class="form-control form-control-lg bg-light fs-6" :class="{ error: error.lastname }" v-model="form.lastname"
                                placeholder="Last Name">
                            <p class="error-text" v-if="error.lastname">{{ error.lastname }}</p>
                        </div>
                        <div class="form-group mt-3">
                            <input type="email" class="form-control form-control-lg bg-light fs-6" :class="{ error: error.email }" v-model="form.email"
                                placeholder="Email address">
                            <p class="error-text" v-if="error.email">{{ error.email }}</p>
                        </div>
                        <div class="form-group mt-3">
                            <input type="password" class="form-control form-control-lg bg-light fs-6" :class="{ error: error.password }" v-model="form.password"
                                placeholder="Password" >
                            <p class="error-text" v-if="error.password">{{ error.password }}</p>
                        </div>
                        <div class="form-group mt-3">
                            <input type="password" class="form-control form-control-lg bg-light fs-6" :class="{ error: error.confirmPassword }"
                                v-model="form.confirmPassword" placeholder="Confirm Password" >
                            <p class="error-text" v-if="error.confirmPassword">{{ error.confirmPassword }}</p>
                        </div>
                        <div class="form-group mt-5">
                            <button class="btn btn-lg btn-primary w-100 fs-6" type="submit">Create Account</button>
                        </div>
                        <div class="row mt-3">
                            <small>Having account? <router-link to="/signin">Log in here!</router-link> </small>
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
    name: 'SignUpForm',
    data() {
        return {
            form: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: '',
                isValid: true,
            },
            error: {},
        }
    },
    methods: {
        async onsubmit() {
            const user = await axios.get('http://localhost:3000/user');

            this.form.isValid = true;
            this.error = {};

            
            if (this.form.firstname == '') {
                this.error.firstname = 'First name is missing';
                this.form.isValid = false;
            } else if (!this.form.firstname.match(/^[a-zA-Z\s]+$/)) {
                this.error.firstname = 'First name must be alphabets only';
                this.form.isValid = false;
            }

            if (this.form.lastname == '') {
                this.error.lastname = 'Last name is missing';
                this.form.isValid = false;
            } else if (!this.form.lastname.match(/^[a-zA-Z]+$/)) {
                this.error.lastname = 'Last name must be alphabets only';
                this.form.isValid = false;
            }

            if (this.form.email == '') {
                this.error.email = 'Email is missing';
                this.form.isValid = false;
            } else if (!this.form.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {
                this.error.email = 'Email must be in a valid format';
                this.form.isValid = false;
            }

            if (this.form.password == '') {
                this.error.password = 'Password is missing';
                this.form.isValid = false;
            }

            if (this.form.confirmPassword == '') {
                this.error.confirmPassword = 'Confirm Password is missing';
                this.form.isValid = false;
            } else if (this.form.confirmPassword !== this.form.password) {
                this.error.confirmPassword = 'Passwords do not match';
                this.form.isValid = false;
            }

            if (!this.form.isValid) return;

            
            const isExist = user.data.find(u => u.email === this.form.email);
            if (isExist) {
                this.error.email = 'Email already exists';
                return;
            }

            
            const result = await axios.post('http://localhost:3000/user', {
                firstname: this.form.firstname,
                lastname: this.form.lastname,
                email: this.form.email,
                password: this.form.password,
                confirmPassword: this.form.confirmPassword
            });

            
            if (result.status == 201) {
                localStorage.setItem("user-infor", JSON.stringify(result.data));
                this.$router.push({ name: 'home' });
            }
        }
    },
    // For user who is already logged in
    mounted() {
        let user = JSON.parse(localStorage.getItem("user-infor"));
        if (user) {
            this.$router.push({ name: 'home' });
        }
    }
}
</script>

<style scoped>
.container-fixed {
    background: url('../assets/login.png') no-repeat center;
    background-color: rgba(0, 0, 0, 0.5);
    background-size: cover;
}

.left-box {
    min-height: 20em;
}

.error-text {
    color: red;
    font-size: 0.8em;
}

@media (max-width: 1200px) {
    .img-fluid {
        max-width: 20em;
    }
}
</style>
