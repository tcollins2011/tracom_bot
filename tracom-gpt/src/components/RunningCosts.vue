<template>
    <div class="running-costs-container">
      <h2>Last Submission Cost</h2>
        <div class="cost-info">
            <div><span>Input tokens:</span> <span>{{ inputTokens }}</span></div>
            <div><span>Output tokens:</span> <span>{{ outputTokens }}</span></div>
            <div><span>Total tokens:</span> <span>{{ tokensUsedThisSession }}</span></div>
            <div><span>Cost:</span> <span>$ {{ cost.toFixed(2) }}</span></div>
        </div>
      <h2>Total Session Cost</h2>
      <div class="cost-info">
        <div><span>Total tokens:</span> <span>{{ tokensUsedThisSession }}</span></div>
        <div><span>Cost:</span> <span>$ {{ cost.toFixed(2) }}</span></div>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        tokensUsedThisSession: 0,
        inputTokens: 0,
        outputTokens: 0,
        cost: 0,
      };
    },
    mounted() {
      this.calculateCost();
    },
    methods: {
      calculateCost() {
        this.calculatedCost = '0';
      },
    },
  };
</script>
  
<style scoped>
    .running-costs-container {
    padding: 10px; 
    margin-top: 20px; 
    border-top: 1px solid #c5c5d2; 
    }

    .running-costs-container h2 {
        font-size: clamp(16px, 1.5vh, 18px);
        text-align: left;
   
    }
    .cost-info {
    display: flex;
    flex-direction: column; 
    font-size: clamp(12px, 1.5vh, 14px); 
    }

    .cost-info > div {
    display: flex;
    justify-content: space-between; 
    margin-bottom: 10px; 
    align-items: center; 
    }

    .cost-info > div > span:first-child {
    text-align: left; 
    }

    .cost-info > div > span:last-child {
    text-align: right; 
    }
</style>
  