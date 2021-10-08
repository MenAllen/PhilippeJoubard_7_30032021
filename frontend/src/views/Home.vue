<template>
	<Header />
	<div class="container-fluid d-bloc content"></div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
	name: "Home",
	components: {
		Header,
	},
};
</script>

<style scoped lang="scss">
.content {
	padding-top: 275px;
	padding-bottom: 275px;
}
</style>
