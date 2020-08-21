<template>
<div id="sudoku">
	<p class="title">Sudoku</p>
	<table>
		<tr v-for="(array, index) in grid" :key=array.id :class="(index === 2 || index === 5) ? 'boldGridHor' : null">
			<td v-for="(value, index) in array" :key=value.id :class="(index === 2 || index === 5) ? 'boldGridVert' : null">{{value ? value : null}}</td>
		</tr>
	</table>
	<button @click="testHor3Button()">testHor3Button</button>
	<button @click="testVert2Button()">testVert2Button</button>
	<button @click="testSquare55Button()">testSquare55Button</button>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GridService from '../services/GridService';

@Component
export default class Sudoku extends Vue
{
	//Rico Alan Sudoku
	/* grid: number[][] = [[0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,3,0,8,5],
						[0,0,1,0,2,0,0,0,0],
						[0,0,0,5,0,7,0,0,0],
						[0,0,4,0,0,0,1,0,0],
						[0,9,0,0,0,0,0,0,0],
						[5,0,0,0,0,0,0,7,3],
						[0,0,2,0,1,0,0,0,0],
						[0,0,0,0,4,0,0,0,9]]; */

	grid: number[][] = [];
	gridService = new GridService(this.grid)
	

	created()
	{
		for(let i = 0; i < 9; i++)
		{
			this.grid.push([]);
			for(let j = 0; j < 9; j++)
			{
				// this.grid[i].push(0);
				this.grid[i].push(Math.floor(Math.random() * 9) + 1);
			}
		}
	}

	private testHor3Button()
	{
		console.log(this.gridService.checkHorizontalOfIndex(3));
	}
	private testVert2Button()
	{
		console.log(this.gridService.checkVerticalOfIndex(2));
	}
	private testSquare55Button()
	{
		console.log(this.gridService.checkSquareOfIndex(8, 6));
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
	max-width: 16px;
	height: 38px;
	width: 16px;
	/* color: dodgerblue; */
}
tr.boldGridHor
{
	border-bottom: 4px solid black;
}
tr
{
	border-left: 4px solid black;
	border-right: 4px solid black;
}
td.boldGridVert
{
	border-right: 4px solid black;
}
</style>
