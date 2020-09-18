export default class GridService
{
	initialArray2d: number[][] = [];
	array2d: number[][] = [];
	filledArray2d: number[][] = [];

	constructor(initialArray2d: number[][], array2d: number[][], filledArray2d: number[][])
	{
		this.initialArray2d = initialArray2d;
		this.array2d = array2d;
		this.filledArray2d = filledArray2d;
	}

	initBoard()
	{
		for (let y = 0; y < 9; y++)
		{
			this.initialArray2d.push([]);
			this.array2d.push([]);
			this.filledArray2d.push([]);
			for (let x = 0; x < 9; x++)
			{
				this.initialArray2d[y].push(0);
				this.array2d[y].push(0);
				this.filledArray2d[y].push(0);
			}
		}
	}

	zeroBoard()
	{
		for (let y = 0; y < 9; y++)
		{
			for (let x = 0; x < 9; x++)
			{
				this.array2d[y].splice(x, 1, 0);
			}
		}
	}

	checkHorizontalOfIndex(y: number): boolean
	{
		return this.isArrayUnique(this.array2d[y])
	}

	checkVerticalOfIndex(x: number): boolean
	{
		const array: number[] = [];

		for (let y = 0; y < 9; y++)
		{
			array.push(this.array2d[y][x]);
		}

		// console.log(array.toString());
		return this.isArrayUnique(array);
	}

	checkSquareOfIndex(x: number, y: number): boolean
	{
		const xRoot = x - (x % 3);
		let xRootIndex = xRoot;
		let yRoot = y - (y % 3);
		const array: number[] = [];

		for (let y = 0; y < 3; y++)
		{
			for (let x = 0; x < 3; x++)
			{
				array.push(this.array2d[yRoot][xRootIndex]);
				xRootIndex++;
			}
			xRootIndex = xRoot;
			yRoot++;
		}

		// console.log(array.toString());
		return this.isArrayUnique(array);
	}

	checkAllForValue(x: number, y: number, n: number): boolean
	{
		let isValid = false;

		this.array2d[y].splice(x, 1, n);

		if ((this.checkHorizontalOfIndex(y) === false) || (this.checkVerticalOfIndex(x) === false) || (this.checkSquareOfIndex(x, y) === false))
		{
			isValid = false;
		}
		else
		{
			isValid = true;
		}

		this.array2d[y].splice(x, 1, 0);
		return isValid;
	}

	private isArrayUnique(array: number[]): boolean
	{
		const filteredArray = array.filter(value => value !== 0);
		return new Set(filteredArray).size === filteredArray.length;
	}

	createSudokuBoard()
	{
		this.zeroBoard();
		this.fillSquaresDiagonally();
		this.fillRemaining();
		// this.removeCells(52);
		// this.removeCells(49);
		this.copyArray(this.filledArray2d, this.array2d);
		this.removeCells(45);
		this.copyArray(this.initialArray2d, this.array2d);
	}

	solveSudokuBoard()
	{
		this.copyArray(this.array2d, this.filledArray2d);
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
					this.array2d[yIndex].splice(xIndex, 1, array.pop() as number);
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
				if (this.array2d[y][x] === 0)
				{
					shuffledArray = this.getShuffledArray();
					for (let i = 1; i <= 9; i++)
					{
						poppedElement = shuffledArray.pop() as number;
						if (this.checkAllForValue(x, y, poppedElement))
						{
							this.array2d[y].splice(x, 1, poppedElement);
							this.fillRemaining()
							if(this.array2d.flat().indexOf(0) === -1)
							{
								return;
							}
						}
					}
					this.array2d[y].splice(x, 1, 0);
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

			if (this.array2d[y][x] !== 0)
			{
				// console.log(Number(this.array2d[y].splice(x, 1, 0).toString()));
				oldNum = Number(this.array2d[y].splice(x, 1, 0));
				// this.array2d[8-y].splice(8-x, 1, 0);
				// removed += 2;
				for (let i = 1; i <= 9; i++)
				{
					if (this.checkAllForValue(x, y, i))
					{
						checks++;
					}
				}
				if (checks > 1)
				{
					this.array2d[y].splice(x, 1, oldNum);
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
				// console.log(iterations);
				this.createSudokuBoard();
				return;
			}
		}
		// console.log(iterations);
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

	copyArray(arrayTo: number[][], arrayFrom: number[][])
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