<template>
    <Textbox
      title="How to use this Sandbox"
      content="This sandbox is meant to simulate what the user experience would be in Social Style Navigator. Please enter in a question below."
    />
    <div class="home-chatBot">
      <chatBot :modelSettings="currentSettings" :systemMessage="activePrompt"/>
    </div>
    
</template>
  
<script>
  import { mapGetters, mapState } from 'vuex'
  import Textbox from '../components/TextBoxSection.vue'
  import chatBot from '../components/ChatBot.vue'
  
  export default {
    name: 'Home-page',
    components: {
      Textbox,
      chatBot,
    },
    computed: {
      ...mapState(['currentSettings']), 
      ...mapGetters(['activePrompt']),
    },
  }
</script>

<style scoped>

.home-chatBot{
  height: 70vh;
  width: 60%;
  margin: 0 auto;
}

</style>