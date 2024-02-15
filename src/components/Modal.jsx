import propTypes from "prop-types"
import { useState, useEffect } from "react"
import Message from "./Message"
import CloseButton from "../img/icons/cerrar.svg"
import categories from "../constants/categories"

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  saveExpense,
  expenseEdit,
  setExpenseEdit,
}) => {
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [id, setId] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
      setName(expenseEdit.name)
      setAmount(expenseEdit.amount)
      setCategory(expenseEdit.category)
      setId(expenseEdit.id)
      setDate(expenseEdit.date)
    }
  }, [expenseEdit])

  const closeModal = () => {
    setAnimarModal(false)
    setExpenseEdit({})

    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([name, amount, category].includes("")) {
      setMessage("Todos los campos son obligatorios")

      setTimeout(() => {
        setMessage("")
      }, 3000)
      return
    }
    saveExpense({ name, amount, category, id, date })
  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={CloseButton} alt='Close Button' onClick={closeModal} />
      </div>
      <form className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
        <legend>{expenseEdit.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        <div className='campo'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            type='text'
            id='nombre'
            placeholder='ej. Flores'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>

        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input
            type='number'
            id='cantidad'
            placeholder='ej. 1500'
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value))
            }}
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categoria</label>
          <select
            id='categoria'
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
          >
            <option value='select'>Selecciona una categoría...</option>
            {Object.entries(categories).map((category, i) => {
              return (
                <option key={`category-option-${i}`} value={category[0]}>
                  {category[1]}
                </option>
              )
            })}
          </select>
          {message && (
            <Message
              tipo='error'
              style={{
                backgroundColor: "transparent",
                color: "red",
                padding: "16px",
              }}
            >
              {message}
            </Message>
          )}
          <input
            type='submit'
            value={expenseEdit.name ? "Guardar" : "Añadir"}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}

Modal.propTypes = {
  setModal: propTypes.func.isRequired,
  animarModal: propTypes.bool.isRequired,
  setAnimarModal: propTypes.func.isRequired,
  saveExpense: propTypes.func.isRequired,
  expenseEdit: propTypes.object.isRequired,
  setExpenseEdit: propTypes.func.isRequired,
}

export default Modal
