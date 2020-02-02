import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//TODO: add time travel to go back to specific moveset

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: [
						null,
						null,
						null,
						null,
						null,
						null,
						null,
						null,
						null
					]
				}
			],
			xIsNext: true
		};
	}

	//handles the click event for the squares
	handleClick(i) {
		const history = this.state.history;
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState({
			history: history.concat({ squares: squares }),
			xIsNext: !this.state.xIsNext
		});
	}

	render() {
		const history = this.state.history;
		const current = history[history.length - 1];
		const winner = calculateWinner(current.squares);

		const moveHistory = history.map((step, moveNumber) => {
			const description = moveNumber
				? "Go to move#: " + moveNumber
				: "Go to game start";

			return (
				<li key={moveNumber}>
					<button onClick={() => this.jumpTo(moveNumber)}>
						{description}
					</button>
				</li>
			);
		});

		let status;
		if (winner) {
			status = `Winner: ${winner}`;
		} else {
			status = `Next Player: ${this.state.xIsNext ? "X" : "O"}`;
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={i => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moveHistory}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < winConditions.length; i++) {
		const [a, b, c] = winConditions[i];
		if (squares[a] === squares[b] && squares[b] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
