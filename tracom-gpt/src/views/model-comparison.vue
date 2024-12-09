<template>
  <div class="main-container">
    <div class="custom-prompt-container">
      <CustomPrompt />
    </div>
    <div class="content-container">
      <div class="model-settings-container">
        <h2 class="settings-title">Model A Settings</h2>
        <ModelSettings :modelSettings="currentSettingsModelA" @settingsChanged="(newSettings) => handleSettingsChange('ModelA', newSettings)" />
      </div>
      <div class="chat-wrapper">
        <div class="chat-container">
          <div class="chatbot">
            <h2 class="chat-title">Chatbot A</h2>
            <Chatbot
              :modelSettings="currentSettingsModelA"
              :show-accordion="true"
              :systemMessage="activePrompt"
              :inputEnabled="false"
              ref="chatbotA"
            />
          </div>
          <div class="chatbot">
            <h2 class="chat-title">Chatbot B</h2>
            <Chatbot
              :modelSettings="currentSettingsModelB"
              :show-accordion="true"
              :systemMessage="activePrompt"
              :inputEnabled="false"
              ref="chatbotB"
            />
          </div>
        </div>
        <div class="shared-input-container">
          <div class="input-wrapper">
            <div class="input-flex-container">
              <textarea
                ref="userInput"
                v-model="userInput"
                placeholder="Ask your Social Style AI Assistant..."
                class="user-input"
                @keyup.enter.prevent="submitComparison"
                @input="autoExpand"
                :disabled="isLoading"
              ></textarea>
              <div v-if="isLoading" class="spinner"></div>
            </div>
            <button
              v-if="!isLoading"
              class="submit-button"
              @click="submitComparison"
            ></button>
        </div>
    </div>
      </div>
      <div class="model-settings-container">
        <h2 class="settings-title">Model B Settings</h2>
        <ModelSettings :modelSettings="currentSettingsModelB" @settingsChanged="(newSettings) => handleSettingsChange('ModelB', newSettings)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
  import Chatbot from '@/components/ChatBot.vue';
  import ModelSettings from '@/components/ModelSettings.vue'
  import CustomPrompt from '@/components/CustomPrompt.vue'
  
  export default {
    components: {
      ModelSettings,
      Chatbot,
      CustomPrompt,
    },
    data() {
    return { 
        userInput: '',
        isLoading: false, 
      };
    },
    computed: {
      ...mapState(['currentSettingsModelA', 'currentSettingsModelB']), 
      ...mapGetters(['activePrompt']),
    },
    methods: {
      async submitComparison() {
        if (this.userInput.trim()) {
          try {
            this.isLoading = true;
            await Promise.all([
              this.$refs.chatbotA.recieveExternalInput(this.userInput),
              this.$refs.chatbotB.recieveExternalInput(this.userInput),
            ]);
          } catch (error) {
            console.error('Error during comparison submission:', error);
          } finally {
            this.isLoading = false;
            this.userInput = ''; 
          }
        }
      },
      autoExpand(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        if (textarea.scrollHeight > textarea.clientHeight) {
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      },
      handleSettingsChange(modelKey, newSettings) {
        const mutationKey =
          modelKey === 'ModelA'
            ? 'updateModelASettings'
            : 'updateModelBSettings';
        this.$store.commit(mutationKey, newSettings);
      },
    },
  };
</script>

<style scoped>
/* Main container stacks the custom prompt on top */
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Custom prompt spans across the top */
.custom-prompt-container {
  flex: 0 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  height: 10vh; /* Adjust as needed */
  min-height: 180px;
}

/* Content container holds the settings and chat wrapper */
.content-container {
  flex: 1 1 auto;
  display: flex;
  align-items: stretch;
  padding: 20px;
  gap: 20px;
  overflow: hidden; /* Prevent scrollbars from appearing */
}

/* Model settings on the left and right */
.model-settings-container {
  flex: 0 0 200px;
  min-width: 200px;
  max-width: 200px;
  overflow-y: auto;
  padding: 10px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* Chat wrapper to hold chat container and shared input */
.chat-wrapper {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Chat container with two chatbots side by side */
.chat-container {
  flex: 1 1 auto;
  display: flex;
  gap: 20px;
  overflow: hidden;
}

/* Each chatbot */
.chatbot {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* Titles for chatbots */
.chat-title {
  margin-bottom: 15px;
  text-align: center;
}

/* Updated shared input container */
.shared-input-container {
  flex: 0 0 auto;
  padding: 10px;
  background-color: #f1f1f1;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
}

/* Wrapper for input field */
.input-wrapper {
  display: flex;
  align-items: flex-end;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  width: 100%;
}

/* Flex container for input */
.input-flex-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 0.5rem;
}

/* Input field styling */
.user-input {
  width: 100%;
  min-height: 20px;
  border: none;
  outline: none;
  background-color: transparent;
  resize: none;
  overflow-y: hidden;
  font-size: 16px;
  padding: 0.5rem;
  font-family: Arial, sans-serif;
}

/* Submit button styling */
.submit-button {
  margin-left: 0.5rem; 
  margin-bottom: 1.25rem;
  padding: 0.5rem 1rem; 
  cursor: pointer;
  background: url('@/assets/up-arrow.svg') no-repeat center center; 
  border: none;
  outline: none;
  background-size: 50%; 
}

/* Spinner for loading state */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  animation: spin 1s infinite linear;
}

/* Spinner animation */
@keyframes spin {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
}

/* Additional styling */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

</style>