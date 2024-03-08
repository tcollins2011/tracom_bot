<template>
  <div class="chat-with-details">
    <div class="custom-prompt-container">
      <CustomPrompt />
    </div>
    <div class="chat-container">
      <Chatbot :modelSettings="currentSettings" :show-accordion="true" @apiResponse="handleApiResponse" />
    </div>
    <div class="model-settings-container">
      <ModelSettings @settingsChanged="handleSettingsChange" />
      <RunningCosts :lastSubmissionTokens="lastSubmissionTokens"/>
    </div>
  </div>
</template>
  
  <script>
  import { mapGetters, mapMutations, mapState } from 'vuex'
  import Chatbot from '@/components/ChatBot.vue';
  import ModelSettings from '@/components/ModelSettings.vue'
  import CustomPrompt from '@/components/CustomPrompt.vue'
  import RunningCosts from '@/components/RunningCosts.vue'
  import estimateCost from '@/utils/costEstimator';
  
  export default {
    components: {
      ModelSettings,
      Chatbot,
      CustomPrompt,
      RunningCosts,
    },
    computed: {
      ...mapState(['currentSettings']), 
      ...mapGetters(['activePrompt']),
    },
    data() {
      return {
        lastSubmissionTokens: {
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
          cost: 0,
        },
      };
    },
    methods: {
      ...mapMutations(['toggleEmbeddingsEnabled']),
      handleApiResponse(details) {
        this.lastSubmissionTokens.inputTokens = details.inputTokens;
        this.lastSubmissionTokens.outputTokens = details.outputTokens;
        this.lastSubmissionTokens.totalTokens = details.outputTokens + details.inputTokens
        this.lastSubmissionTokens.cost = estimateCost( this.currentSettings.model, details.outputTokens, details.inputTokens)
      },
      handleSettingsChange(newSettings) {
        this.$store.commit('updateSettings', newSettings);
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
  