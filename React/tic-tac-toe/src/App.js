import { useState } from "react";


function Square({ value, onSquareClick }) {
    return (<button className="square" onClick={onSquareClick}>{value}</button>)
}
function Board({ xIsNext, sqaures, onPlay }) {
    const isDraw = sqaures.includes(null)?false:true;

    const handleClick = (i) => {
        if(calculateWinner(sqaures) || sqaures[i] || isDraw)
        {
            return 
        }
        const nextSqaure = sqaures.slice();
        if(xIsNext){
            nextSqaure[i] = 'X'
        }else{
            nextSqaure[i]='O'
        }
        onPlay(nextSqaure)
    }

    const winner = calculateWinner(sqaures);
    let status;
    if (winner) {
        status = `Winner is ${winner}`
    }else if(isDraw){
        status = "Draw"
    } else {
        status = `Next Player: ${xIsNext ? 'X' : 'O'}`
    }



    return (
        <>
            <div className="status">{status} </div>

            <div className="board-row">
                <Square value={sqaures[0]} onSquareClick={()=>handleClick(0)}></Square>
                <Square value={sqaures[1]} onSquareClick={()=>handleClick(1)}></Square>
                <Square value={sqaures[2]} onSquareClick={()=>handleClick(2)}></Square>
            </div>
            <div className="board-row">
                <Square value={sqaures[3]} onSquareClick={()=>handleClick(3)}></Square>
                <Square value={sqaures[4]} onSquareClick={()=>handleClick(4)}></Square>
                <Square value={sqaures[5]} onSquareClick={()=>handleClick(5)}></Square>
            </div>
            <div className="board-row">
                <Square value={sqaures[6]} onSquareClick={()=>handleClick(6)}></Square>
                <Square value={sqaures[7]} onSquareClick={()=>handleClick(7)}></Square>
                <Square value={sqaures[8]} onSquareClick={()=>handleClick(8)}></Square>
            </div>
        </>
    )
}

function Game({ }) {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSqaure = history[currentMove];
    const xIsNext = currentMove % 2 == 0;

    const handlePlay = (sqaure)=>{
        const nextHistory = [...history.slice(0, currentMove+1), sqaure];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
    }
    const jumpTo = (move)=>{
        setCurrentMove(move);
    }

    const moves = history.map((square, move)=>{
        let description ;
        if(move>0){
            description = 'Go to move #'+move
        }else{
            description = 'Go to game start'
        }
        return(
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <>
            <div className="game-board">
                <Board sqaures={currentSqaure} xIsNext={xIsNext} onPlay={handlePlay} />

            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </>
    )
}


export default function App() {

    return (<div className="game">
        <Game />
    </div>)
}


function calculateWinner(sqaures) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (sqaures[a] && sqaures[a] === sqaures[b] && sqaures[a] === sqaures[c]) {
            return sqaures[a]
        }
    }
    return null;
}