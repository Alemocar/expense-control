import propTypes from "prop-types"
import NewBudget from "./NewBudget"
import BudgetControl from "./BudgetControl"

const Header = ({
  expenses,
  setExpenses,
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidBudget ? (
        <BudgetControl
          expenses={expenses}
          setExpenses={setExpenses}
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  )
}

Header.propTypes = {
  expenses: propTypes.array.isRequired,
  setExpenses: propTypes.func.isRequired,
  budget: propTypes.number.isRequired,
  setBudget: propTypes.func.isRequired,
  isValidBudget: propTypes.bool.isRequired,
  setIsValidBudget: propTypes.func.isRequired,
}

export default Header
