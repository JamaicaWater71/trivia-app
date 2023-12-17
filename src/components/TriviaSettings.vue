<template>
  <div class="container w-2/3 flex flex-col items-center">
    <details class="dropdown w-2/3 mt-8" ref="dropdownDetails1">
      <summary class="m-1 btn w-full">
        Select Number of Questions: {{ selectedAmount }}
      </summary>
      <ul
        class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-md w-full"
      >
        <li v-for="n in questionAmount" :key="n" @click="closeDropdown(n)">
          <a>{{ n }}</a>
        </li>
      </ul>
    </details>
    <details class="dropdown w-2/3 mt-8" ref="dropdownDetails2">
      <summary class="m-1 btn w-full">
        Select Genre: {{ selectedGenre.name }}
      </summary>
      <ul
        class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-md w-full"
      >
        <li
          v-for="genre in triviaGenres"
          :key="genre.id"
          @click="closeDropdown2(genre)"
        >
          <a>{{ genre.name }}</a>
        </li>
      </ul>
    </details>
    <details class="dropdown w-2/3 mt-8" ref="dropdownDetails3">
      <summary class="m-1 btn w-full">
        Select Difficulty: {{ selectedDifficulty }}
      </summary>
      <ul
        class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-md w-full"
      >
        <li v-for="d in difficulty" :key="d" @click="closeDropdown3(d)">
          <a>{{ d }}</a>
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
const difficulty = ["any difficulty", "easy", "medium", "hard"];
const selectedDifficulty = ref("any difficulty");

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
</script>
<style scoped></style>
