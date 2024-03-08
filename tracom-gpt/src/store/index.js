import { createStore } from 'vuex';
import prompts from '@/data/prompts.json';

export default createStore({
  state() {
    return {
      userPrompt: '',
      defaultPrompts: {
        useEmbeddings: prompts.useEmbeddings.join("\n"),
        noEmbeddings:  prompts.noEmbeddings.join("\n"),
      },
      currentSettings: {
        model: 'gpt-4-turbo-preview',
        temperature: 1,
        maxTokens: 4096,
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
