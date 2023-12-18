<template>
  <div class="trivia w-full h-full flex justify-center bg-violet-100">
    <div
      v-if="questions.length > 0"
      class="w-11/12 height-5/6 min-height-5/6 mt-8 flex flex-col items-center justify-start rounded-md"
    >
      <!-- Progress bar -->
      <div class="flex justify-between mb-1 w-full">
        <span class="text-base font-medium text-blue-700 dark:text-white w-full"
          >{{ currentQuestionIndex + 1 }}/{{ questions.length }}</span
        >
        <span class="text-sm font-medium text-blue-700 dark:text-white"
          >45%</span
        >
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class="bg-blue-600 h-2.5 rounded-full"
          :style="{
            width: ((currentQuestionIndex + 1) / questions.length) * 100 + '%',
          }"
        ></div>
      </div>
      <div
        class="question w-full h-32 bg-violet-600 text-white p-2 my-4 rounded-md"
      >
        {{ questions[currentQuestionIndex].question }}
      </div>
      <!-- You can add your answer options here -->
      <div
        class="choices-container bg-violet-600 w-full flex justify-center rounded-md"
      >
        <AnswerChoices
          :question="questions[currentQuestionIndex]"
          :key="currentQuestionIndex"
        />
      </div>
      <button
        v-if="currentQuestionIndex < questions.length - 1"
        @click="nextQuestion"
        class="btn my-4"
      >
        Next
      </button>
      <button v-else @click="finishQuiz">Finish</button>
    </div>
    <div v-else>
      <p>Loading questions...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTriviaStore } from "../store/TriviaStore";
import AnswerChoices from "../components/AnswerChoices.vue";

const store = useTriviaStore();
const router = useRouter();
const questions = ref([]);
const answerChoices = ref([]);
const currentQuestionIndex = ref(0);

onMounted(() => {
  questions.value = store.getQuestions;
  // answerChoices.value = [...]
});

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function finishQuiz() {
  router.push("/results");
}
</script>

<style scoped></style>
