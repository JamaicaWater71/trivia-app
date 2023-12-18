<template>
  <div class="trivia w-full h-screen flex justify-center bg-violet-100">
    <div
      v-if="questions.length > 0"
      class="w-11/12 h-full min-height-5/6 mt-8 flex flex-col items-center justify-start rounded-md"
    >
      <!-- Progress bar -->
      <div class="flex justify-between mb-1 w-full">
        <span class="text-lg font-bold text-blue-700 dark:text-white w-full"
          >{{ currentQuestionIndex + 1 }}/{{ questions.length }}</span
        >
        <span class="text-lg font-bold text-blue-700 w-36 dark:text-white"
          >SCORE: {{ score }}/{{ questions.length }}
        </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class="bg-blue-600 h-2.5 rounded-full"
          :style="{
            width: ((currentQuestionIndex + 1) / questions.length) * 100 + '%',
          }"
        ></div>
      </div>
      <!-- Question -->
      <div
        class="question w-full h-32 font-bold text-lg text-white bg-violet-600 p-2 my-4 rounded-md"
      >
        {{ questions[currentQuestionIndex].question }}
      </div>
      <!-- Answer Options -->
      <div
        class="choices-container h-2/4 bg-violet-600 w-full flex justify-center rounded-md py-8"
      >
        <AnswerChoices
          :question="questions[currentQuestionIndex]"
          :key="currentQuestionIndex"
          @question-result="updateScore"
        />
      </div>
      <button
        v-if="currentQuestionIndex < questions.length - 1"
        @click="nextQuestion"
        class="btn my-4 w-32 font-bold text-lg"
      >
        Next
      </button>
      <!-- <button v-else @click="finishQuiz">Finish</button> -->
      <button
        v-else
        @click="finishQuiz"
        class="btn my-4 w-32 font-bold text-lg"
      >
        FINISH
      </button>
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
const currentQuestionIndex = ref(0);
const score = ref(0);

onMounted(() => {
  questions.value = store.getQuestions;
  // answerChoices.value = [...]
});

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    if (store.getSelectedOption) {
      currentQuestionIndex.value++;
      store.setSelectedOption(null);
    }
  }
};

const updateScore = (result) => {
  if (result === "correct") {
    score.value += 1;
  }
};
const finishQuiz = () => {
  router.push("/results");
};
</script>

<style scoped></style>
