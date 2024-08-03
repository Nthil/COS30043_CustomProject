# Welcome !

<p align="center"><strong>Code</strong>: COS30043</p>

<p align="center"><strong>Subject</strong>: Interface Design and Development</p>

<p align="center">
  <a href="#author">Author</a>  •
  <a href="#project-description">Project description</a>  •
  <a href="#installation">Set up and Package Installation</a>  •
  <a href="#source-code">Source Code</a>  
</p>

## Author

Dao Khanh Nga Thi

## Project Description

<p align="justify">Based on the knowledge acquired throughout the semester, I applied practical experience and researched additional references to design and implement a custom e-commerce project—a website for selling coffee, tea, and sweets—using the Bootstrap and Vue.js frameworks.</p>

## Set up and Package Installation

1. **Node.js and npm set up**
  - Go to: https://nodejs.org/en/download/ to download and install node.js
  - Open Command line and type the following command to install Vue CLI: 
    - cd c:/nodejs
    - npm install g @vue/cli
  - When the installation is finished, you can check the version
    - vue -version
    - node -v
    - npm -v


2. **Create VueCLI Project**
  - Install Vue CLI globally using:
    - npm install -g @vue/cli
  - Open terminal and cd to the folder where you want to create the project
    - cd /path/to/your/folder
  - Type the following command to create new vue project
    - vue create my-project (use any name instead of my-project)
  - Select configuration and dependencies: Vue 3
  - Launch project: 
    - cd my-project
  - Run Vue project:
    - npm run serve

3. **Intergrate Bootstrap to Vue project**
  - Using npm to install Bootstrap
    - npm install bootstrap
  - Import boostrap CSS to Vue.js project in main.js file
    - import 'bootstrap/dist/css/bootstrap.min.css'; 

4. **Install Vue Router**
  - Using npm to install Vue Router
    - npm install vue-router 
  - Create 'router.js' file in 'src' folder: 
    - src/router.js
  - Configure Routes in 'router.js':
    - import { createRouter, createWebHistory } from 'vue-router';
      import Home from '../views/Home.vue'; 
    - const routes = [
      { path: '/', component: Home },
      ];
    - const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
      });
    - export default router;
  - Integrate Router in 'main.js' file
    - import router from './router';
    - createApp(App).use(router).mount('#app')
  - Use router-view in App Component

5. **Install Axios**
  - Using npm to install Axios
    - npm install axios
  - Import axios in any component 
    - import axios from 'axios';
  - Create an Axios Instance:
    - async function_name(param) {
      try {
      const response = await axios.get(`based_URL`);
      ...
      } catch (error) {
      console.error('Error fetching user data:', error);
        }
      },

## Source Code

- You can download source code via this link (https://github.com/Nthil/COS30043_CustomProject)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
