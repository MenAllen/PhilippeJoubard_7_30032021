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
				<li class="nav-item active">
					<a class="nav-link" href="#"><Button label="Accueil"></Button><span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"
						><router-link to="/login"><Button label="Se connecter"></Button></router-link
					></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"
						><router-link to="/signup"><Button label="S'inscrire"></Button></router-link
					></a>
				</li>
			</ul>
		</div>
	</nav>
</template>
