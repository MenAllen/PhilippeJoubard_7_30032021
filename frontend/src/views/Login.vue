<template>
	<Header />
	<div class="container">
		<div class="row">
			<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
				<div class="card border-0 shadow rounded-3 my-5">
					<div class="card-body p-4 p-sm-5">
						<h5 class="card-title text-center mb-5 fw-light fs-5">Se connecter</h5>
						<form @submit.prevent="login">
							<div class="form-floating mb-3">
								<input type="email" v-model="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
								<label for="floatingInput">Email address</label>
							</div>
							<div class="form-floating mb-3">
								<input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password" autocomplete="off" />
								<label for="floatingPassword">Password</label>
							</div>

							<div class="form-check mb-3">
								<input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
								<label class="form-check-label" for="rememberPasswordCheck"> Mémoriser le password </label>
							</div>
							<div class="d-grid">
								<button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Valider</button>
							</div>
							<hr class="my-8" />
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
	name: "Home",
	components: {
		Header,
	},
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		// Connection et récupération des infos dans localStorage
		login() {
			fetch("http://localhost:3000/api/user/login", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ email: this.email, password: this.password }),
			})
				.then(response => response.json())
				.then((data) => {
					console.log(data);
					localStorage.setItem("token", data.token);
					localStorage.setItem("userId", data.userId);
					localStorage.setItem("username", data.name);
					localStorage.setItem("isAdmin", data.isAdmin);
					this.$router.push({ path: "/message" });
					}
				)
				.catch((error) => console.log(error))
		},
	},
};
</script>

<style scoped></style>
