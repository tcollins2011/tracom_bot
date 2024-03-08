<template>
  <div class="user-input-display">
    <div class="display-text">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="message-content">
          <img :src="message.img" alt="Profile Picture" class="profile-pic">
          <div class="message-info">
              <div class="sender">{{ message.sender }}</div>
              <div class="text">{{ message.text }}</div>
          </div>
        </div>
        <embedding-accordion v-if="message.sender === 'TracomGPT' && message.embedding && showAccordion" :embedding="message.embedding"></embedding-accordion>
      </div>
    </div>
    <div class="input-wrapper">
      <div class="input-flex-container">
        <textarea
          ref="userInput"
          v-model="userInput"
          placeholder="Message TracomGPT..."
          class="user-input"
          @keyup.enter.prevent="submitText"
          @input="autoExpand"
        ></textarea>
      </div>
      <button class="submit-button" @click="submitText"></button>
    </div>
  </div>
</template>

<script>
import EmbeddingAccordion from './EmbeddingAccordion.vue';

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
  },
  data() {
    return {
      messages: [], 
      userInput: '',
      embeddingText: '',
      embeddingFile:'',
      embeddingPage:'' 
    };
  },
  methods: {
    async submitText() {
      if (this.userInput.trim()) {
        
        this.addMessage(this.userInput, 'You');

        // Initialize an empty message for the bot response
        const botMessageIndex = this.addMessage('', 'TracomGPT');

        try {

          if(this.modelSettings.embeddingsEnabled){
            const embedding = await this.findEmbeddings(this.userInput, this.modelSettings)
            this.embeddingFile = embedding.fileName;
            this.embeddingPage = embedding.startPage;
            this.embeddingText = embedding.contextText
          }

          const response = await fetch('http://localhost:3000/openai/generate-text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: this.userInput, settings: this.modelSettings, embedding: this.embeddingText }),
          });

          const reader = response.body.getReader();

          // Function to read and process each chunk of data
          const read = async () => {
            const { done, value } = await reader.read();
            if (done) {
              const tokenInfo = await this.countTokens(this.userInput, this.messages[botMessageIndex].text, this.modelSettings)
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
          this.messages[botMessageIndex].embedding += this.embeddingText
        } catch (error) {
          console.error('Error calling the backend API:', error);
          this.addMessage('Sorry, something went wrong.', 'Bot');
        }
        this.userInput = '';
        this.embeddingText = '';
        this.embeddingFile = '';
        this.embeddingPage = '';
      }
    },
    async countTokens(inputText, outputText, modelSettings) {
      try{
        const response = await fetch('http://localhost:3000/openai/token-counts/', {
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
        const response = await fetch('http://localhost:3000/openai/relevant-embedding', {
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
        console.log(data)
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
        embedding: "",
      };
      this.messages.push(message);
      return this.messages.length - 1;
    },
    autoExpand(event) {
      const textarea = event.target;
      textarea.style.height = 'auto'; 
      if (textarea.scrollHeight > textarea.clientHeight) {
          textarea.style.height = textarea.scrollHeight + 'px';
      }
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
</style>
