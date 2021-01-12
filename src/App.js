import React, {useState, useEffect, useRef} from 'react';

import Chessboard from 'chessboardjsx';
import Chess from 'chess.js'

const container = {
  marginTop:'2rem',
  display: 'flex',
  justifyContent:'space-around',
  alignItens:'center',
}

function App() {

  const [fen, setFen] = useState("start")

  let game = useRef(null);

  useEffect(() => {
    game.current = new Chess();

  }, [])

  const onDrop = ({sourceSquare, targetSquare}) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare
    })
    if(move === null) return; //here to check for illegal moves


    //provide the fen string
    setFen(game.current.fen())


    console.log(move)
  }

  console.log(game);


  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setFen('start')
  }


  return (
    <div className="App" style={container}>
     
     {
       game.current && game.current.game_over() ? 
       <div style={{textAlign:'center'}}>
         <h1>Game Over bruh</h1>
         <button onClick={resetGame}>Play again</button>
       </div>
       :
       <span></span>
     }
      <Chessboard position={fen}
      onDrop={onDrop}
      ></Chessboard>
    </div>
  );
}

export default App;
