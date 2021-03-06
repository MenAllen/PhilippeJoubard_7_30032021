import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
	},
	{
		path: "/signup",
		name: "Signup",
		component: () => import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
	},
	{
		path: "/message",
		name: "Message",
		component: () => import(/* webpackChunkName: "about" */ "../views/Message.vue"),
	},
	{
		path: "/profil",
		name: "Profil",
		component: () => import(/* webpackChunkName: "about" */ "../views/Profil.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
