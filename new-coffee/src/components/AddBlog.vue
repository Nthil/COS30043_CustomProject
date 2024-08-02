<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Add a Blog</h1>
            <form @submit.prevent="addBlog">
                <div class="form-group field">
                    <label class="form-label">Title</label>
                    <input v-model="form.title" class="form-control" type="text" placeholder="Title">
                    <p class="error-text" v-if="error.title">{{ error.title }}</p>
                </div>
                <div class="form-group field">
                    <label class="form-label">Content</label>
                    <textarea v-model="form.content" class="form-control" placeholder="Content"></textarea>
                    <p class="error-text" v-if="error.content">{{ error.content }}</p>
                </div>
                <div class="input-group field mt-2">
                    <button class="btn btn-warning">Submit</button>
                </div>
            </form>

            <div v-if="blogs.length">
                <h2 class="title">Your Blogs</h2>
                <table class="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="blog in blogs" :key="blog.id">
                            <td>{{ blog.title }}</td>
                            <td>{{ blog.content }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AddBlog',
    data() {
        return {
            form: {
                title: '',
                content: ''
            },
            error: {},
            blogs: [] // Array to hold the user's blogs
        }
    },
    methods: {
        validateForm() {
            const errors = {};
            if (!this.form.title) {
                errors.title = 'Title is required';
            }
            if (!this.form.content) {
                errors.content = 'Content is required';
            }
            this.error = errors;
            return Object.keys(errors).length === 0;
        },
        async addBlog() {
            if (!this.validateForm()) {
                return;
            }

            try {
                const userData = JSON.parse(localStorage.getItem('user-infor'));
                if (userData && userData.id) {
                    await axios.post('http://localhost:3000/blogs', {
                        title: this.form.title,
                        content: this.form.content,
                        userId: userData.id
                    });

                    // Refresh the blog list after adding a new blog
                    this.fetchUserBlogs();
                    alert('Blog added successfully!');
                    this.form.title = '';
                    this.form.content = '';
                } else {
                    alert('User data not found. Please log in.');
                    this.$router.push('/signin');
                }
            } catch (error) {
                console.error('Error adding blog:', error);
                alert('There was an error adding your blog. Please try again.');
            }
        },
        async fetchUserBlogs() {
            try {
                const userData = JSON.parse(localStorage.getItem('user-infor'));
                if (userData && userData.id) {
                    const response = await axios.get(`http://localhost:3000/blogs?userId=${userData.id}`);
                    this.blogs = response.data;
                }
            } catch (error) {
                console.error('Error fetching user blogs:', error);
            }
        }
    },
    mounted() {
        this.fetchUserBlogs();
    }
}
</script>

<style scoped>
.section {
    padding: 2em;
}

.error-text {
    color: red;
}

.table {
    margin-top: 2em;
}
</style>