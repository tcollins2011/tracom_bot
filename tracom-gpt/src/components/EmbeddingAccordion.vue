<template>
  <div class="embedding-accordion">
    <div class="accordion-toggle" @click="toggleAccordion" :aria-expanded="isOpen.toString()">
      <span>Expand Embedding</span>
    </div>
    <div v-if="isOpen" class="accordion-content" ref="pdfContainer">
    </div>
  </div>
</template>


<script>
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';

export default {
  name: 'EmbeddingAccordion',
  props: {
    embedding: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {
    GlobalWorkerOptions.workerSrc = process.env.BASE_URL + 'pdf.worker.min.mjs';
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.loadAndRenderPDF();
      }
    },
    async loadAndRenderPDF() {
      const baseUrl = process.env.VUE_APP_API_BASE_URL; 
      const url = `${baseUrl}/pdf/${this.embedding.file}`;
      const pdf = await getDocument(url).promise;

      // Reference to the container where canvases will be appended
      const container = this.$refs.pdfContainer;

      // Clear the container before rendering new pages
      container.innerHTML = '';

      for (let pageNum = this.embedding.startPage; pageNum <= this.embedding.endPage; pageNum++) {
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page-canvas';
        const context = canvas.getContext('2d');

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.0 });

        // Adjust the size of the canvas to the viewport dimensions
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Append the rendered canvas to the container
        container.appendChild(canvas);
      }
    },
  },
};
</script>


<style scoped>
  .embedding-accordion {
    width: 100%; 
    margin-top: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
    border-radius: 4px; 
  }

  .accordion-toggle {
    cursor: pointer;
    padding: 0.2rem;
    background-color: #f0f0f0; 
    border-bottom: 1px solid #ccc;
    width: 100%; 
    height: 10px; 
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .accordion-toggle::after {
    border-bottom: 2px solid #333; 
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg); 
    transition: transform 0.3s ease; 
  }

  .accordion-toggle span {
    font-family: 'Sohne', sans-serif;
    font-size: clamp(12px, 1.5vh, 14px);  
  }

  .accordion-toggle:hover {
    background-color: #f0f0f0; 
  }

  .accordion-content {
    overflow-y: auto;
    max-height: 400px;
  }

  .accordion-content div {
    padding: 0.2rem 0; 
  }

  .pdf-viewer {
    max-height: 500px; 
    overflow: auto;
    background-color: #fff; 
  }
</style>


