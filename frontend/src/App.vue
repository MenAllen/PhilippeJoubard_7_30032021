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
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #3f3d56;

	background: url("./assets/photo2.jpg") repeat center center;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	-o-background-size: cover;
}

#message {
	position: sticky;
	z-index: 100;
	top: 600px;
	color: white;
	margin-left: 0;
}
</style>
