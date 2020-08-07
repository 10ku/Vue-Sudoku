<template>
<div id="sudoku">
	<p class="title">Sudoku</p>
	<table>
		<tr v-for="array in board" :key=array.id>
			<td v-for="value in array" :key=value.id>{{value}}</td>
		</tr>
	</table>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Sudoku extends Vue
{
	board: number[][] = [];

	created()
	{
		let k = 0;
		for(let i = 0; i < 9; i++)
		{
			this.board[i] = [];
			for(let j = 0; j < 9; j++)
			{
				this.board[i][j] = k++;
			}
		}
	}
}
</script>

<style scoped>
p.title
{
	text-align: center;
	font-size: 60px;
}
table
{
	border-collapse: collapse;
	width: 50%;
	margin-left: auto;
	margin-right: auto;
}
td
{
	border: 1px solid;
	text-align: center;
	padding: 18px;
}
</style>
