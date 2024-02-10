<template>
    <div class="chat-with-details">
      <div class="chat-container">
        <Chatbot @apiResponse="handleApiResponse" />
      </div>
      <div class="details-container">
        <h2>API Call Details</h2>
        <p>Tokens Used: {{ apiDetails.tokensUsed }}</p>
        <p>Cost: {{ apiDetails.cost }}</p>
        <p>Total Cost: {{ totalCost }}</p>
        <!-- Display other info as needed -->
      </div>
    </div>
  </template>
  
  <script>
  import Chatbot from '@/components/ChatBot.vue';
  
  export default {
    components: {
      Chatbot,
    },
    data() {
      return {
        apiDetails: {
          tokensUsed: 0,
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
  }
  
  .chat-container {
    flex: 1;
  }
  
  .details-container {
    flex: 1;
  }
  </style>
  