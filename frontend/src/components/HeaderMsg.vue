<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="#"><img src="../assets/iconLong452.png" alt="logo groupomania"/></a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav align-items-start mr-auto">
				<li class="nav-item">
					<a class="nav-link" href="#"
						><router-link to="/message"><Button label="Messages"></Button></router-link
					></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"
						><router-link to="/profil"><Button label="Mon Profil"></Button></router-link
					></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"
						><router-link to="/message"><Button data-bs-toggle="modal" data-bs-target="#staticBackdrop" label="Se déconnecter"></Button></router-link></a>
				</li>
			</ul>
		</div>
	</nav>

	<!-- Modal -->
	<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Déconnexion demandée</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					Etes-vous de vouloir vous déconnecter ?
				</div>
				<div class="modal-footer">
					<router-link to="/"><button type="button" v-on:click="disconnect()" class="btn btn-secondary" data-bs-dismiss="modal">Oui</button></router-link
					>
					<button type="button" class="btn btn-success" data-bs-dismiss="modal">Non</button>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
    export default {
        name: 'HeaderMsg',
        methods: {
            disconnect() {
                // Déconnection
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.removeItem('isAdmin');
                
                this.$router.push('http://localhost:8080/');
            }
        }
    }
</script>