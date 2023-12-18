<template>
  <div class="options-container w-4/5 flex flex-col items-center">
    <div
      v-for="(option, index) in shuffledChoices"
      :key="index"
      class="h-12 w-full font-semibold cursor-pointer my-4 rounded-md flex items-center px-4"
      :class="getClass(option)"
      @click="selectedChoice(option)"
    >
      {{ option }}
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useTriviaStore } from "../store/TriviaStore";

const store = useTriviaStore();
const { question } = defineProps(["question"]);
const decoded = ref([]);
const shuffledChoices = ref([]);
const correctAnswer = ref();
const selectedAnswer = ref("");
const selected = ref(null);
const hasAnswered = ref(false);
// const answerChoice = [question.correct_answer, ...question.incorrect_answers];

const answerChoice = [question.correct_answer, ...question.incorrect_answers];
correctAnswer.value = question.correct_answer;

const emit = defineEmits(["questionResult"]);

const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
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
};

const selectedChoice = (answer) => {
  if (!hasAnswered.value) {
    selectedAnswer.value = answer;
    if (answer === correctAnswer.value) {
      emit("questionResult", "correct");
    } else {
      emit("questionResult", "incorrect");
    }
    store.setSelectedOption(selectedAnswer.value);
    store.setResultsArray({
      question: question.question,
      correct: correctAnswer.value,
      selected: selectedAnswer.value,
    });
    hasAnswered.value = true;
  }
};

const getClass = (option) => {
  if (option == selectedAnswer.value) {
    return option === correctAnswer.value ? "bg-green-500" : "bg-red-500";
  }
  return "bg-violet-200";
};
decoded.value = answerChoice.map((choice) => {
  return decodeHtml(choice);
});

shuffledChoices.value = shuffle(decoded.value);
console.log(shuffledChoices.value);
</script>
<style scoped></style>
