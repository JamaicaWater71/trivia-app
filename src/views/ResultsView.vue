<template>
  <div
    class="container w-ful my-8 h-screen bg-violet-100 flex flex-col items-center"
  >
    <h1 class="text-center text-xl font-bold p-4">Results</h1>
    <div class="score w-10/12 text-lg my-2 font-bold">
      <span>Final Score</span> {{ calculateScore(resultsArray) }}/{{
        resultsArray.length
      }}
    </div>
    <!-- Questions summary -->
    <div class="question-container w-10/12 h-3/4 overflow-y-scroll">
      <div
        v-for="(q, index) in resultsArray"
        :key="index"
        class="card w-full my-4 py-4 bg-violet-600"
      >
        <div class="question px-4 font-bold py-2 text-white">
          #{{ index + 1 }} {{ q.question }}
        </div>
        <div
          class="selected px-4 rounded-md font-semibold"
          :class="q.correct === q.selected ? 'bg-green-500' : 'bg-red-500'"
        >
          selected: {{ q.selected }}
        </div>
        <div class="correct font-semibold px-4 mt-4 bg-green-500 rounded-md">
          Correct: {{ q.correct }}
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        @click="playAgain"
        class="btn my-4 w-40 font-bold text-lg bg-pink-300 hover:bg-pink-500"
      >
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

const calculateScore = (arr) => {
  let c = 0;
  arr.forEach((question) => {
    if (question.selected === question.correct) {
      c += 1;
    }
  });
  return c;
};
</script>
<style scoped></style>
