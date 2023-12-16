import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue';
import TriviaQuestions from '../views/TriviaQuestions.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/trivia',
      name: 'questions',
      component: TriviaQuestions
    },
  ]
})

export default router