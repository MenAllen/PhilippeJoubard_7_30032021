<template>
	<div id="app">
		<div class="container" style="text-align: left" id="message">
			<p>Bienvenue sur votre réseau social !</p>
		</div>
		<router-view />
	</div>
</template>

<script>
export default {
	data() {
		return {
			text: "PrimeVue",
		};
	},
};
</script>

<style lang="scss">
body { 
	display: block;
	background: url("./assets/photo2.jpg") no-repeat center center;
	min-height: 100vh;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	-o-background-size: cover;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #3f3d56;
}

#message {
	position: sticky;
	z-index: 100;
	color: white;
	top: 600px;
	margin-left: 0;
}
</style>
