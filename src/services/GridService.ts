export default class GridService
{
	initialGrid: number[][] = [];
	grid: number[][] = [];
	filledGrid: number[][] = [];

	constructor(initialGrid: number[][], grid: number[][], filledGrid: number[][])
	{
		this.initialGrid = initialGrid;
		this.grid = grid;
		this.filledGrid = filledGrid;
	}

	initGrids()
	{
		for (let y = 0; y < 9; y++)
		{
			this.initialGrid.push([]);
			this.grid.push([]);
			this.filledGrid.push([]);
			for (let x = 0; x < 9; x++)
			{
				this.initialGrid[y].push(0);
				this.grid[y].push(0);
				this.filledGrid[y].push(0);
			}
		}
	}

	createSudokuBoard()
	{
		this.zeroGrid();
		this.fillSquaresDiagonally();
		this.fillRemaining();
		this.copyGrid(this.filledGrid, this.grid);
		this.removeCells(45);
		this.copyGrid(this.initialGrid, this.grid);
	}

	solveSudokuBoard()
	{
		this.copyGrid(this.grid, this.filledGrid);
	}

	private zeroGrid()
	{
		for (let y = 0; y < 9; y++)
		{
			for (let x = 0; x < 9; x++)
			{
				this.grid[y].splice(x, 1, 0);
			}
		}
	}

	private fillSquaresDiagonally()
	{
		let xIndex = 0;
		let xRoot = 0;
		let yIndex = 0;
		let done = false;

		while (!done)
		{
			const array = this.getShuffledArray();
			
			for (let y = 0; y < 3; y++)
			{
				xIndex = xRoot;
				for (let x = 0; x < 3; x++)
				{
					this.grid[yIndex].splice(xIndex, 1, array.pop() as number);
					xIndex++;
				}
				yIndex++;
			}
			xRoot += 3;

			if (yIndex === 9)
			{
				done = true
			}
		}
	}

	private fillRemaining()
	{
		let shuffledArray: number[] = [];
		let poppedElement = 0;

		for (let y = 0; y < 9; y++)
		{
			for (let x = 0; x < 9; x++)
			{
				if (this.grid[y][x] === 0)
				{
					shuffledArray = this.getShuffledArray();
					for (let i = 1; i <= 9; i++)
					{
						poppedElement = shuffledArray.pop() as number;
						if (this.checkAllForValue(x, y, poppedElement))
						{
							this.grid[y].splice(x, 1, poppedElement);
							this.fillRemaining()
							if(this.grid.flat().indexOf(0) === -1)
							{
								return;
							}
						}
					}
					this.grid[y].splice(x, 1, 0);
					return;
				}
			}
		}
	}

	private removeCells(n: number)
	{
		let x = 0;
		let y = 0;
		let removed = 0;
		let checks = 0;
		let oldNum = 0;
		let iterations = 0;

		while (removed != n)
		{
			x = Math.floor(Math.random() * 9);
			y = Math.floor(Math.random() * 9);

			if (this.grid[y][x] !== 0)
			{
				oldNum = Number(this.grid[y].splice(x, 1, 0));
				for (let i = 1; i <= 9; i++)
				{
					if (this.checkAllForValue(x, y, i))
					{
						checks++;
					}
				}
				if (checks > 1)
				{
					this.grid[y].splice(x, 1, oldNum);
				}
				else
				{
					removed++;
				}
				checks = 0;
			}
			iterations++;

			if (iterations === 500)
			{
				this.createSudokuBoard();
				return;
			}
		}
	}

	private checkHorizontalOfIndex(y: number): boolean
	{
		return this.isArrayUnique(this.grid[y])
	}

	private checkVerticalOfIndex(x: number): boolean
	{
		const array: number[] = [];

		for (let y = 0; y < 9; y++)
		{
			array.push(this.grid[y][x]);
		}

		return this.isArrayUnique(array);
	}

	private checkSquareOfIndex(x: number, y: number): boolean
	{
		const xRoot = x - (x % 3);
		let xRootIndex = xRoot;
		let yRoot = y - (y % 3);
		const array: number[] = [];

		for (let y = 0; y < 3; y++)
		{
			for (let x = 0; x < 3; x++)
			{
				array.push(this.grid[yRoot][xRootIndex]);
				xRootIndex++;
			}
			xRootIndex = xRoot;
			yRoot++;
		}

		return this.isArrayUnique(array);
	}

	private checkAllForValue(x: number, y: number, n: number): boolean
	{
		let isValid = false;

		this.grid[y].splice(x, 1, n);

		if ((this.checkHorizontalOfIndex(y) === false) || (this.checkVerticalOfIndex(x) === false) || (this.checkSquareOfIndex(x, y) === false))
		{
			isValid = false;
		}
		else
		{
			isValid = true;
		}

		this.grid[y].splice(x, 1, 0);
		return isValid;
	}

	private getShuffledArray(): number[]
	{
		const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		//Fisher–Yates shuffle
		for (let i = array.length - 1; i > 0; i--)
		{
			const j = Math.floor(Math.random() * (i + 1))
			const temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}

		return array;
	}

	private isArrayUnique(array: number[]): boolean
	{
		const filteredArray = array.filter(value => value !== 0);
		return new Set(filteredArray).size === filteredArray.length;
	}

	private copyGrid(arrayTo: number[][], arrayFrom: number[][])
	{
		for (let y = 0; y < 9; y++)
		{
			for (let x = 0; x < 9; x++)
			{
				arrayTo[y].splice(x, 1, arrayFrom[y][x]);
			}
		}
	}
}