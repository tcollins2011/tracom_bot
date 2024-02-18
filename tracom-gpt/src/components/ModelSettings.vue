<!-- src/components/ModelSettings.vue -->
<template>
    <div class="settings-panel">
      <div class="setting">
        <label for="model" 
          @mouseover="handleMouseOver($event,'The model which will generate the completion. Some models are suitable for natural language tasks, others specialize in code.')"
          @mouseleave="handleMouseLeave">
        Model
        </label>
        <select v-model="settings.model" id="model">
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-4-turbo-preview">gpt-4-turbo-preview</option>
          <!-- Add other models as needed -->
        </select>
      </div>
      
      <div class="setting" v-for="setting in settingsList" :key="setting.name">
        <div class="input-group">
          <label :for="setting.name" 
               @mouseover="handleMouseOver($event, setting.description)"
               @mouseleave="handleMouseLeave">
          {{ setting.label  }} 
          </label>
          <input :type="setting.type" v-model.number="settings[setting.name]" :id="setting.name" :min="setting.min" :max="setting.max" :step="setting.step">
        </div>
        <input type="range" v-model="settings[setting.name]" :min="setting.min" :max="setting.max" :step="setting.step" :title="setting.description">
      </div>
      <Tooltip :visible="isTooltipVisible" :position="tooltipPosition">
        {{ tooltipContent }}
      </Tooltip>
    </div>
  </template>
  
<script>
  import Tooltip from './TooltipAria.vue'

  export default {
    components: {
      Tooltip,
    },
    data() {
      return {
        settings: {
          model: 'gpt-3.5-turbo',
          temperature: 1,
          maxTokens: 4096,
          topP: 1,
          frequencyPenalty: 0,
          presencePenalty: 0,
        },
        settingsList: [
            { name: 'temperature', label: 'Temperature', type: 'number', min: 0, max: 2, step: 0.01, description: 'Controls randomness: Lowering results in less random completions. As the temperature approahces zero, the model will become deterministic and repetitive.'},
            { name: 'maxTokens', label: 'Max tokens', type: 'number', min: 1, max: 4096, step: 1, description: 'The maximum number of tokens to generate shared between the prompt and completion. The exact limit varies by model. (One token is roughly 4 characters for standard English text.)' },
            { name: 'topP', label: 'Top P', type: 'number', min: 0, max: 1, step: 0.01, description: 'Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.' },
            { name: 'frequencyPenalty', label: 'Frequency penalty', type: 'number', min: 0, max: 2, step: 0.01, description: "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim."},
            { name: 'presencePenalty', label: 'Presence penalty', type: 'number', min: 0, max: 2, step: 0.01, description: "How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics."},
        ],
        isTooltipVisible: false,
        tooltipPosition: { left: 0, top: 0},
        tooltipContent: '',
      };
    },
    watch: {
      settings: {
        deep: true,
        handler(newSettings) {
          this.$emit('settingsChanged',newSettings);
        }
      }
    },
    methods: {
      handleMouseOver(event, description) {
        this.tooltipContent = description;

        const elementRect = event.target.getBoundingClientRect(); // Get the bounding rectangle of the target element
        const tooltipWidth = 240; // Assuming a fixed tooltip width, adjust as needed
        this.tooltipPosition = {
          left: - tooltipWidth - 33, // Position to the left of the element, adjust the offset as needed
          top:  elementRect.top - 170 // Vertically center the tooltip relative to the element
        };

        this. isTooltipVisible = true;
      },
      handleMouseLeave() {
        this. isTooltipVisible = false;
      }
    }
    // You can emit an event with updated settings to the parent component if needed
  };
  </script>
  
<style scoped>
  .settings-panel {
    padding: 20px;
    max-width: 250px;
    min-width: 250px;
    font-family: 'Sohne', sans-serif;
    position: relative;
  }
  .setting {
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    margin-bottom: 20px;
    font-family: 'Sohne', sans-serif; 
  }

  .input-group{
    display: flex;
    justify-content: space-between;
    width:100%;
    line-height: 15px;
  }
  .setting label{
    font-family: 'Sohne', sans-serif;
  }
  .setting input[type=number] {
    align-self: flex-end;
    width: 56px;
    padding: 4px 5px 3px;
    text-align: right;
    font-variant: tabular-nums;
    background: transparent; 
    border: 1px solid transparent;
    box-sizing: border-box; 
    -moz-appearance: textfield; 
  }
  .setting:hover input[type=number] {
    border: 1px solid #c5c5d2;
    border-radius: 8px;
    font-weight: 400;
    margin: 0;
    /* transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out; */
  } 

  .setting #model {
    width: 100%; 
    border-radius: 8px; 
    padding: 4px;
    margin-top: 10px; 
    border: 1px solid #c5c5d2; 
    -webkit-appearance: none; 
    -moz-appearance: none; 
    appearance: none; 
    background-color: white; 
    cursor: pointer;
  }

  .setting #model:focus {
    outline: none; /* Removes the default focus outline */
    border-color: #a0a0a5; /* Optional: changes border color on focus for better visibility */
  }
  .setting input[type=range] {
    margin-top: 6px;
    -webkit-appearance: none; /* For WebKit browsers */
    width: 100%; /* Full-width */
    background: transparent; /* Remove default background */
  }
  /* Styles for the slider thumb (the part you drag) */
  .setting input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.2rem; /* Adjust as needed */
    height: 1.2rem; /* Adjust as needed */
    background: #FFFFFF; /* Light gray color */
    border: 2px solid #BFBFBF;
    cursor: pointer; /* Makes it clear the thumb is draggable */
    border-radius: 50%; /* Circular thumb */
    box-sizing: border-box;
    margin-top: -5px;
  }

  /* Styles for the slider track (the background of the slider) */
  .setting input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.5rem; /* Adjust as needed */
    background: #D3D3D3; /* Lighter gray color for the track */
    border-radius: 4px; /* Slightly rounded corners for the track */
  }

  /* Firefox styles for the thumb */
  .setting input[type=range]::-moz-range-thumb {
    width: 20px; /* Adjust as needed */
    height: 20px; /* Adjust as needed */
    background: #BFBFBF;
    cursor: pointer;
    border-radius: 50%;
  }

  /* Firefox styles for the track */
  .setting input[type=range]::-moz-range-track {
    width: 100%;
    height: 8px; /* Adjust as needed */
    background: #D3D3D3;
    border-radius: 4px;
  }

  /* Styles for the thumb in IE & Edge */
  .setting input[type=range]::-ms-thumb {
    width: 20px; /* Adjust as needed */
    height: 20px; /* Adjust as needed */
    background: #BFBFBF;
    cursor: pointer;
    border-radius: 50%;
  }

  /* Styles for the track in IE & Edge */
  .setting input[type=range]::-ms-track {
    width: 100%;
    height: 8px; /* Adjust as needed */
    background: #D3D3D3;
    border-radius: 4px;
  }

  /* Additional styles for IE & Edge to remove default track background */
  .setting input[type=range]::-ms-fill-lower,
  .setting input[type=range]::-ms-fill-upper {
    background: transparent;
  }
</style>
  