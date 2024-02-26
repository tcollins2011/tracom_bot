<template>
  <div class="chat-with-details">
    <div class="custom-prompt-container">
      <CustomPrompt />
    </div>
    <div class="chat-container">
      <Chatbot :modelSettings="currentSettings" @apiResponse="handleApiResponse" />
    </div>
    <div class="model-settings-container">
      <ModelSettings @settingsChanged="handleSettingsChange" />
      <RunningCosts/>
    </div>
  </div>
</template>
  
  <script>
  import Chatbot from '@/components/ChatBot.vue';
  import ModelSettings from '@/components/ModelSettings.vue'
  import CustomPrompt from '@/components/CustomPrompt.vue'
  import RunningCosts from '@/components/RunningCosts.vue'
  
  export default {
    components: {
      ModelSettings,
      Chatbot,
      CustomPrompt,
      RunningCosts,
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
        currentSettings: {
          model: 'gpt-3.5-turbo',
          temperature: 1,
          maxTokens: 256,
          topP: 1,
          frequencyPenalty: 0,
          presencePenalty: 0,
        }
      };
    },
    methods: {
      handleApiResponse(details) {
        this.apiDetails = details;
        this.totalCost += details.cost;
        // Update other details as needed
      },
      handleSettingsChange(newSettings) {
        this.currentSettings = newSettings
      },
    },
  };
  </script>
  
<style>
  .chat-with-details {
    display: flex;
    margin-top: 10vh;
    align-items: stretch; 
    gap: 20px;
    max-width: 100vw;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    height: 88vh;
  }
  
  .custom-prompt-container {
    flex: 0 0 20%; 
    min-width: 0;
  }
  
  .chat-container {
    flex: 4;
    min-width: 0;
  }
  
  .model-settings-container {
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    min-width: 250px;
    max-width: 300px
  }
  
</style>
  