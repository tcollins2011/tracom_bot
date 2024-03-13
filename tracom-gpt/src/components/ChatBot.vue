<template>
  <div class="user-input-display">
    <div class="display-text" ref="displayText">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="message-content">
          <img :src="message.img" alt="Profile Picture" class="profile-pic">
          <div class="message-info">
              <div class="sender">{{ message.sender }}</div>
              <div class="text" v-html="processText(message.text)"></div>
          </div>
        </div>
        <embedding-accordion v-if="message.sender === 'Social Style AI Assistant' && message.embedding.text && showAccordion" :embedding="message.embedding"></embedding-accordion>
      </div>
    </div>
    <div class="input-wrapper">
      <div class="input-flex-container">
        <textarea
          ref="userInput"
          v-model="userInput"
          placeholder="Ask your Social Style AI Assistant..."
          class="user-input"
          @keyup.enter.prevent="submitText"
          @input="autoExpand"
          :disabled="isLoading"
        ></textarea>
        <div v-if="isLoading" class="spinner"></div>
      </div>
      <button v-if="!isLoading" class="submit-button" @click="submitText"></button>
    </div>
  </div>
</template>

<script>
import EmbeddingAccordion from './EmbeddingAccordion.vue';
import DOMPurify from 'dompurify';

export default {
  name: 'UserInputDisplay',
  components: {
    EmbeddingAccordion,
  },
  props: {
    modelSettings: {
      type: Object,
      required: true, 
    },
    showAccordion: {
      type: Boolean,
      default: false, 
    },
    systemMessage: {
      type: String,
      default: ""
    }
  },
  updated() {
    const displayTextElement = this.$refs.displayText;
    if (displayTextElement) {
      displayTextElement.scrollTop = displayTextElement.scrollHeight
    }
  },
  data() {
    return {
      messages: [], 
      userInput: '',
      embeddingText: '',
      embeddingFile: '',
      embeddingStartPage: '',
      embeddingEndPage: '',
      isLoading: false, 
    };
  },
  methods: {
    async submitText() {
      if (this.userInput.trim()) {
        this.isLoading = true
        this.addMessage(this.userInput, 'You');

        // Initialize an empty message for the bot response
        const botMessageIndex = this.addMessage('', 'Social Style AI Assistant');
        

        try {

          if(this.modelSettings.embeddingsEnabled){
            const embedding = await this.findEmbeddings(this.userInput, this.modelSettings)
            this.embeddingFile = embedding.fileName;
            this.embeddingStartPage = embedding.startPage;
            this.embeddingEndPage = embedding.endPage;
            this.embeddingText = embedding.contextText
          }

          const baseUrl = process.env.VUE_APP_API_BASE_URL; 
          const response = await fetch(`${baseUrl}/openai/generate-text`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: this.userInput, settings: this.modelSettings, embedding: this.embeddingText, context: this.systemMessage }),
          });

          const reader = response.body.getReader();

          // Function to read and process each chunk of data
          const read = async () => {
            const { done, value } = await reader.read();
            if (done) {
              const fullInput = this.userInput + this.embeddingText + this.systemMessage
              const tokenInfo = await this.countTokens(fullInput, this.messages[botMessageIndex].text, this.modelSettings)
              this.$emit('apiResponse', {
                inputTokens: tokenInfo.inputTokens,
                outputTokens: tokenInfo.outputTokens
              });
              return;
            }
            const textChunk = new TextDecoder().decode(value);

            this.messages[botMessageIndex].text += textChunk;

            await read();

          };
          await read();
          this.messages[botMessageIndex].embedding = {'file': this.embeddingFile, 'text': this.embeddingText, 'startPage': this.embeddingStartPage, 'endPage': this.embeddingEndPage}
        } catch (error) {
          console.error('Error calling the backend API:', error);
          this.addMessage('Sorry, something went wrong.', 'Bot');
        }
        this.userInput = '';
        this.embeddingText = '';
        this.embeddingFile = '';
        this.embeddingStartPage = '';
        this.embeddingEndPage= '';
        this.isLoading = false
      }
    },
    async countTokens(inputText, outputText, modelSettings) {
      try{
        const baseUrl = process.env.VUE_APP_API_BASE_URL; 
        const response = await fetch(`${baseUrl}/openai/token-counts/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputText, output: outputText, settings: modelSettings }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json()
        return data
      } catch (error) {
          console.log(error)
      } 
    },
    async findEmbeddings(inputText, modelSettings) {
      try{
        const baseUrl = process.env.VUE_APP_API_BASE_URL; 
        const response = await fetch(`${baseUrl}/openai/relevant-embedding`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: inputText, settings: modelSettings }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json()
        
        return data
      } catch (error) {
          console.log(error)
      } 
    },
    addMessage(text, sender) {
      const message = {
        text: text,
        sender: sender,
        img: sender === 'You' ? require('@/assets/tracom_profile.png') : require('@/assets/gpt_profile.png'),
        embedding: {},
      };
      this.messages.push(message);

      this.$nextTick(() => {
        const container = this.$el.querySelector('.display-text');
        container.scrollTop = container.scrollHeight
      })
      return this.messages.length - 1;
    },
    autoExpand(event) {
      const textarea = event.target;
      textarea.style.height = 'auto'; 
      if (textarea.scrollHeight > textarea.clientHeight) {
          textarea.style.height = textarea.scrollHeight + 'px';
      }
    },
    processText(text) {
      const html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return DOMPurify.sanitize(html);
    }
  },
};
</script>

<style scoped>
  .user-input-display {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .display-text {
    width: 100%;
    height: 100%; 
    padding: 0.5rem;
    border: 1px solid #ccc;
    box-sizing: border-box; 
    resize: none; 
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .message {
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    margin-bottom: 1rem; 
  }

  .message-content {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }

  .profile-pic {
    width: 40px; 
    height: 40px; 
    border-radius: 50%; 
    margin-right: 0.5rem; 
  }

  .message-info {
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
  }
  .sender {
    font-weight: bold;
    margin-bottom: 0.25rem;
    margin-top: 0.7rem;
  }

  .text{
    text-align: left; 
    white-space: pre-wrap; 
  }

  .input-wrapper {
    display: flex;
    align-items: flex-end; 
    border: 1px solid #ccc;
    border-radius: 4px;
    position: relative;
  }

  .input-flex-container {
    flex-grow: 1;
    display: flex;
    align-items: center; 
    padding: 0.5rem;
  }
  .user-input {
    width: 100%;
    min-height: 20px; 
    margin-top: 0.5rem;
    border: none;
    outline: none;
    background-color: transparent;
    resize: none; 
    overflow-y: hidden; 
  }
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

  @keyframes spin {
    0% {
      transform: translateY(-50%) rotate(0deg);
    }
    100% {
      transform: translateY(-50%) rotate(360deg);
    }
  }
</style>
