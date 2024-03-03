<template>
  <div class="running-costs-container">
    <h2>Last Submission Cost</h2>
      <div class="cost-info">
          <div><span>Input tokens:</span> <span>{{ lastSubmissionTokens.inputTokens }}</span></div>
          <div><span>Output tokens:</span> <span>{{ lastSubmissionTokens.outputTokens }}</span></div>
          <div><span>Total tokens:</span> <span>{{ lastSubmissionTokens.totalTokens }}</span></div>
          <div><span>Cost:</span> <span>$ {{ lastSubmissionTokens.cost.toFixed(4) }}</span></div>
      </div>
    <h2>Total Session Cost</h2>
    <div class="cost-info">
      <div><span>Total tokens:</span> <span>{{ totalSessionTokens }}</span></div>
      <div><span>Cost:</span> <span>$ {{ totalSessionCost.toFixed(4) }}</span></div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    lastSubmissionTokens: {
      type: Object,
      default: () => ({ inputTokens: 0, outputTokens: 0, totalTokens: 0, cost:0 })
    }
  },
  data() {
    return {
      totalSessionTokens: 0,
      totalSessionCost: 0,
    };
  },
  watch: {
    lastSubmissionTokens: {
      deep:true,
      handler(newVal) {
        this.totalSessionTokens += newVal.totalTokens;
        this.totalSessionCost += newVal.cost;
      }
    }
  }
}
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
