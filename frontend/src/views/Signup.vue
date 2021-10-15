<template>
	<Header />
	<div class="container">
		<div class="row">
			<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
				<div class="card border-0 shadow rounded-3 my-5">
					<div class="card-body p-4 p-sm-5">
						<h5 class="card-title text-center mb-5 fw-light fs-5">S'inscrire</h5>
						<form @submit.prevent="signup">
							<div class="form-floating mb-3">
								<input type="text" v-model="username" minlength="1" class="form-control" id="floatingInput1" placeholder="Username" required />
								<label for="floatingInput1">Username</label>
							</div>
							<div class="form-floating mb-3">
								<input type="email" v-model="email" class="form-control" id="floatingInput2" placeholder="name@example.com" required />
								<label for="floatingInput2">Email address</label>
							</div>
							<div class="form-floating mb-3">
								<input type="password" v-model="password" minlength="8" class="form-control" id="floatingPassword" placeholder="Password" autocomplete="off" required />
								<label for="floatingPassword">Password</label>
							</div>

							<div class="form-check mb-3">
								<input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
								<label class="form-check-label" for="rememberPasswordCheck"> Mémoriser le password </label>
							</div>
							<div class="d-grid">
								<button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Valider</button>
							</div>
							<hr class="my-2" />
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Header from "../components/Header.vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default {
	name: "Signup",
	components: {
		Header,
	},
	data() {
		return {
			username: "",
			email: "",
			password: "",
		};
	},
	created() {
		this.notyf = new Notyf({
			position: {
				x: 'center',
				y: 'top'
			}
		});
  },
	methods: {
		// Création d'un nouvel user dans la base
    signup() {
      axios.post('http://localhost:3000/api/user/signup', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .then(() => {
				alert('Votre compte a bien été créé')
				this.$router.push({ path: "/login" });
      })
      .catch(err => {
        this.notyf.error("Erreur Signup " + err.response.status);
				window.location.reload()
      })
		},
	},
};
</script>

<style scoped lang="scss"></style>
