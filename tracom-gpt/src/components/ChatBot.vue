<template>
    <div class="user-input-display">
      <div class="display-text">
        <div v-for="(message, index) in messages" :key="index" class="message">
            <img :src="message.img" alt="Profile Picture" class="profile-pic">
            <div class="message-info">
                <div class="sender">{{ message.sender }}</div>
                <div class="text">{{ message.text }}</div>
            </div>
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
  // import estimateCost from '@/utils/costEstimator';

  export default {
    name: 'UserInputDisplay',
    data() {
      return {
        messages: [], // Holds Messages 
        userInput: '', // To capture user input
      };
    },
    methods: {
      async submitText() {
        if (this.userInput.trim()) {
          // Add the user message to the display
          this.addMessage(this.userInput, 'You');

          // Initialize an empty message for the bot response
          const botMessageIndex = this.addMessage('', 'Bot');

          // Call the backend API
          try {
            const response = await fetch('http://localhost:3000/api/openai/generate-text', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ prompt: this.userInput }),
            });

            const reader = response.body.getReader();
            // let total = '';

            // Function to read and process each chunk of data
            const read = async () => {
              const { done, value } = await reader.read();
              if (done) {
                // All data has been read
                console.log('Stream finished');
                this.$emit('apiResponse', {
                  // You might need a different approach to get these details,
                  // as they won't be available until the entire response is received
                });
                return;
              }

              // Convert the Uint8Array to a string and append to the total response
              const textChunk = new TextDecoder().decode(value);
              // total += textChunk;

              // Update the bot's message with the new chunk
              this.messages[botMessageIndex].text += textChunk;

              // Read the next chunk
              read();
            };

            // Start reading the stream
            read();
          } catch (error) {
            console.error('Error calling the backend API:', error);
            // Handle the error appropriately
            this.addMessage('Sorry, something went wrong.', 'Bot');
          }

          // Clear the user input field
          this.userInput = '';
        }
      },
      addMessage(text, sender) {
        const message = {
          text: text,
          sender: sender,
          img: sender === 'You' ? require('@/assets/tracom_profile.png') : require('@/assets/gpt_profile.png'),
        };
        this.messages.push(message);
        // Return the index of the newly added message
        return this.messages.length - 1;
      },
      autoExpand(event) {
        const textarea = event.target;
        textarea.style.height = 'auto'; // Reset height to recalculate
         // Only expand if the scrollHeight is greater than the current height
        if (textarea.scrollHeight > textarea.clientHeight) {
            textarea.style.height = textarea.scrollHeight + 'px';
        }
      }
    },
  };
</script>
  
<style scoped>
  .user-input-display {
    width: 100%;
    margin: 0 auto;
  }
  .display-text {
    width: 100%;
    height: 70vh; /* Adjust based on your needs */
    padding: 0.5rem;
    border: 1px solid #ccc;
    box-sizing: border-box; /* Ensures padding does not affect overall dimensions */
    resize: none; /* Prevents resizing of the textarea */
    overflow-y: auto;
  }

  .message {
  display: flex;
  align-items: flex-start; /* Align items to the start of the flex container */
  margin-bottom: 1rem; /* Space between messages */
}

.profile-pic {
  width: 40px; /* Adjust based on your design */
  height: 40px; /* Adjust based on your design */
  border-radius: 50%; /* Make the image circular */
  margin-right: 0.5rem; /* Space between the picture and the text */
}

.message-info {
  display: flex;
  flex-direction: column; /* Stack sender and text vertically */
  align-items: flex-start;
}
.sender {
  font-weight: bold;
  margin-bottom: 0.25rem;
  margin-top: 0.7rem;
}

.text{
  text-align: left; /* Ensures multiline text is left-justified */
  white-space: pre-wrap; /* Ensures line breaks and spaces are preserved */
}
  
  .input-wrapper {
  display: flex;
  align-items: flex-end; /* Aligns button to the bottom */
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
}

.input-flex-container {
  flex-grow: 1;
  display: flex;
  align-items: center; /* Centers the textarea vertically */
  padding: 0.5rem;
}
.user-input {
  width: 100%;
  min-height: 20px; /* Initial minimum height */
  margin-top: 0.5rem;
  border: none;
  outline: none;
  background-color: transparent;
  resize: none; /* Prevent manual resizing */
  overflow-y: hidden; /* Hide vertical scrollbar */
}
.submit-button {
  margin-left: 0.5rem; /* Space between the button and the input text */
  margin-bottom: 1.25rem;
  padding: 0.5rem 1rem; /*Adjust to match the input height */
  cursor: pointer;
  background: url('@/assets/up-arrow.svg') no-repeat center center; /* Use your arrow icon */
  border: none;
  outline: none;
  background-size: 50%; /* Adjust size as needed */
  
}

  </style>
  