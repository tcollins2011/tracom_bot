<!-- src/components/ModelSettings.vue -->
<template>
    <div class="settings-panel">
      <div class="setting">
        <label for="model">Model:</label>
        <select v-model="settings.model" id="model">
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-4-turbo-preview">gpt-4-turbo-preview</option>
          <!-- Add other models as needed -->
        </select>
      </div>
      
      <div class="setting" v-for="setting in settingsList" :key="setting.name">
        <label :for="setting.name">{{ setting.label }}</label>
        <input :type="setting.type" v-model.number="settings[setting.name]" :id="setting.name" :min="setting.min" :max="setting.max" :step="setting.step">
        <input type="range" v-model="settings[setting.name]" :min="setting.min" :max="setting.max" :step="setting.step">
      </div>

    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        settings: {
          model: 'gpt-3.5-turbo',
          temperature: 1,
          maxTokens: 256,
          topP: 1,
          frequencyPenalty: 0,
          presencePenalty: 0,
        },
        settingsList: [
            { name: 'temperature', label: 'Temperature:', type: 'number', min: 0, max: 2, step: 0.01 },
            { name: 'maxTokens', label: 'Max Tokens:', type: 'number', min: 1, max: 4096, step: 1 },
            { name: 'topP', label: 'Top P:', type: 'number', min: 0, max: 1, step: 0.01 },
            { name: 'frequencyPenalty', label: 'Frequency Penalty:', type: 'number', min: 0, max: 2, step: 0.01 },
            { name: 'presencePenalty', label: 'Presence Penalty:', type: 'number', min: 0, max: 2, step: 0.01 },
        ]
      };
    },
    // You can emit an event with updated settings to the parent component if needed
  };
  </script>
  
  <style scoped>
  .settings-panel {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .setting {
    margin-bottom: 20px; /* Space between settings */
  }

  .setting label{
    font-weight: bold;
    margin-right: 5px;
  }

  .setting input[type=range] {
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
  