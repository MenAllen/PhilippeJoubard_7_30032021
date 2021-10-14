<template>
	<div id="app">
		<div id="message">Bienvenue sur votre réseau social !</div>
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
	position: absolute;
	top: 500px; left: 40px;
	color: white;
}
</style>
