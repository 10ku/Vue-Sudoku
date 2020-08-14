<template>
<div id="sudoku">
	<p class="title">Sudoku</p>
	<table>
		<tr v-for="(array, index) in grid" :key=array.id :class="(index == 2 || index == 5) ? 'boldGridVert' : ''">
			<td v-for="(value, index) in array" :key=value.id :class="(index == 2 || index == 5) ? 'boldGridHor' : ''">{{value ? value : ''}}</td>
		</tr>
	</table>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import Grid from 'src/components/Grid.vue'

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
	// mynewclass = new Grid();

	created()
	{
		for(let i = 0; i < 9; i++)
		{
			this.grid.push([]);
			for(let j = 0; j < 9; j++)
			{
				this.grid[i].push(0);
			}
		}
		this.createGrid(this.grid);
	}

	private createGrid(grid: number[][])
	{
		// this.grid[1].splice(1,1,21)
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
td.boldGridHor
{
	border-right: 4px solid black;
}
tr
{
	border-left: 4px solid black;
	border-right: 4px solid black;
}
tr.boldGridVert
{
	border-bottom: 4px solid black;
}
</style>
