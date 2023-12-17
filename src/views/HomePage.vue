<template>
  <h1 class="text-center">Welcome to the Trivia Game</h1>
  <div class="settings-container flex justify-center my-8">
    <TriviaSettings
      @num-selected="updateNumQuestions"
      @genre-selected="updateGenre"
      @difficulty-selected="updateDifficulty"
    />
  </div>
  <div class="button flex justify-center">
    <button
      @click="startGame"
      class="inline-block cursor-pointer rounded-md bg-blue-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
    >
      StartGame
    </button>
  </div>
  <div v-if="isLoading" class="isLoading">
    <div v-for="q in Questions" :key="q.question" class="q-loop pt-6">
      <div class="question">
        {{ q.question }}
      </div>
    </div>
  </div>
</template>
<script setup>
import TriviaSettings from "../components/TriviaSettings.vue";

import { ref } from "vue";
const isLoading = ref(false);
let Questions = ref([]);
const selectedAmount = ref(10);
const selectedGenre = ref([]);
const selectedDifficulty = ref("any difficulty");

const startGame = async () => {
  try {
    console.log(selectedGenre.value);
    console.log(selectedDifficulty.value);
    let apiUrl = `https://opentdb.com/api.php?amount=${selectedAmount.value}`;
    if (selectedGenre.value.id !== -1) {
      apiUrl += `&category=${selectedGenre.value.id}`;
    }
    if (selectedDifficulty.value !== "any difficulty") {
      apiUrl += `&difficulty=${selectedDifficulty.value}`;
    }
    const data = await fetch(apiUrl);
    const result = await data.json();
    console.log(result);
    Questions.value = result.results.map((question) => ({
      ...question,
      question: decodeHtml(question.question),
      incorrect_answers: question.incorrect_answers.map(decodeHtml),
      correct_answer: decodeHtml(question.correct_answer),
    }));
    console.log(Questions.value);

    isLoading.value = true;
  } catch (error) {
    console.error(error);
  }
};

const updateNumQuestions = (selectedValue) => {
  selectedAmount.value = selectedValue;
};
const updateGenre = (selectedValue) => {
  selectedGenre.value = selectedValue;
};
const updateDifficulty = (selectedValue) => {
  selectedDifficulty.value = selectedValue;
};
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
</script>
<style scoped>
/* .settings-container{
    width: ;
} */
</style>
