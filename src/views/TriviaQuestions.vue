<template>
  <div class="trivia">
    <h1>Trivia Questions</h1>
    <div v-if="questions.length > 0">
      <div class="question">
        {{ questions[currentQuestionIndex].question }}
      </div>
      <!-- You can add your answer options here -->
      <button
        v-if="currentQuestionIndex < questions.length - 1"
        @click="nextQuestion"
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

const store = useTriviaStore();
const router = useRouter();
const questions = ref([]);
const currentQuestionIndex = ref(0);

onMounted(() => {
  questions.value = store.getQuestions;
});

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
}

function finishQuiz() {
  // Handle the completion of the quiz, perhaps navigate to a results page or show a summary
  // For example:
  router.push("/results");
}
</script>

<style scoped></style>
