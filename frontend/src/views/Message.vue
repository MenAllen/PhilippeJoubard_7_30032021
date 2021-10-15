<template>  
    <HeaderMsg />
    <PubliMsg />

	<link href="https://fonts.googleapis.com/css?family=Rokkitt" rel="stylesheet"> 
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	
	<!-- =======================================================
	Affichage Messages et Commentaires - Publication Commentaires
	========================================================== -->
    
    <div v-for="result in results" :key="result.id">
    
        <section class="hero">
            <div class="container">
                <div class="row">	

                    <div class="col-lg-6 offset-lg-3">
			
                        <div class="cardbox shadow-lg bg-white">
	
                            <div class="cardbox-heading">

                                <div class="dropdown float-right">
                                    <button class="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
                                      <em class="fa fa-ellipsis-h"></em>
                                    </button>
                                     <div v-if="userId == result.UserId || isAdmin == 'true'" class="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" style="position: absolute; transform: translate3d(-136px, 28px, 0px); top: 0px; left: 0px; will-change: transform;">
                                        <a style="cursor: pointer" v-if="userId == result.UserId || isAdmin == 'true'" v-on:click="deleteMsg(result.id)" class="dropdown-item">Supprimer le message</a>
                                    </div>
                                </div><!--/ dropdown -->

                                <div class="media m-0">
                                    <div class="d-flex mr-3">
                                        <img class="img-fluid rounded-circle" src="../assets/avatar-neutre.jpg" alt="User">
                                    </div>
                                    <div class="media-body col-4 border">
                                        <h5 class="m-0" style="overflow-wrap: break-word;">{{ result.message }}</h5>
                                        <span><i class="icon ion-md-pin"></i>{{ result.User.name }}</span>
                                        <span><i class="icon ion-md-time mx-2">{{ formatDateTime(result.createdAt) }}</i></span>
                                    </div>
                                </div><!--/ media -->
                            </div><!--/ cardbox-heading -->
	
                            <div class="cardbox-item m-2">
                                <img class="img-fluid" :src="result.imageUrl" alt="Image">
                            </div><!--/ cardbox-item -->

                            <form @submit.prevent="displayComment(result.id)" aria-label="Nouveau commentaire">        
                                <button type="submit" class="p-button p-component" aria-label="Publier le message">Voir les commentaires</button>
                            </form>

                            <div v-for="comment in comments" :key="comment.id"><!-- Afficher Commentaires existants -->
                                <div v-bind:toggleComment="toggleComment" v-if="toggleComment && result.id == comment.MessageId">

                                    <div class="media my-1 mx-3">

                                        <div class="d-flex mr-3">
                                            <img class="img-fluid rounded-circle" src="../assets/avatar-neutre.jpg" alt="User">
                                        </div>
                                        <div class="media-body col-4 border">
                                            <h5 class="m-0" style="overflow-wrap: break-word;">{{ comment.comment }}</h5>
                                            <span><i class="icon ion-md-pin">{{ comment.User.name }}</i></span>
                                            <span><i class="icon ion-md-time mx-2">{{ formatDateTime(comment.createdAt) }}</i></span>
                                        </div>
                                        <div class="dropdown float-right">
                                            <button class="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
                                                <em class="fa fa-ellipsis-h"></em>
                                            </button>
                                            <div v-if="userId == comment.UserId || isAdmin == 'true'" class="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" style="position: absolute; transform: translate3d(-136px, 28px, 0px); top: 0px; left: 0px; will-change: transform;">
                                                <a style="cursor: pointer" v-if="userId == comment.UserId || isAdmin == 'true'" v-on:click="deleteComment(comment.id)" class="dropdown-item">Supprimer le commentaire</a>
                                            </div>
                                        </div><!--/ dropdown -->

                                    </div><!--/ Commentaires existants -->
                                </div>
                            </div>

                            <form @submit.prevent="createComment(result.id)" aria-label="Nouveau commentaire"> 

                                <div class="card-body w-80">
                                    <Textarea v-model="newComment" :autoResize="true" class="form-control m-2" rows="3" placeholder="Votre commentaire" minlength="5" maxlength="255" required />
                                    <button type="submit" class="p-button p-component" aria-label="Publier le message">Publier</button>       
                                </div>

                            </form>
				
                        </div><!--/ cardbox -->

                    </div><!--/ col-lg-6 -->	
			
                </div><!--/ row -->
            </div><!--/ container -->
        </section>
    </div>

    <router-view/>

