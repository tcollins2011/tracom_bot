<template>
  <div class="embedding-accordion">
    <div class="accordion-toggle" @click="toggleAccordion" :aria-expanded="isOpen.toString()">
      <span> Expand Embedding</span>
    </div>
    <div v-if="isOpen" class="accordion-content">
      <div>{{ embedding }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EmbeddingAccordion',
    props: {
      embedding: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggleAccordion() {
        this.isOpen = !this.isOpen;
      },
    },
  };
</script>

<style scoped>
  .embedding-accordion {
    width: 100%; 
    margin-top: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
    border-radius: 4px; 
  }

  .accordion-toggle {
    cursor: pointer;
    padding: 0.2rem;
    background-color: #f0f0f0; 
    border-bottom: 1px solid #ccc;
    width: 100%; 
    height: 10px; 
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .accordion-toggle::after {
    border-bottom: 2px solid #333; 
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg); 
    transition: transform 0.3s ease; 
  }

  .accordion-toggle span {
    font-family: 'Sohne', sans-serif;
    font-size: clamp(12px, 1.5vh, 14px);  
  }

  .accordion-toggle:hover {
    background-color: #f0f0f0; 
  }

  .accordion-content {
    padding: 0.5rem;
    background-color: #fff;
    color: #333;
    border-left: 1px solid #e0e0e0; 
    border-right: 1px solid #e0e0e0; 
    border-bottom: 1px solid #e0e0e0; 
    font-family: 'Sohne', sans-serif;
    font-size: clamp(12px, 1.5vh, 14px);  
  }

  .accordion-content div {
    padding: 0.2rem 0; 
  }
</style>


