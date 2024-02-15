import { useState } from "react"
import Message from "./Message"
import PropTypes from "prop-types"

const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {
  const [message, setMessage] = useState("")

  const handleBudget = (e) => {
    e.preventDefault()

    if (!budget || budget < 0) {
      setMessage("Presupuesto Inválido")
      return
    }
    setIsValidBudget(true)
    setMessage("")
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form className='formulario' onSubmit={handleBudget}>
        <div className='campo'>
          <label htmlFor=''>Definir Presupuesto</label>
          <input
            className='nuevo-presupuesto'
            type='number'
            placeholder='Añade tu presupuesto'
            value={budget}
            onChange={(e) => {
              setBudget(Number(e.target.value))
            }}
          />
          <input type='submit' value='añadir' />
          {message && <Message tipo='error'>{message}</Message>}
        </div>
      </form>
    </div>
  )
}

NewBudget.propTypes = {
  budget: PropTypes.number.isRequired,
  setBudget: PropTypes.func.isRequired,
  setIsValidBudget: PropTypes.func.isRequired,
}

export default NewBudget
