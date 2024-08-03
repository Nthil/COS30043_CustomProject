<template>
    <section id="user-page">
        <div class="user-section wrapper">
            <div class="container">
                <div class="row profile-overview">
                    <div class="col-12">
                        <h1>Manage Your Account Here</h1>
                        <img src="../assets/avatar.png" alt="avatar" class="avatar">
                        <p id="name">{{ user.firstname }} {{ user.lastname }}</p>
                        <p id="role">Member</p>
                    </div>
                </div>
                <div class="row align-items-center profile-detail">
                    <div class="col-12">
                        <div class="nav nav-tabs mt-3">
                            <div class="nav-link" v-for="(tabitem, index) of tabitems" :key="index"
                                :class="{ active: tab === index }" @click="tab = index">
                                {{ tabitem }}
                            </div>
                        </div>
                        <div class="account-details">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="details" role="tabpanel">
                                    <UserView v-if="tab === 0" :user="user" />
                                    <UserSettings v-else-if="tab === 1" :user="user" />
                                    <DropAccount v-else-if="tab === 2" />
                                    <AddBlog v-else-if="tab === 3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import UserView from '../components/UserView.vue';
import UserSettings from '../components/UserSettings.vue';
import DropAccount from '@/components/DropAccount.vue';
import AddBlog from '@/components/AddBlog.vue';

export default {
    name: 'ProfilePage',
    components: {
        UserView,
        UserSettings,
        DropAccount,
        AddBlog
    },
    data() {
        return {
            user: {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                phonenum: '',
                othercontact: ''
            },
            tab: 0,
            tabitems: ['Details', 'Update Details', 'Other Setting', 'Add Blog']
        };
    },
    methods: {
        async fetchUserData(id) {
            try {
                const response = await axios.get(`http://localhost:3000/user/${id}`);
                this.user = response.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    },
    mounted() {
    const userData = JSON.parse(localStorage.getItem('user-infor'));
    if (userData) {
        this.user.firstname = userData.firstname;
        this.fetchUserData(userData.id);
    }
    else {
        console.error('User data not found in localStorage');
    }
}

};
</script>

<style scoped>
.profile-overview {
    padding: 2em 0;
    background-color: #5a3300;
}

.profile-overview h1 {
    font-size: 3em;
    font-weight: 800;
    line-height: 1.5em;
    color: #fff;
    text-align: center;
}

.avatar {
    height: 20em;
    width: 20em;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    margin-top: 2em;
}

.profile-overview #name {
    color: #fff;
    font-size: 1.5em;
    font-weight: 700;
    line-height: 1.5em;
    letter-spacing: 1px;
    text-align: center;
    margin-top: 1em;
    text-transform: uppercase;
}

.profile-overview #role {
    color: #fff;
    font-size: 1.25em;
    font-weight: 500;
    line-height: 1.5em;
    letter-spacing: 1px;
    text-align: center;
    margin-top: 1em;
}

.profile-detail {
    margin-top: -2em;
    border-radius: 25px;
    background-color: #f9f9f9;
}
</style>
