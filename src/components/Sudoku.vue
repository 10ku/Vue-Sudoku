<template>
<div id="sudoku">
	<p class="title">Sudoku</p>
	<table>
		<tr v-for="array in board" :key=array.id>
			<td v-for="value in array" :key=value.id>{{value}}</td>
		</tr>
	</table>
	<button @click="editBoard">Press</button>
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
			// this.board[i] = [];
			this.board.push([]);
			for(let j = 0; j < 9; j++)
			{
				// this.board[i][j] = k++;
				this.board[i].push(k++);
			}
		}
	}

	editBoard()
	{
		this.$set(this.board[0], 0, 5)
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
	border: 1px solid black;
	text-align: center;
	padding: 18px;
	font-size: 32px;
	/* color: dodgerblue; */
}
</style>
