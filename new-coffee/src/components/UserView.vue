<template>
    <div class="row user-view">
        <h1>Account Information</h1>
        <div class="col-12">
            <div class="account-details">
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">User ID</th>
                            <td>{{ user.id }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Fullname</th>
                            <td>{{ user.firstname }} {{ user.lastname }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{{ user.email }}</td>
                        </tr>
                        <tr v-for="(phone, index) in user.phonenumbers" :key="index">
                            <th scope="row">Phone Number {{ index + 1 }}</th>
                            <td>{{ phone }}</td>
                        </tr>
                        <tr v-for="(contact, index) in user.othercontacts" :key="index">
                            <th scope="row">Other Contact {{ index + 1 }}</th>
                            <td>{{ contact }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserView',
    data() {
        return {
            user: {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                phonenumbers: [],
                othercontact: ''
            },
        }
    },
    methods: {
        async fetchUserData(id) {
            try {
                const response = await axios.get(`http://localhost:3000/user/${id}`);
                this.user = response.data;
                if (!this.user.phonenumbers) {
                    this.user.phonenumbers = [];
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    },
    mounted() {
        const userData = JSON.parse(localStorage.getItem('user-infor'));
        if (userData) {
            this.user.id = userData.id;
            this.user.firstname = userData.firstname;
            this.user.lastname = userData.lastname;
            this.user.email = userData.email;
            this.user.phonenumbers = userData.phonenumbers || [];
            this.user.othercontact = userData.othercontact;

            // Fetch user data based on the retrieved user ID
            this.fetchUserData(userData.id);
        }
    }
}
</script>

<style scoped>
.user-view {
    padding-top: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
