import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue'; // Import your component
import Detailed from '@/views/detailed-view.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/detailed-analysis',
    name: 'detailed',
    component: Detailed,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
