<!-- src/components/Tooltip.vue -->
<template>
    <div v-if="visible" class="tooltip" :style="computedStyle">
      <slot></slot>
    </div>
  </template>
  
<script>
  export default {
    props: {
      visible: Boolean,
      position: Object,
    },
    computed: {
      computedStyle() {
        return {
          position: 'absolute',
          left: `${this.position.left}px`,
          top: `${this.position.top}px`,
          maxWidth: '240px',
        };
      },
    },
  };
</script>
  
<style scoped>
  .tooltip {
    font-family: 'Sohne', sans-serif; 
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    color: #353740;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    z-index: 1001;
    box-shadow: 0 4px 6px rgba(0.1, 0.2, 0.2, 0.5); 
    transition: opacity 0.3s ease-in-out; 
  }

  .tooltip[visible] {
    opacity: 1; 
    visibility: visible; 
  }
</style>
  