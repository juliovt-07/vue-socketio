<template>
	<div class="counter">
		<h1 v-html="value" />
		<button
			@click.prevent="increment()"
			v-html="'Incrementar'"
			style="font-size: 1.25em"
		/>
	</div>
</template>

<script>
export default {
	name: 'Counter',
	data() {
		return {
			value: 0
		}
	},
	methods: {
		/*
		 * 💥 Emita o evento increment_counter para o servidor socket.
		 */
		increment() {
			this.$socket.client.emit('increment_counter')
		}
	},
	sockets: {
		/*
		 * 👂 Ouça os eventos emitidos pelo servidor socket.
		 */
		update_counter(value) {
			this.value = value
		}
	}
}
</script>

<style scoped>
.counter {
	width: 100%;
	margin-top: 32px;
	padding-top: 32px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
