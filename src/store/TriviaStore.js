import { defineStore } from 'pinia';

export const useTriviaStore = defineStore({
  // unique id of the store across your application
  id: 'user',
  state: () => ({
    triviaQuestions: [],
    selectedOption: null

  }),
  getters: {
   getQuestions(){
    return this.triviaQuestions
   },
   getSelectedOption(){
    return this.selectedOption
   }
  },
  actions: {
    // you can use this like a method inside your components
    setQuestions(arr){
        this.triviaQuestions = arr;
    },
    setSelectedOption(option){
      this.selectedOption = option
    }

  },
});
