<template>
    <div class="row user-view">
        <h1>Drop User Account?</h1>
        <div class="col-12">
            <div class="account-settings">
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="details" role="tabpanel">
                        <form @submit.prevent="dropAccount">
                            <div class="form-group">
                                <label for="reason">Reason for dropping account</label>
                                <textarea class="form-control" id="reason" v-model="reason" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter your password">
                                <p class="error-text" v-if="errorPassword">{{ errorPassword }}</p>
                            </div>
                            <div class="form-group mt-3 mb-3">
                                <button class="btn btn-danger" type="submit">Drop Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Modal -->
        <div class="modal" v-if="showSuccessModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Account Deleted</h5>
                        <button type="button" class="btn-close" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        Your account has been successfully deleted.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="redirectToSignIn">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DropAccount',
    data() {
        return {
            reason: '',
            password: '',
            errorPassword: '',
            showSuccessModal: false
        }
    },
    methods: {
        async dropAccount() {
            this.errorPassword = '';

            if (!this.password) {
                this.errorPassword = 'Password is required';
                return;
            }

            const userData = JSON.parse(localStorage.getItem('user-infor'));
            if (userData && userData.id) {
                try {
                    const user = await axios.get(`http://localhost:3000/user/${userData.id}`);

                    if (user.data.password === this.password) {
                        await axios.delete(`http://localhost:3000/user/${userData.id}`, {
                            data: { password: this.password }
                        });

                        localStorage.removeItem('user-infor');
                        this.showSuccessModal = true;
                    } else {
                        this.errorPassword = 'Password is incorrect';
                    }
                } catch (error) {
                    console.error('Error dropping account:', error);
                }
            } else {
                console.error('No user data found in local storage.');
            }
        },
        closeModal() {
            this.showSuccessModal = false;
        },
        redirectToSignIn() {
            this.showSuccessModal = false;
            this.$router.push('/signin');
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

.error-text {
    color: red;
    font-size: 0.9em;
    margin-top: 0.5em;
}

/* Simple Modal Styles */
.modal {
    display: block;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
}

.modal-content {
    position: relative;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: .3rem;
    outline: 0;
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
}

.modal-header,
.modal-body,
.modal-footer {
    padding: 1rem;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e9ecef;
}

.modal-title {
    margin-bottom: 0;
    line-height: 1.5;
}

.btn-close {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
}
</style>
