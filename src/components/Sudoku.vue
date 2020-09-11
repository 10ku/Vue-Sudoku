<template>
<div id="sudoku">
	<div class="grid-container">
		<div class="grid-item" @click="clearHighlight()"></div>
		<div class="grid-item">
			<p class="title" @click="clearHighlight()">Sudoku</p>
			<table>
				<tr v-for="(array, yIndex) in grid" :key=array.id :class="(yIndex % 3 === 0) ? 'boldGridHor' : null">
					<td v-for="(value, xIndex) in array" :key=value.id @click="highlightSelection($event)" :id="'x' + xIndex + 'y' + yIndex" :class="(xIndex % 3 === 0) ? 'boldGridVert' : null">{{value !== 0 ? value : null}}</td>
				</tr>
			</table>
			<!-- <button @click="testHor3Button()">testHor3Button</button> -->
			<!-- <button @click="testVert2Button()">testVert2Button</button> -->
			<!-- <button @click="testSquare55Button()">testSquare55Button</button> -->
			<button @click="createSudokuBoard()">createSudokuBoard</button>
			<button @click="printSudokuBoard()">printSudokuBoard</button>
			<!-- <button @click="testCheckAllForValue()">testCheckAllForValue</button> -->
			<!-- <button @click="testGetShuffledArray()">testGetShuffledArray</button> -->
		</div>
		<div class="grid-item" @click="clearHighlight()"></div>
	</div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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

	/* grid: number[][] = [[5,3,4,6,7,8,9,1,2],
						[6,7,2,1,9,5,3,4,8],
						[1,9,8,3,4,2,5,6,7],
						[8,5,9,7,6,1,4,2,3],
						[4,2,6,8,5,3,7,9,1],
						[7,1,3,9,2,4,8,5,6],
						[9,6,1,5,3,7,2,8,4],
						[2,8,7,4,1,9,6,3,5],
						[3,4,5,2,8,6,1,7,9]]; */

	/* grid: number[][] = [[5,3,4,6,7,8,9,1,2],
						[6,7,2,1,9,5,3,4,8],
						[1,9,8,3,4,2,5,6,7],
						[8,5,9,7,6,1,4,2,3],
						[4,2,6,8,5,3,7,9,1],
						[7,1,3,9,0,4,8,5,6],
						[9,6,1,5,3,7,2,8,4],
						[2,8,7,4,1,9,6,3,5],
						[3,4,5,2,0,0,1,7,0]]; */

	grid: number[][] = [];
	gridService = new GridService(this.grid)

	created()
	{
		this.gridService.initBoard();
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
	private createSudokuBoard()
	{
		this.gridService.createSudokuBoard();
	}
	private printSudokuBoard()
	{
		console.log(this.grid.flat().toString());
	}
	/* private testGetShuffledArray()
	{
		console.log(this.gridService.getShuffledArray().toString());
	} */
	private testCheckAllForValue()
	{
		console.log(this.gridService.checkAllForValue(3, 0, 4));
		// console.log(this.grid.flat().indexOf(0));
	}

	private highlightSelection(event: Event)
	{
		const selectedElement = event.target as Element;
		let currElement: Element;
		const selectedElementId = selectedElement.id;
		const selectedX = selectedElementId.charAt(1);
		const selectedY = selectedElementId.charAt(3);

		this.clearHighlight();
		
		for (let i = 0; i < 9; i++)
		{
			currElement = document.getElementById("x" + i + "y" + selectedY) as Element;
			currElement.classList.add("additionalHighlight");
		}
		
		for (let i = 0; i < 9; i++)
		{
			currElement = document.getElementById("x" + selectedX + "y" + i) as Element;
			currElement.classList.add("additionalHighlight");
		}

		console.log(selectedElement.id);
		selectedElement.classList.remove("additionalHighlight");
		selectedElement.classList.add("highlight");
	}

	private clearHighlight()
	{
		const numElements = document.getElementsByTagName("td").length;

		for (let i = 0; i < numElements; i++)
		{
			document.getElementsByTagName("td")[i].classList.remove("highlight", "additionalHighlight");
		}
	}
}
</script>

<style scoped>
div.grid-container
{
  display: grid;
  grid-template-columns: 30% auto 30%;
}
div.grid-item
{
  font-size: 32px;
  text-align: center;
}
p.title
{
	text-align: center;
	font-size: 60px;
}
table
{
	border-collapse: collapse;
	border: 4px solid black;
	width: 100%;
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
	border-top: 4px solid black;
}
td.highlight
{
	background-color: steelblue;
}
td.additionalHighlight
{
	background-color: lightsteelblue;
}
td.boldGridVert
{
	border-left: 4px solid black;
}
</style>
