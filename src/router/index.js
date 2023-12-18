import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue';
import TriviaQuestions from '../views/TriviaQuestions.vue';
import ResultsView from '../views/ResultsView.vue';


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
      name: 'trivia',
      component: TriviaQuestions
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView
    },
  ]
})

export default router