import Vue from "vue";
import VueRouter from "vue-router";
import SlideCard from "../components/SlidCard.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: SlideCard
    },
    {
        path: "/index.html",
        name: "index",
        component: SlideCard
    }
];

const router = new VueRouter({
    //mode: "history",
    routes,
});

export default router;
