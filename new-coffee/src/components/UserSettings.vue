<template>
    <div class="row user-view">
        <h1>Updating Profile</h1>
        <div class="col-12">
            <div class="account-settings">
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="details" role="tabpanel">
                        <form @submit.prevent="submitForm">
                            <div class="form-group">
                                <label for="firstname">First Name</label>
                                <input type="text" class="form-control" id="firstname" v-model="user.firstname">
                                <small class="text-danger" v-if="errors.firstname">{{ errors.firstname }}</small>
                            </div>
                            <div class="form-group">
                                <label for="lastname">Last Name</label>
                                <input type="text" class="form-control" id="lastname" v-model="user.lastname">
                                <small class="text-danger" v-if="errors.lastname">{{ errors.lastname }}</small>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <span class="input-group-text">{{ user.email }}</span>
                                <!-- <small class="text-danger" v-if="errors.email">{{ errors.email }}</small> -->
                            </div>
                            <br>
                            <div class="d-inline-flex gap-1">
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample" aria-expanded="false"
                                    aria-controls="collapseExample">
                                    Additional Information
                                </button>
                            </div>
                            <div class="collapse mt-2" id="collapseExample">
                                <div class="card card-body">
                                    <div class="form-group">
                                        <button class="btn btn-primary new-field" @click.prevent="addPhoneNumber">Add
                                            Phone Number</button>
                                    </div>
                                    <div v-for="(phone, index) in user.phonenumbers" :key="index" class="form-group">
                                        <button class="btn btn-danger new-field"
                                            @click.prevent="deletePhoneNumber(index)">X</button>
                                        <label :for="'phonenum-' + index">Phone Number</label>
                                        <input type="text" class="form-control input-field" :id="'phonenum-' + index"
                                            v-model="user.phonenumbers[index]">
                                        <small class="text-danger" v-if="errors.phonenumbers[index]">{{
                                            errors.phonenumbers[index] }}</small>
                                    </div>

                                    <div class="form-group">
                                        <button class="btn btn-primary new-field" @click.prevent="addOtherContact">Add
                                            Other Contact</button>
                                    </div>
                                    <div v-for="(contact, index) in user.othercontacts" :key="index" class="form-group">
                                        <button class="btn btn-danger new-field"
                                            @click.prevent="deleteOtherContact(index)">X</button>
                                        <label :for="'othercontact-' + index">Other Contact</label>
                                        <input type="text" class="form-control input-field" :id="'othercontact-' + index" 
                                            v-model="user.othercontacts[index]">
                                        <small class="text-danger" v-if="errors.othercontacts[index]">{{
                                            errors.othercontacts[index] }}</small>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <button type="submit" class="btn btn-secondary mb-2 mt-2">Change Account Information</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserSettings',
    data() {
        return {
            user: {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                phonenumbers: [],
                othercontacts: []
            },
            errors: {
                firstname: '',
                lastname: '',
                phonenumbers: [],
                othercontacts: []
            }
        };
    },
    methods: {
        async fetchUserData(id) {
            try {
                const response = await axios.get(`http://localhost:3000/user/${id}`);
                this.user = response.data;
                if (!this.user.phonenumbers) {
                    this.user.phonenumbers = [];
                }
                if (!this.user.othercontacts) {
                    this.user.othercontacts = [];
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },
        validateForm() {
            let isValid = true;
            this.errors = {
                firstname: '',
                lastname: '',
                phonenumbers: [],
                othercontacts: []
            };

            if (!this.user.firstname) {
                this.errors.firstname = 'First Name is required.';
                isValid = false;
            }
            if (!this.user.lastname) {
                this.errors.lastname = 'Last Name is required.';
                isValid = false;
            }

            // Validate phone numbers
            const phoneNumbersSet = new Set();
            this.user.phonenumbers.forEach((phone, index) => {
                if (!phone) {
                    this.errors.phonenumbers[index] = 'Phone number cannot be empty.';
                    isValid = false;
                } else if (!/^\d+$/.test(phone)) {
                    this.errors.phonenumbers[index] = 'Phone number must be numeric.';
                    isValid = false;
                } else if (phoneNumbersSet.has(phone)) {
                    this.errors.phonenumbers[index] = 'Phone Number already exists.';
                    isValid = false;
                } else {
                    phoneNumbersSet.add(phone);
                }
            });

            // Validate other contacts
            const otherContactsSet = new Set();
            this.user.othercontacts.forEach((contact, index) => {
                if (!contact) {
                    this.errors.othercontacts[index] = 'Other contact cannot be empty.';
                    isValid = false;
                } else if (otherContactsSet.has(contact)) {
                    this.errors.othercontacts[index] = 'This contact already exists.';
                    isValid = false;
                } else {
                    otherContactsSet.add(contact);
                }
            });

            return isValid;
        },
        deletePhoneNumber(index) {
            this.user.phonenumbers.splice(index, 1);
            this.errors.phonenumbers.splice(index, 1);
        },
        addPhoneNumber() {
            this.user.phonenumbers.push('');
            this.errors.phonenumbers.push('');
        },
        deleteOtherContact(index) {
            this.user.othercontacts.splice(index, 1);
            this.errors.othercontacts.splice(index, 1);
        },
        addOtherContact() {
            this.user.othercontacts.push('');
            this.errors.othercontacts.push('');
        },
        async submitForm() {
            if (this.validateForm()) {
                const userId = this.user.id;
                try {
                    const response = await axios.put(`http://localhost:3000/user/${userId}`, this.user, {
                    });
                    if (response.status === 200) {
                        alert('User information updated successfully');
                    }
                } catch (error) {
                    console.error('Error updating user data:', error);
                }
            }
        }
    },
    mounted() {
        const userData = JSON.parse(localStorage.getItem('user-infor'));
        if (userData) {
            if (!userData.phonenumbers) {
                userData.phonenumbers = [];
            }
            if (!userData.othercontacts) {
                userData.othercontacts = [];
            }
            this.user = userData;

            // Fetch user data based on the retrieved user ID
            this.fetchUserData(userData.id);
        }
    }
};
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

.tab-content p {
    padding-top: 2em;
    border-bottom: 1px solid #000;
}

.new-field {
    margin-top: 2px;
    margin-right: 10px;
    margin-bottom: 5px;
    width: fit-content;
}

.input-field {
    margin-top: 2px;
    margin-right: 10px;
    margin-bottom: 5px;
}
</style>
