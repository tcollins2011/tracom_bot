<template>
    <div class="custom-prompt-container">
      <div class="prompt-label">System</div>
      <textarea v-model="userPrompt" placeholder="Enter your custom prompt here..." @input="updatePrompt"></textarea>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        userPrompt: '',
      };
    },
    methods: {
      updatePrompt() {
        this.$emit('updatePrompt', this.userPrompt);
      },
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
  