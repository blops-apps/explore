<template>
  <div id="upload-area">
    <div class="container">
      <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input type="file" multiple name="csvField" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
          <p>
            Drag some CSV on me!
          </p>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: 'app',
  methods: {

    getAsText(fileToRead) {
      var reader = new FileReader();
      reader.onload = this.loadHandler;
      reader.onerror = this.errorHandler;
      reader.readAsText(fileToRead);
    },

    loadHandler(event) {
      var csv = event.target.result;
      this.$store.dispatch('setTableData', csv);
    },

    errorHandler(evt) {
      if(evt.target.error.name == "NotReadableError") {
        alert("Cannot read file !");
      }
    },

    filesChange(fieldName, fileList) {
      const formData = new FormData();

      if (!fileList.length) return;
      this.getAsText(fileList[0])

    }
  },
  mounted() {
  },
}

</script>
<style>
.dropbox {
  outline-offset: -10px;
  background: #EEE;
  color: #444;
  padding: 10px 10px;
  min-height: 150px; 
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 150px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #FFF;
  transition-timing-function: ease-in; 
  transition: all 1s;

}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
