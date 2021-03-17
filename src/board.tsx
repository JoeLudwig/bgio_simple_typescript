import { Ctx, State } from 'boardgame.io';
import { BoardProps } from 'boardgame.io/react';
import React from 'react';
import { CBGameState } from './calvinball';

interface CalvinBoardProps extends BoardProps<CBGameState>
{
	moves: any;
}

export class CalvinBoard extends React.Component< CalvinBoardProps > 
{
	onClick( id: number ) 
	{
		this.props.moves.clickCell( id );
	}

	render() 
	{
		let winner: JSX.Element = <div/>;
		if ( this.props.ctx.gameover ) 
		{
			winner =
				this.props.ctx.gameover.winner !== undefined ? (
					<div id="winner">Winner: { this.props.ctx.gameover.winner }</div>
				) : (
					<div id="winner">Draw!</div>
				);
		}

		const cellStyle: React.CSSProperties = 
		{
			border: '1px solid #555',
			width: '50px',
			height: '50px',
			lineHeight: '50px',
			textAlign: 'center',
		};

		let tbody = [];
		for (let i = 0; i < 3; i++) {
			let cells = [];
			for (let j = 0; j < 3; j++) {
				const id = 3 * i + j;
				cells.push(
					<td style={ cellStyle } key={ id } onClick={ () => this.onClick(id) }>
						{ this.props.G.cells[id] }
					</td>
				);
			}
			tbody.push(<tr key={i}>{cells}</tr>);
		}

		return (
			<div>
				<table id="board">
					<tbody>{ tbody }</tbody>
				</table>
				{ winner }
			</div>
		);
	}
}