</template>



<script>  
import axios from 'axios'
import HeaderMsg from '../components/HeaderMsg.vue'
import PubliMsg from '../components/PubliMsg.vue'
import Textarea from 'primevue/textarea';
import moment from 'moment'
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default {
    name: 'Message',
    components: {
        HeaderMsg,
        PubliMsg,
        Textarea,
    },
    data() {
        return {
            userId: localStorage.getItem('userId'),
            name: localStorage.getItem('name'),
            isAdmin: localStorage.getItem('isAdmin'),
            results: [],
            result: '',
            imageUrl: '',
            content: '',
            toggleComment: false,
            comments: [],
            newComment: '',
        }
    },

    created() {
        this.displayMsg();
        this.notyf = new Notyf({
            position: {
                x: 'center',
                y: 'top'
			}
		});

    },

    methods: {

        // Permet d'afficher tous les messages
        displayMsg() {
            axios.get('http://localhost:3000/api/message', {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => { 
                this.results= response.data.results;
            })
            .catch(err => {
                this.notyf.error("Erreur Display " + err.response.status + " " + err.response.statusText);
				window.location.reload();
            })
        },

        // Affiche les commentaires d'un message donné
        displayComment(id) {
            this.toggleComment = !this.toggleComment
               
            axios.get('http://localhost:3000/api/comment/' + id, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                this.comments = response.data;
            })
            .catch(err => {
                this.notyf.error("Erreur Display " + err.response.status + " " + err.response.statusText);
				window.location.reload();
            })
        },

        // Publie un nouveau commentaire
        createComment(id) {

            axios.post('http://localhost:3000/api/comment/' + id, {
                content: this.newComment,
            },{
                headers: {
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

        // Formatte la date de publication
        formatDateTime(dateValue){
            if (dateValue) {   
                return moment(String(dateValue)).format('DD/MM/YYYY hh:mm')
            }
        },

        // Supprime un message
        deleteMsg(id) {
               
            axios.delete('http://localhost:3000/api/message/' + id, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                this.displayMsg();
            })
            .catch(err => {
                this.notyf.error("Erreur Delete " + err.response.status + " " + err.response.statusText);
				window.location.reload();
            })
        },

        // Supprime un commentaire
        deleteComment(id) {

            axios.delete('http://localhost:3000/api/comment/' + id, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                window.location.reload()
            })
           .catch(err => {
                this.notyf.error("Erreur Delete " + err.response.status + " " + err.response.statusText);
				window.location.reload();
            })
        },
    },
}  
</script>


<style scoped lang="scss">

/*
*
* ===========================================================
*     HERO SECTION
* ===========================================================
*
*/
.hero {
  padding: 2rem 0px !important;
  margin: 0px !important;
}
.cardbox {
  border-radius: 3px;
  margin-bottom: 20px;
  padding: 0px !important;
}

/* ------------------------------- */
/* Cardbox Heading
---------------------------------- */
.cardbox .cardbox-heading {
  padding: 16px;
  margin: 0;
}
.cardbox .btn-flat.btn-flat-icon {
 border-radius: 50%;
 font-size: 24px;
 height: 32px;
 width: 32px;
 padding: 0;
 overflow: hidden;
 color: #fff !important;
 background: #b5b6b6;
 
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
}
.cardbox .float-right .dropdown-menu{
  position: relative;
  left: 13px !important;  
}
.cardbox .float-right a:hover{
  background: #f4f4f4 !important;	
}
.cardbox .float-right a.dropdown-item {
  display: block;
  width: 100%;
  padding: 4px 0px 4px 10px;
  clear: both;
  font-weight: 400;
  font-family: 'Abhaya Libre', serif;
  font-size: 14px !important;
  color: #848484;
  text-align: inherit;
  white-space: nowrap;
  background: 0 0;
  border: 0;
}

/* ------------------------------- */
/* Media Section
---------------------------------- */
.media {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
}
.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}
.media .mr-3{
  margin-right: 1rem !important;
}
.media img{
  width: 48px !important;
  height: 48px !important;
  padding: 2px;
  border: 2px solid #f4f4f4;
} 
.media-body {
  -ms-flex: 1;
  flex: 1;
  padding: .4rem !important;
  width: 80%;
}
.media-body p{
  font-family: 'Rokkitt', serif;	
  font-weight: 500 !important;
  font-size: 14px;
  color: #88898a;
}
.media-body small span{
  font-family: 'Rokkitt', serif;	
  font-size: 12px;
  color: #aaa;
  margin-right: 10px;
}


/* ------------------------------- */
/* Cardbox Item
---------------------------------- */
.cardbox .cardbox-item {
    position: relative;
    display: block;
}
.cardbox .cardbox-item img{
}
.img-responsive{
    display: block;
    max-width: 100%;
    height: auto;
}	
.fw {
    width: 100% !important;
	height: auto;
}


/* ------------------------------- */
/* Cardbox Base
---------------------------------- */
.cardbox-base{
 border-bottom: 2px solid #f4f4f4;
}	
.cardbox-base ul{
 margin: 10px 0px 10px 15px!important; 
 padding: 10px !important;
 font-size: 0px;	
  display: inline-block;
}
.cardbox-base li {
  list-style: none;
  margin: 0px 0px 0px -8px !important;
  padding: 0px 0px 0px 0px !important;
  display: inline-block;
}

.cardbox-base li a{
  margin: 0px !important;
  padding: 0px !important;
}
.cardbox-base li a i{
 position: relative;
 top: 4px; 
 font-size: 16px;
 color: #8d8d8d;
 margin-right: 15px;
}
.cardbox-base li a span{
 font-family: 'Rokkitt', serif;
 font-size: 14px;
 color: #8d8d8d;
 margin-left: 20px;
 position: relative;
 top: 5px; 
}
.cardbox-base li a em{
 font-family: 'Rokkitt', serif;
 font-size: 14px;
 color: #8d8d8d;
 position: relative;
 top: 3px; 
}
.cardbox-base li a img{
  width: 25px;
  height: 25px;
  margin: 0px !important;
  border: 2px solid #fff;
}


/* ------------------------------- */
/* Cardbox Comments
---------------------------------- */
.cardbox-comments{
  padding: 10px 0px 20px 0px !important;
  font-size: 0px;	
  text-align: center;
  display: inline-block;
}
.cardbox-comments .comment-avatar img{
  margin-top: 1px;
  margin-right: 10px;
  position: relative;
  display: inline-block;
  text-align: center;
  width: 40px;
  height: 40px;
}
.cardbox-comments .comment-body {
  overflow: auto;
}
.search {
 position: relative;
 right: 0px;
 top: 0px;
 margin-bottom: 0px;
 border: 2px solid #f4f4f4;	
 width: 100%;
 overflow: hidden;
}
.search input[type="text"] {
 background-color: #fff;
 line-height: 10px;
 padding: 15px 60px 20px 10px;
 border: none;
 border-radius: 4px;
 font-family: 'Rokkitt', serif;
 font-size: 14px;
 color: #8d8d8d;
 height: inherit;
 font-weight: 700;
}
.search button {
 position: absolute;
 right: 0;
 top: 0px;
 border: none;
 background-color: transparent;
 color: #bbbbbb;
 padding: 15px 25px;
 cursor: pointer;
 
 display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
}
.search button i {
 font-size: 20px;
 line-height: 30px;
 display: block;
}


/* ------------------------------- */
/* Author
---------------------------------- */
.author a{
 font-family: 'Rokkitt', serif;
 font-size: 16px;
 color: #00C4CF;
}
.author p{
 font-family: 'Rokkitt', serif;
 font-size: 16px;
 color: #8d8d8d;
}


</style>