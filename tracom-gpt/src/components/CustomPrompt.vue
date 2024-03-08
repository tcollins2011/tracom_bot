<template>
    <div class="custom-prompt-container">
      <div class="prompt-label">System</div>
      <textarea v-model="userPrompt" :placeholder='activePrompt'></textarea>
    </div>
  </template>
  
<script>
  import { mapGetters, mapMutations } from 'vuex'
  
  export default {
    computed: {
      ...mapGetters(['activePrompt']),
      userPrompt: {
        get() {
          return this.$store.state.userPrompt;
        },
        set(value) {
          this.updateUserPrompt(value);
        }
      }
    },
    methods: {
      ...mapMutations(['updateUserPrompt']),
    },
  };
</script>
  
<style scoped>
  .custom-prompt-container {
    display: flex;
    flex-direction: column;
    height: 100%; 
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;
  }

  .prompt-label {
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
  }
  
  .custom-prompt-container textarea {
    flex-grow: 1; 
    padding: 10px;
    resize: none; 
    border: none;
  }

  .custom-prompt-container textarea:focus {
    outline: none; 
    border: none; 
  }
</style>
  