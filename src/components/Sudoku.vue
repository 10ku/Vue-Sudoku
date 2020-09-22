<template>
<div id="sudoku">
	<div class="grid-container">
		<div class="grid-item" @click="clearHighlight()"></div>
		<div class="grid-item">
			<p class="title" @click="clearHighlight()">Sudoku</p>
			<table @keyup.esc="clearHighlight()" @keyup="cellInput($event)" tabindex="0">
				<tr v-for="(array, yIndex) in sudoku" :key=array.id :class="(yIndex % 3 === 0) ? 'horizontalBorder' : null">
					<td v-for="(value, xIndex) in array" :key=value.id @click="highlightSelection($event)" :id="'x' + xIndex + 'y' + yIndex" :class="(xIndex % 3 === 0) ? 'verticalBorder' : null">{{value !== 0 ? value : null}}</td>
				</tr>
			</table>
			<button @click="createSudokuBoard()">Generate Sudoku</button>
			<button @click="checkSudokuBoard()">Check Sudoku</button>
			<button @click="giveSolution()">Give Solution</button>
			<button @click="printSudokuBoard()">Print Sudoku To Console</button>
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
	/* sudoku: number[][] = [[0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,3,0,8,5],
						[0,0,1,0,2,0,0,0,0],
						[0,0,0,5,0,7,0,0,0],
						[0,0,4,0,0,0,1,0,0],
						[0,9,0,0,0,0,0,0,0],
						[5,0,0,0,0,0,0,7,3],
						[0,0,2,0,1,0,0,0,0],
						[0,0,0,0,4,0,0,0,9]]; */

	/* sudoku: number[][] = [[2,0,9,6,1,7,0,8,0],
						[0,0,0,0,2,0,9,0,1],
						[0,1,6,4,0,0,2,0,3],
						[0,0,0,3,5,4,0,9,8],
						[7,0,4,0,0,8,0,5,0],
						[8,0,0,0,9,0,1,4,0],
						[0,0,5,2,7,6,0,3,0],
						[3,6,7,0,0,0,0,0,5],
						[0,4,0,8,0,5,0,1,7]]; */

	initialSudoku: number[][] = [];
	sudoku: number[][] = [];
	solvedSudoku: number[][] = [];
	gridService = new GridService(this.initialSudoku, this.sudoku, this.solvedSudoku)

	created()
	{
		this.gridService.initGrids();
	}

	private createSudokuBoard()
	{
		this.gridService.createSudokuBoard();
		this.clearUnderline();
	}

	private checkSudokuBoard()
	{
		if (this.isSudokuUndefined())
		{
			return;
		}

		this.addColoredUnderlineToEditableCells();
	}

	private giveSolution()
	{
		if (this.isSudokuUndefined())
		{
			return;
		}

		this.gridService.solveSudokuBoard();
		this.clearUnderline();
		this.addColoredUnderlineToEditableCells();
	}

	private printSudokuBoard()
	{
		console.log(this.initialSudoku.flat().toString());
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
	
	private clearUnderline()
	{
		const numElements = document.getElementsByTagName("td").length;

		for (let i = 0; i < numElements; i++)
		{
			document.getElementsByTagName("td")[i].classList.remove("playerNumber", "playerNumberCorrect", "playerNumberWrong");
		}
	}

	private cellInput(event: KeyboardEvent)
	{
		const selectedElement = document.getElementsByClassName("highlight")[0];
		const selectedElementId = selectedElement.id;
		const selectedX = Number(selectedElementId.charAt(1));
		const selectedY = Number(selectedElementId.charAt(3));
		const chosenNumber = Number(event.key.charAt(0));

		if (this.isSudokuUndefined())
		{
			return;
		}

		if (Number.isInteger(chosenNumber) === true && this.initialSudoku[selectedY][selectedX] === 0)
		{
			this.sudoku[selectedY].splice(selectedX, 1, Number(event.key.charAt(0)));
			selectedElement.classList.add("playerNumber");
			selectedElement.classList.remove("playerNumberCorrect", "playerNumberWrong");
		}
	}

	private isSudokuUndefined(): boolean
	{
		return this.initialSudoku[0] === undefined;
	}

	private addColoredUnderlineToEditableCells()
	{
		let currElement: Element;

		for (let y = 0; y < 9; y++)
		{
			for (let x = 0; x < 9; x++)
			{
				if (this.initialSudoku[y][x] === 0 && this.sudoku[y][x] !== 0)
				{
					if (this.sudoku[y][x] === this.solvedSudoku[y][x])
					{
						currElement = document.getElementById("x" + x + "y" + y) as Element;
						currElement.classList.add("playerNumber", "playerNumberCorrect");
					}
					else
					{
						currElement = document.getElementById("x" + x + "y" + y) as Element;
						currElement.classList.add("playerNumber", "playerNumberWrong");
					}
				}
			}
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
}
tr.horizontalBorder
{
	border-top: 4px solid black;
}
td.verticalBorder
{
	border-left: 4px solid black;
}
td.playerNumber
{
	text-decoration-line: underline;
}
td.playerNumberCorrect
{
	text-decoration-color: blue;
}
td.playerNumberWrong
{
	text-decoration-color: red;
	text-decoration-style: wavy;
}
td.highlight
{
	background-color: steelblue;
}
td.additionalHighlight
{
	background-color: lightsteelblue;
}
</style>