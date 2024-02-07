// Importamos el css, pero podría ir aquí puesto también
import './App.css'

// FUncion que importamos de REact. Devuelve dos valores, el valor de la variable y la funcion para modificarla.
// score y setScore
// Definimos variables de estado que cambian con useState
// Con useRef, recogemos valor del usuario. No podemos hacerlo con querySelector...
// Existe un useEffect, que se utiliza para efectos colaterales. Que cuando recibas datos pase algo
import { useState, useRef, useEffect } from 'react'
import MostrarMensaje from './MostrarMensaje'

//Otro react hook. useRef

// Le damos una función que genera número aleatorio
const randomNumber = () => Math.trunc(Math.random() * 20) + 1
// Valor inicial de score
const INITIAL_SCORE = 10

// **** EMPIEZA FUNCIÓN ****

// LA función App
function App() {
  // FUncion que importamos de REact. Devuelve dos valores, el valor de la variable y la funcion para modificarla.
  // score y setScore
  // Definimos variables de estado que cambian
  // Devuelve dos valores, variable y funcion que puede modificar la variable. Entre parentesis el estado inicial.
  // Para modificar una variable de estado, solo podemos hacerlo atraves de la funcion propia
  const [score, setScore] = useState(INITIAL_SCORE)
  const [guessNumber, setGuessNumber] = useState('')
  const [secretNumber, setSecretNumber] = useState(randomNumber())
  const [highScore, setHighScore] = useState(0)

  // Referencia que no tenemos en principio (null), que luego al poner un número la tomaremos.
  const inputRef = useRef(null)

  // FUncion que utilizamos en el boton. Y quita 1 del score.
  // Al utilizar la variable de estado, con el Hook, repintará el html. Pero no se sejecuta el useState. Mantiene el valor.
  // Con ello, nos ahorramos la actualizacion del DOM y no hace falta el addEventListener (React gestiona el evento)
  const handleCheck = () => {
    // Tomamos el numero que introduce el usuario (ver arriba)
    setGuessNumber(Number(inputRef.current.value))
  }

  // UseEffect recibe un parametro, que es una funcion que queremos que se ejecute, cuando queremos que pase algo.
  // Una vez recibimos el numero de arriba, que haga este useEffect

  useEffect(() => {
    if (guessNumber === '') return
    if (guessNumber === secretNumber) {
      if (score > highScore) {
        setHighScore(score)
      }
    } else {
      if (score > 1) {
        setScore(score - 1)
      } else {
        setScore(0)
      }
    }
  }, [guessNumber])

  // Función que resetea el juego. Y poner el valor del score y genera nuevo numero.
  const handleReset = () => {
    setScore(INITIAL_SCORE)
    setSecretNumber(randomNumber())
    setGuessNumber('')
  }

  // Esta funcion devuelve el HTML al navegador.

  return (
    // Elemento vacío para que recoja un solo elemento. React solo puede devolver un elemento.
    <>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn again" onClick={handleReset}>
          Again!
        </button>
        <div className="number">{secretNumber}</div>
      </header>
      <main>
        <section className="left">
          <input type="number" className="guess" ref={inputRef} />
          <button className="btn check" onClick={handleCheck}>
            Check!
          </button>
        </section>
        <section className="right">
          <MostrarMensaje
            guessNumber={guessNumber}
            secretNumber={secretNumber}
            score={score}
          />
          <p className="label-score">
            💯 Score: <span className="score">{score}</span>
          </p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">{highScore}</span>
          </p>
        </section>
      </main>
    </>
  )
}

// **** ACABA FUNCIÓN ****

// Exportamos el App
export default App
