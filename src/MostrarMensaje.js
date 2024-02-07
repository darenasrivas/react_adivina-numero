// Cada componente lleva su css

import './MostrarMensaje.css'

// Recogemos 3 propiedades con props

function MostrarMensaje(props) {
  const { score, guessNumber, secretNumber } = props
  console.log('MostrarMensaje guessNumber', guessNumber, typeof guessNumber)
  console.log('MostrarMensaje secretNumber', secretNumber, typeof secretNumber)
  let parrafo = ''
  if (guessNumber === secretNumber) {
    parrafo = <p className="message">Número correcto!!!</p>
  } else if (score === 0) {
    parrafo = <p className="message">Has perdido!</p>
  } else if (score === 10 && guessNumber === '') {
    parrafo = <p className="message">Empieza a adivinar...</p>
  } else if (guessNumber > secretNumber) {
    parrafo = <p className="message">Te has pasado!</p>
  } else {
    parrafo = <p className="message">Te has quedado corto!</p>
  }

  return <>{parrafo}</>
}

export default MostrarMensaje
