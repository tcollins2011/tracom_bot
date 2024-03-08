import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      userPrompt: '',
      defaultPrompts: {
        useEmbeddings: 'Default prompt for setting A.',
        noEmbeddings: 'Default prompt for setting B.',
        
      },
      currentSettings: {
        model: 'gpt-3.5-turbo',
        temperature: 1,
        maxTokens: 256,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
        chatEnabled: false,
        embeddingsEnabled: true,
      },
    };
  },
  getters: {
    activePrompt: (state) => {
      return state.userPrompt.trim() !== ''
        ? state.userPrompt
        : state.currentSettings.embeddingsEnabled
          ? state.defaultPrompts.useEmbeddings
          : state.defaultPrompts.noEmbeddings;
    },
  },
  mutations: {
    updateUserPrompt(state, newPrompt) {
      state.userPrompt = newPrompt;
    },
    updateSettings(state, newSettings) {
      state.currentSettings = { ...state.currentSettings, ...newSettings };
    }, 
  }, 
});
