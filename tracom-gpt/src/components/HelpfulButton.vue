<template>
  <div class="feedback-container">
    <p class="feedback-text">Was this a good response?</p>
    <button
      @click="submitFeedback(true)"
      class="feedback-button helpful"
      :disabled="buttonsDisabled"
      :class="{ clicked: clickedButton === 'helpful', disabled: buttonsDisabled }"
    >
      <font-awesome-icon :icon="['fas', 'thumbs-up']" /> 
    </button>
    <button
      @click="submitFeedback(false)"
      class="feedback-button not-helpful"
      :disabled="buttonsDisabled"
      :class="{ clicked: clickedButton === 'notHelpful', disabled: buttonsDisabled }"
    >
      <font-awesome-icon :icon="['fas', 'thumbs-down']" /> 
    </button>
    <p v-if="feedbackSent" class="feedback-message">{{ message }}</p>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

// Add only the icons needed for this component
library.add(faThumbsUp, faThumbsDown);

export default {
  name: 'HelpfulButton',
  components: {
    FontAwesomeIcon,
  },
  props: {
    response: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
      default: '',
    },
    model: {
      type: String,
      required: true,
      default: '',
    },
    context: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      feedbackSent: false,
      message: '',
      buttonsDisabled: false,
      clickedButton: null, 
    };
  },
  methods: {
    async submitFeedback(isHelpful) {
      this.buttonsDisabled = true; 
      this.clickedButton = isHelpful ? 'helpful' : 'notHelpful'; 

      try {
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        const response = await fetch(`${baseUrl}/feedback/submission`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            helpful: isHelpful,
            response: this.response,
            question: this.question,
            context: this.context,
            model: this.model,
          }),
        });
        if (response.ok) {
          this.feedbackSent = true;
          this.message = 'Thank you for your feedback!';
        } else {
          this.message = 'Error sending feedback.';
        }
      } catch (error) {
        console.error('Error:', error);
        this.message = 'Error submitting feedback.';
      }
    },
  },
};
</script>

<style scoped>
.feedback-container {
  text-align: center;
  margin-top: 20px;
}

.feedback-text {
  font-size: 1.2em;
  margin-bottom: 10px;
  font-weight: bold;
}

.feedback-button {
  padding: 10px 20px;
  font-size: 1em;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: filter 0.3s, border 0.3s;
}

.feedback-button i {
  margin-right: 5px;
}

.feedback-button.helpful {
  background-color: #4CAF50;
  color: white;
}

.feedback-button.not-helpful {
  background-color: #F44336;
  color: white;
}

.feedback-button.disabled {
  filter: grayscale(40%); /* Apply gray filter when disabled */
  cursor: not-allowed;
}

.feedback-button.clicked {
  border: 4px solid #FFD700; /* Thicker gold border */
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.6); /* Soft gold glow */
  transform: scale(1.25); /* Slightly enlarge the clicked button */
  transition: transform 0.3s, box-shadow 0.3s, border 0.3s; /* Smooth transition for all effects */
}

.feedback-message {
  font-size: 1em;
  margin-top: 15px;
  color: #555;
}
</style>
