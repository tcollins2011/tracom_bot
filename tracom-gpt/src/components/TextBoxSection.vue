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
    background-color: #f0f0f0; /* Example background color */
  }
  
  .container {
    max-width: 86%; /* Example max width */
    margin: 0 auto;
  }
  
  h2 {
    margin-bottom: 1rem;
    margin-top: 2rem;
    /* Additional styling for the title */
  }
  
  p {
    /* Styling for the paragraph/content */
  }
  </style>
  