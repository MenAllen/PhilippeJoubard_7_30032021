<template>
	<div id="app">
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

	background: url("./assets/photo2.jpg") no-repeat center center;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	-o-background-size: cover;
}
</style>
