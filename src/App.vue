<template>
	<div id="app">
		<Sudoku></Sudoku>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sudoku from './components/Sudoku.vue';

@Component({
	components:
	{
		Sudoku,
	},
})
export default class App extends Vue {}
</script>