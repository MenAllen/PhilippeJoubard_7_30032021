
<template>
	<!-- ==============================================
	Affichage Bloc de publication Message
	=============================================== -->

  <section class="hero">
    <div class="container">
      <div class="row">	
        <div class="col-lg-6 offset-lg-3">			
          <div class="cardbox shadow-lg bg-white">
            <div class="cardbox-heading">

              <form @submit.prevent="createMsg" aria-label="Nouveau message">        

                <div class="card-body w-100">
                  <h5 class="card-title">Votre message</h5>
                  <Textarea v-model="content" :autoResize="true" class="form-control" rows="4" minlength="5" maxlength="255" required />
                  <div id="preview" style="display:block">
                    <img v-if="imagePreview" :src="imagePreview" id="preview" style="display:block" class="uploadImage" alt="Image Prévisualisée"/>
                  </div>         
                </div>

                <div class="d-flex py-3 justify-content-around">
                  <Button label="Choisir une image" @click="uploadFile" />
                  <input type="file" ref="fileUpload" @change="onFileSelected" class="d-none" accept="image/*" aria-label="Sélectionner un fichier">
                  <button type="submit" class="p-button p-component" aria-label="Publier le message">Publier</button>
                </div>

              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>


<script>  
  import axios from 'axios'
  import Textarea from 'primevue/textarea';
  import { Notyf } from "notyf";
  import "notyf/notyf.min.css";

  export default {
    name: 'PubliMsg',
        components: {
        Textarea,
    },
    data() {
        return {
            imagePreview: null,
        }
    },
    created() {
        this.notyf = new Notyf();
    },
    methods: {

        uploadFile() {
            this.$refs.fileUpload.click()
        },

        onFileSelected(event) {
            this.imagePost = event.target.files[0];
            this.imagePreview = URL.createObjectURL(this.imagePost);
        }, 

        createMsg() {
            const formData = new FormData();
            formData.append("content", this.content);
            formData.append("image", this.imagePost);

            axios.post('http://localhost:3000/api/message', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                window.location.reload()
            })
            .catch(err => {
                this.notyf.error("Erreur Create " + err.response.status + " " + err.response.statusText);
                window.location.reload();
            })
        },
      }
  }
</script>

<style>

  .uploadImage {
      max-width: 50rem;
      width: 90%;
      height: 274px;
      margin: 1rem auto;
      object-fit: cover;
  }

</style>

