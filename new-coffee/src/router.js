import { createRouter, createWebHistory } from "vue-router";
import UserPage from "./pages/UserPage.vue";
import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import InstructionPage from "./pages/InstructionPage.vue";
import CoffeePage from "./pages/CoffeePage.vue";
import TeaPage from "./pages/TeaPage.vue";
import SweetFoodPage from "./pages/SweetFoodPage.vue";
import NotFound from "./components/404Page.vue";
import ExplorePage from "./pages/ExplorePage.vue";


const routes = [
    {
        path: "/",
        name: "explore",
        component: ExplorePage,
        meta: { hideNavbar: true }
    },
    {
        path: "/signin",
        name: "signin",
        component: () => import("./components/SignInForm.vue"),
        meta: { hideNavbar: true }
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("./components/SignUpForm.vue"),
        meta: { hideNavbar: true }
    },
    {
        path: "/homepage",
        name: "home",
        component: HomePage,
    },
    {
        path: "/user",
        name: "user",
        component: UserPage,
    },
    {
        path: "/about",
        name: "about",
        component: AboutPage,
    },
    {
        path: "/instruction",
        name: "instruction",
        component: InstructionPage,
    },
    {
        path: "/coffee",
        name: "coffee",
        component: CoffeePage,
    },
    {
        path: "/tea",
        name: "tea",
        component: TeaPage,
    },
    {
        path: "/sweetfood",
        name: "sweetfood",
        component: SweetFoodPage,
    },
    {
        path: "/:pathMatch(.*)*", //Catch all
        name: "not-found",
        component: NotFound //Redirect - page 404
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;