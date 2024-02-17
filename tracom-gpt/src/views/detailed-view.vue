<template>
    <div class="chat-with-details">
        <div class="details-container">
        <h2>API Call Details</h2>
        <p>Tokens Used: {{ apiDetails.tokensUsed }}</p>
        <p>Cost: {{ apiDetails.cost }}</p>
        <p>Total Cost: {{ totalCost }}</p>
        <!-- Display other info as needed -->
      </div>
      <div class="chat-container">
        <Chatbot @apiResponse="handleApiResponse" />
      </div>
      <ModelSettings class="settings-container"></ModelSettings>  
    </div>
  </template>
  
  <script>
  import Chatbot from '@/components/ChatBot.vue';
  import ModelSettings from '@/components/ModelSettings.vue'
  
  export default {
    components: {
      ModelSettings,
      Chatbot,
    },
    data() {
      return {
        apiDetails: {
          totalTokensUsed: 0,
          inputTokens: 0,
          outputTokens: 0,
          cost: 0,
          // Include other details here
        },
        totalCost: 0,
      };
    },
    methods: {
      handleApiResponse(details) {
        this.apiDetails = details;
        this.totalCost += details.cost;
        // Update other details as needed
      },
    },
  };
  </script>
  
  <style>
  .chat-with-details {
    display: flex;
    margin-top: 120px;
    align-self: flex-start;
  }
  
  .settings-container {
    /* flex: 0 0 20%; */
  }
  .chat-container {
    flex-grow: 1;
  }
  
  .details-container {
    /* flex: 0 0 10%; */
    padding-left: 20px;
    min-width: 200px;
  }

  </style>
  