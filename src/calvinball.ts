import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

export interface CBGameState
{
	cells: (string|null)[];
}

function moveClickCell( g: CBGameState, ctx: Ctx, id: number )
{
	if ( g.cells[id] !== null ) 
	{
		return INVALID_MOVE;
	}

	g.cells[ id ] = ctx.currentPlayer;
}

// Return true if `cells` is in a winning configuration.
function IsVictory(cells: ( string | null )[] )
{
	const positions: [number, number, number][] = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
		[1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
	];
  
	const isRowComplete = ( row: [ number, number, number ] ) => 
	{
		const symbols = row.map(i => cells[i]);
		return symbols.every(i => i !== null && i === symbols[0]);
	};
  
	return positions.map(isRowComplete).some(i => i === true);
}
  
// Return true if all `cells` are occupied.
function IsDraw( cells: ( string | null )[] ) 
{
	return cells.filter(c => c === null).length === 0;
}

export const Calvinball =
{
	setup: (): CBGameState =>
	{
		return { cells: Array(9).fill(null) };
	},

	moves:
	{
		clickCell: moveClickCell,
	},
	
	turn: 
	{
		moveLimit: 1,
	},

	endIf: (g: CBGameState, ctx: Ctx ) => 
	{
		if ( IsVictory( g.cells ) ) 
		{
			return { winner: ctx.currentPlayer };
		}

		if ( IsDraw( g.cells ) ) 
		{
			return { draw: true };
		}
	},
	
}

