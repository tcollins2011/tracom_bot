import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue'; 
import Detailed from '@/views/detailed-view.vue';
import Comparison from '@/views/model-comparison.vue';

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
  {
    path: '/model-comparison',
    name: 'comparison',
    component: Comparison
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
