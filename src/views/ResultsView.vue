<template>
  <div class="container w-11/12 my-8 h-screen">
    <h1 class="text-center text-xl font-bold p-4">Results</h1>
    <div class="question-container h-3/4 overflow-y-scroll">
      <div
        v-for="(q, index) in resultsArray"
        :key="index"
        class="card my-4 py-4 bg-violet-200"
      >
        <div class="question px-4 font-bold py-2">
          #{{ index + 1 }} {{ q.question }}
        </div>
        <div
          class="selected px-4 rounded-md font-semibold"
          :class="q.correct === q.selected ? 'text-green-500' : 'text-red-500'"
        >
          selected: {{ q.selected }}
        </div>
        <div class="correct font-semibold px-4 mt-4 text-green-500 rounded-md">
          Correct: {{ q.correct }}
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button @click="playAgain" class="btn my-4 w-40 font-bold text-lg">
        PLAY AGAIN
      </button>
    </div>
  </div>
</template>
<script setup>
import { useTriviaStore } from "../store/TriviaStore";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useTriviaStore();
const resultsArray = store.getResultsArray;

const playAgain = () => {
  store.resetResultsArray();
  router.push("/");
};
</script>
<style scoped></style>
