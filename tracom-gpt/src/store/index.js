import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      userPrompt: '',
      defaultPrompts: {
        useEmbeddings: `You are a helpful AI assistant who is very knowledgable about Social Style. Use the following pieces of context to help answer the question at the end. If you don't know the answer, just say you don't know. DO NOT try to make up an answer. If the question is not related to the context or Social Style, politely respond that you can only answer questions about Social Styles.
        
SOCIAL STYLE® can be written in all capital letters or as Social Style®. When used in the plural, it is written as SOCIAL STYLEs.
‘Style’ when used alone requires a capital “S” only.
SOCIAL STYLE requires a registered trademark (®) in the first instance.
Never refer to the Styles as Drivings, Expressives, Amiables and Analyticals.  Always refer to them as Driving Style, Expressive Style, Amiable Style, and Analytical Style.
SOCIAL STYLE Model requires a trademark (™) in the first instance.
The Creator of SOCIAL STYLE® requires a registered trademark (®).
        ` 
        ,
        noEmbeddings: "You are a helpful AI assistant who is very knowledgable about Tracom. If you don't know the answer, just say that you don't know.. DO NOT try to make up an answer.",
        
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
