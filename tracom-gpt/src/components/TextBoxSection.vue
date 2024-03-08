<!-- src/components/TextBoxSection.vue -->
<template>
    <section class="text-box-section">
      <div class="container">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'TextBoxSection',
    props: {
      title: String,
      content: String,
    },
  };
  </script>
  
  <style scoped>
  .text-box-section {
    padding: 1.2rem;
    background-color: #f0f0f0; 
  }
  
  .container {
    max-width: 86%;
    margin: 0 auto;
  }
  
  h2 {
    margin-bottom: 1rem;
    margin-top: 2rem;
  }
  
  </style>
  