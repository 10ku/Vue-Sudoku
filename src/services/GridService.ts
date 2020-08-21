export default class GridService
{
	array2d: number[][] = [];

	constructor(array2d: number[][])
	{
		this.array2d = array2d;
	}

	checkHorizontalOfIndex(y: number): boolean
	{
		return this.isArrayUnique(this.array2d[y])
	}

	checkVerticalOfIndex(x: number): boolean
	{
		const array: number[] = [];

		for(let i = 0; i < 9; i++)
		{
			array.push(this.array2d[i][x]);
		}

		// console.log(array.toString());
		return this.isArrayUnique(array);
	}

	checkSquareOfIndex(x: number, y: number)
	{
		const xRoot = x - (x % 3);
		let xRootIndex = xRoot;
		let yRoot = y - (y % 3);
		const array: number[] = [];

		for(let i = 0; i < 3; i++)
		{
			for(let i = 0; i < 3; i++)
			{
				array.push(this.array2d[yRoot][xRootIndex]);
				xRootIndex++;
			}
			xRootIndex = xRoot;
			yRoot++;
		}

		console.log(array.toString());
		return this.isArrayUnique(array);
	}

	isArrayUnique(array: number[]): boolean
	{
		const filteredArray = array.filter(value => value !== 0);
		return new Set(filteredArray).size === filteredArray.length;
	}
}