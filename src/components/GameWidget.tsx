import React from "react";
// import LineCanvas from "./LineCanvas.tsx";

import './GameWidget.scss'

function GameWidget() {

    const [gameBoard, setGameBoard] = React.useState<string[][] | Boolean[][]>([[false, false, false], [false, false, false], [false, false, false]]);
    const [currentPlayer, setCurrentPlayer] = React.useState<string>("X");
    const [isWinner, setIsWinner] = React.useState<Boolean>(false);
    const [isDraw, setIsDraw] = React.useState<Boolean>(false);
    // const [linePoints, setLinePoints] = React.useState<{ x: number, y: number }[]>([])

    function createGameBoard(): JSX.Element {
        const boardTiles = gameBoard.map((column: string[] | Boolean[], columnIndex: number) => {
            return column.map((tile: string | Boolean, rowIndex: number) => {


                return (
                    <div className={`tile ${typeof tile === 'string' ? tile : ""}`} key={columnIndex + rowIndex} onClick={() => handleTileClick(columnIndex, rowIndex)}>
                        {typeof tile === 'string' ? tile : ""}
                    </div>
                )
            })
        })

        return (
            <div className="board">
                {boardTiles}
                {/* <LineCanvas linePoints={linePoints}/> */}
            </div>
        );
    }

    function handleTileClick(columnIndex: number, rowIndex: number) {
        if (isWinner || isDraw || typeof gameBoard[columnIndex][rowIndex] === 'string') {
            return;
        }

        let newGameBoard = gameBoard
        newGameBoard[columnIndex][rowIndex] = currentPlayer
        setGameBoard(newGameBoard)

        if (checkDraw()) {
            setIsDraw(true)
            console.log("Draw")
        } else if (checkWinConditions()) {
            setIsWinner(true)
            console.log(`Winner is ${currentPlayer}`)
        } else {
            setIsWinner(false)
            toggleCurrentPlayer()
        }
    }

    function toggleCurrentPlayer(): void {
        if (currentPlayer === "X") {
            setCurrentPlayer("O")
        } else {
            setCurrentPlayer("X")
        }
    }

    function checkWinConditions(): boolean {
        return checkHorizontalWin() ||
            checkVerticalWin() ||
            checkDiagonalWin()
    }

    function checkHorizontalWin(): boolean {
        const result = gameBoard.map((column: string[] | Boolean[]) => {
            if (column.every((tile: string | Boolean) => tile === currentPlayer)) {
                return true
            } else {
                return false
            }
        })

        return result.includes(true)
    }
    function checkVerticalWin(): boolean {
        const result = gameBoard.map((column: string[] | Boolean[], columnIndex: number) => {
            if (column.every((_, rowIndex: number) => gameBoard[rowIndex][columnIndex] === currentPlayer)) {
                return true
            } else {
                return false
            }
        })

        return result.includes(true)
    }
    function checkDiagonalWin(): boolean {
        const diagonalRows = [
            [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
            [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]
        ]

        const result = diagonalRows.map((row: (string | Boolean)[]) => {
            if (row.every((tile: string | Boolean) => tile === currentPlayer)) {
                return true
            } else {
                return false
            }
        })

        return result.includes(true)
    }

    function checkDraw(): boolean {
        return gameBoard.every((column: string[] | Boolean[]) => {
            return column.every((tile: string | Boolean) => {
                return typeof tile === 'string'
            })
        })
    }

    function currentGameState(): JSX.Element {
        if (isWinner) {
            return <p>Winner is {currentPlayer}</p>
        } else if (isDraw) {
            return <p>Draw</p>
        } else {
            return <p>Current player: {currentPlayer}</p>
        }
    }



    return (
        <div>
            <h1>Game Widget</h1>
            {currentGameState()}
            {createGameBoard()}
        </div>
    );
}



export default GameWidget;