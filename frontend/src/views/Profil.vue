<template>
	<HeaderMsg/>
 

	<!-- ==============================================
	Affichage Profil unique
	=============================================== -->

	<div class="container cta-100 ">
    <div class="container">
      <div class="row blog">
        <div class="col-md-12">

          <div class="carousel-item active">
            <div class="row justify-content-center">

              <div class="col-md-4" >
                <div class="item-box-blog">
                  <div class="item-box-blog-image">
                    <!--Date-->
                    <div class="item-box-blog-date bg-blue-ui white">
                      <span class="mon">{{ user.name }}</span>
                     </div>
                    <!--Image-->
                    <figure>
                      <img alt="" src="../assets/avatar-neutre.jpg">
                    </figure>
                  </div>
                  <div class="item-box-blog-body">
                    <!--Heading-->
                    <div class="item-box-blog-heading">
                      <h5 class="text-light">{{ user.email }}</h5>
                      <h6 class="text-light">{{ formatDateTime(user.createdAt) }}</h6>
                    </div>
                    <!--Data-->
                    <div class="item-box-blog-data" style="padding: px 15px;">
                      <p v-if="isAdmin == 'true'">Administrateur</p>
                    </div>
                    <div class="mt"> 
                      <a data-bs-toggle="modal" data-bs-target="#staticBackdrop2" href="#" tabindex="0" class="btn bg-blue-ui white read">Supprimer le profil</a>
                    </div>
                    <!--Read More Button-->
                  </div>
                </div>
              </div>

						</div>
					</div>

				</div>
			</div>
		</div>
	</div><!-- container cta-100 -->

	<!-- Modal -->
	<div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Suppression demandée</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					Etes-vous de vouloir supprimer ce profil ?
				</div>
				<div class="modal-footer">
					<router-link to="/"><button type="button" v-on:click="removeProfil()" class="btn btn-secondary" data-bs-dismiss="modal">Oui</button></router-link
					>
					<button type="button" class="btn btn-success" data-bs-dismiss="modal">Non</button>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import axios from 'axios'
import HeaderMsg from '../components/HeaderMsg.vue'
import moment from 'moment'
import { Notyf } from "notyf"
import "notyf/notyf.min.css"


export default {

	name: 'Profil',
	components: {
		HeaderMsg,
	},

	data(){
		return {
			user: "",
		}
	},

  created() {
    this.displayProfil();
    this.notyf = new Notyf({
			position: {
				x: 'center',
				y: 'top'
			}
		});
	},

	methods: {
		// Affiche le profil du user courant
		displayProfil() {
      const id = localStorage.getItem('userId');

      axios.get('http://localhost:3000/api/user/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        this.user = response.data;
      })

      .catch(err => {
        this.notyf.error("Erreur Display " + err.response.status + " " + err.response.statusText);
        window.location.reload();
      })
    },

    // Affiche le profil de tous les users
    displayAllProfil() {

      axios.get('http://localhost:3000/api/user/', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        this.results= response.data.results;
        console.log(response.data.results);
      })
      .catch(err => {
        this.notyf.error("Erreur Display " + err.response.status + " " + err.response.statusText);
				window.location.reload();
      })
    },

    // Formatte la date de publication
    formatDateTime(date){
      if (date) {   
        return moment(String(date)).format('DD/MM/YYYY hh:mm')
      }
    },

    // Supprime le profil du user
    removeProfil(){
      const id = localStorage.getItem('userId');

      axios.delete('http://localhost:3000/api/user/' + id, {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(() => {
        alert('Votre compte a bien été supprimé')
        localStorage.clear();
        this.$router.push('/');
      })

      .catch(err => {
        this.notyf.error("Erreur Display " + err.response.status + " " + err.response.statusText);
				window.location.reload();
      })
    }		
  }
}
</script>

<style scoped lang="scss">



.cta-100 {
  margin-top: 20px;
  padding-top: 7%;
}
.col-md-4{
    padding-bottom:20px;
}

.white {
  color: #fff !important;
}
.mt{float: left;margin-top: -20px;padding-top: 20px;}
.bg-blue-ui {
  background-color: #708198 !important;
}
figure img{width:300px;}

#blogCarousel {
  padding-bottom: 100px;
}

.blog .carousel-indicators {
  left: 0;
  top: -50px;
  height: 50%;
}


/* The colour of the indicators */

.blog .carousel-indicators li {
  background: #708198;
  border-radius: 50%;
  width: 8px;
  height: 8px;
}

.blog .carousel-indicators .active {
  background: #0fc9af;
}




.item-carousel-blog-block {
  outline: medium none;
  padding: 15px;
}

.item-box-blog {
  border: 1px solid #dadada;
  text-align: center;
  z-index: 4;
  padding: 20px;
	min-width: 250px;
}

.item-box-blog-image {
  position: relative;
}

.item-box-blog-image figure img {
  width: 100%;
  height: auto;
}

.item-box-blog-date {
  position: absolute;
  z-index: 5;
  padding: 4px 20px;
  top: -20px;
  right: 8px;
  background-color: #41cb52;
}

.item-box-blog-date span {
  color: #fff;
  display: block;
  text-align: center;
  line-height: 1.2;
}

.item-box-blog-date span.mon {
  font-size: 18px;
}

.item-box-blog-date span.day {
  font-size: 16px;
}

.item-box-blog-body {
  padding: 10px;
}

.item-heading-blog a h5 {
  margin: 0;
  line-height: 1;
  text-decoration:none;
  transition: color 0.3s;
}

.item-box-blog-heading a {
    text-decoration: none;
}

.item-box-blog-data p {
  font-size: 13px;
}

.item-box-blog-data p i {
  font-size: 12px;
}

.item-box-blog-text {
  max-height: 100px;
  overflow: hidden;
}

.mt-10 {
  float: left;
  margin-top: -10px;
  padding-top: 10px;
}

.btn.bg-blue-ui.white.read {
  cursor: pointer;
  padding: 4px 20px;
  float: left;
  margin-top: 10px;
}

.btn.bg-blue-ui.white.read:hover {
  box-shadow: 0px 5px 15px inset #4d5f77;
}

</style>