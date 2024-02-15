import propTypes from "prop-types"
import Expense from "./Expense"

const ExpensesList = ({
  expenses,
  setExpenseEdit,
  deleteExpense,
  filter,
  filteredExpenses,
}) => {
  return (
    <div>
      <div className='listado-gastos contenedor'>
        {filter ? (
          <>
            <h2>
              {filteredExpenses.length
                ? "Gastos"
                : "No existen gastos en esta Categoría"}{" "}
            </h2>
            {filteredExpenses.map((expense) => (
              <Expense
                key={expense.id}
                expense={expense}
                setExpenseEdit={setExpenseEdit}
                deleteExpense={deleteExpense}
              />
            ))}
          </>
        ) : (
          <>
            <h2>{expenses.length ? "Gastos" : "Añade Nuevos Gastos"} </h2>
            {expenses.map((expense) => (
              <Expense
                key={expense.id}
                expense={expense}
                setExpenseEdit={setExpenseEdit}
                deleteExpense={deleteExpense}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default ExpensesList

ExpensesList.propTypes = {
  expenses: propTypes.array.isRequired,
  setExpenseEdit: propTypes.func.isRequired,
  deleteExpense: propTypes.func.isRequired,
  filter: propTypes.string.isRequired,
  filteredExpenses: propTypes.array.isRequired,
}
