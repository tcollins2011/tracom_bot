<template>
    <Textbox
      title="About our Project"
      content="ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante metus dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a erat nam"
    />
    <div class="home-chatBot">
      <chatBot :modelSettings="defaultSettings"/>
    </div>
    
</template>
  
<script>
  import Textbox from '../components/TextBoxSection.vue'
  import chatBot from '../components/ChatBot.vue'
  
  export default {
    name: 'Home-page',
    components: {
      Textbox,
      chatBot,
    },
    data() {
      return {
        defaultSettings: {
          model: 'gpt-4-turbo-preview',
          temperature: 1,
          maxTokens: 4096,
          topP: 1,
          frequencyPenalty: 0,
          presencePenalty: 0,
        }
      }
    }
  }
</script>

<style scoped>

.home-chatBot{
  height: 70vh;
  width: 60%;
  margin: 0 auto;
}

</style>