<template>
  <div class="container flex flex-col items-center">
    <!-- QUESTION AMOUNT DROPDOWN -->
    <details class="dropdown w-2/3 mt-4" ref="dropdownDetails1">
      <summary class="m-1 btn w-full h-16 text-md font-semibold md:text-lg">
        Select Num. of Questions: {{ selectedAmount }}
      </summary>
      <ul
        class="p-2 shadow menu text-center dropdown-content z-[1] bg-base-100 rounded-md w-full"
      >
        <li
          v-for="n in questionAmount"
          :key="n"
          @click="closeDropdown(n)"
          class="text-center font-semibold"
        >
          <a>{{ n }}</a>
        </li>
      </ul>
    </details>
    <!-- GENRE DROPDOWN -->
    <details class="dropdown w-2/3 mt-8" ref="dropdownDetails2">
      <summary class="m-1 btn w-full h-16 text-md font-semibold md:text-lg">
        Select Genre: {{ selectedGenre.name }}
      </summary>
      <ul
        class="p-2 shadow dropdown-content z-[1] bg-base-100 rounded-md w-full max-h-80 overflow-y-auto flex flex-col"
      >
        <li
          v-for="genre in triviaGenres"
          :key="genre.id"
          @click="closeDropdown2(genre)"
          class="py-2 px-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-md"
        >
          <a>{{ genre.name }}</a>
        </li>
      </ul>
    </details>
    <!-- DIFFICULTY DROPDOWN -->
    <details class="dropdown w-2/3 mt-8" ref="dropdownDetails3">
      <summary class="m-1 btn w-full h-16 text-md font-semibold md:text-lg">
        Select Difficulty: {{ capitalizeWords(selectedDifficulty) }}
      </summary>
      <ul
        class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-md w-full"
      >
        <li
          v-for="d in difficulty"
          :key="d"
          @click="closeDropdown3(d)"
          class="text-center font-semibold"
        >
          <a>{{ capitalizeWords(d) }}</a>
        </li>
      </ul>
    </details>
  </div>
</template>
<script setup>
import { ref } from "vue";
import triviaGenres from "../data.js";
const dropdownDetails1 = ref(null);
const dropdownDetails2 = ref(null);
const dropdownDetails3 = ref(null);
const selectedAmount = ref(10);
const selectedGenre = ref({ id: -1, name: "Any Category" });
const questionAmount = [5, 10, 15, 20, 25, 30];
const difficulty = ["Any Difficulty", "easy", "medium", "hard"];
const selectedDifficulty = ref("Any Difficulty");

const emit = defineEmits([
  "numSelected",
  "genreSelected",
  "difficultySelected",
]);

//to close and emit event for select amount dropdown
const closeDropdown = (n) => {
  selectedAmount.value = n;
  emit("numSelected", n);
  if (dropdownDetails1.value) {
    dropdownDetails1.value.open = false;
  }
};

//to close and emit event for select genre dropdown
const closeDropdown2 = (genre) => {
  selectedGenre.value = genre;
  emit("genreSelected", genre);
  if (dropdownDetails2.value) {
    dropdownDetails2.value.open = false;
  }
};

//to close and emit event for select difficulty dropdown
const closeDropdown3 = (difficulty) => {
  selectedDifficulty.value = difficulty;
  emit("difficultySelected", difficulty);
  if (dropdownDetails3.value) {
    dropdownDetails3.value.open = false;
  }
};

//capitalises first letter of each word in string;
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
</script>
<style scoped></style>
