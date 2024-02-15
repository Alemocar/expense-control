import React from "react"
import propTypes from "prop-types"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"

import { dateFormat } from "../helpers"
import gastosIcon from "../img/icons/icono_gastos.svg"
const Expense = ({ expense, setExpenseEdit, deleteExpense }) => {
  const { category, name, amount, id, date } = expense

  // Function to load the specific icon if it exists, or the default icon if not
  const loadIcon = React.useMemo(
    () => async () => {
      const iconPath = `../img/icons/icono_${category}.svg`

      try {
        // Try to import the specific icon
        const { default: expenseIcon } = await import(iconPath)
        return expenseIcon
      } catch (error) {
        // If there is an error (for example, the icon does not exist), return the default icon
        return gastosIcon
      }
    },
    [category]
  )

  const [expenseIcon, setExpenseIcon] = React.useState(null)

  React.useEffect(() => {
    // Cargar el icono al montar el componente
    loadIcon().then(setExpenseIcon)
  }, [loadIcon])

  if (!expenseIcon) return null

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setExpenseEdit(expense)
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          deleteExpense(id)
        }}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        className='gasto'
        style={{ boxShadow: "none", marginBottom: "10rem", borderRadius: 0 }}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div
          className='gasto sombra'
          style={{ boxShadow: "none", marginBottom: 0, borderRadius: 0 }}
        >
          <div className='contenido-gasto'>
            <img src={expenseIcon} alt={`${category}`} />
            <div className='descripcion-gasto'>
              <p className='categoria'>{category}</p>
              <p className='nombre-gasto'>{name}</p>
              <p className='fecha-gasto'>
                Fecha: <span>{dateFormat(date)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense

Expense.propTypes = {
  expense: propTypes.object.isRequired,
  setExpenseEdit: propTypes.func.isRequired,
  deleteExpense: propTypes.func.isRequired,
}
