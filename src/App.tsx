
import './App.css';
import { Client } from 'boardgame.io/react';
import { Calvinball, CBGameState } from './calvinball';
import { CalvinBoard } from './board';
//import { ClientOpts } from 'boardgame.io/client';

const App = Client<CBGameState>( { 
	game: Calvinball,
	board: CalvinBoard,
} );

export default App;
