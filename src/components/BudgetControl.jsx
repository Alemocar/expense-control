import propTypes from "prop-types"
import { useState, useEffect } from "react"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const BudgetControl = ({
  expenses,
  setExpenses,
  budget,
  setBudget,
  setIsValidBudget,
}) => {
  const [percentage, setPercentage] = useState(0)
  const [available, setAvailable] = useState(0)
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, expense) => expense.amount + total,
      0
    )

    const totalAvailable = budget - totalSpent

    // Calculate expenses percentage
    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(
      2
    )

    setSpent(totalSpent)
    setAvailable(totalAvailable)
    setTimeout(() => {
      setPercentage(newPercentage)
    }, 800)
  }, [expenses, budget])

  const currencyFormatter = (amount, language, country, currency) => {
    return amount.toLocaleString(`${language}-${country}`, {
      style: "currency",
      currency: currency,
    })
  }

  const handleResetApp = () => {
    const result = confirm("Reiniciar Gastos y Presupuesto")

    console.log(result)

    if (result) {
      setExpenses([])
      setBudget(0)
      setIsValidBudget(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? "#dc2626" : "#3b82f6",
            trailcolor: "f5f5f5",
            textColor: percentage > 100 ? "#dc2626" : "#3b82f6",
          })}
          value={percentage}
          text={`${percentage}%`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleResetApp}>
          Reset
        </button>
        <p>
          <span>Presupuesto:</span>{" "}
          {currencyFormatter(budget, "es", "MX", "MXN")}
        </p>
        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span>{" "}
          {currencyFormatter(available, "es", "MX", "MXN")}
        </p>
        <p>
          <span>Gasto:</span> {currencyFormatter(spent, "es", "MX", "MXN")}
        </p>
      </div>
    </div>
  )
}

BudgetControl.propTypes = {
  expenses: propTypes.array.isRequired,
  setExpenses: propTypes.func.isRequired,
  budget: propTypes.number.isRequired,
  setBudget: propTypes.func.isRequired,
  setIsValidBudget: propTypes.func.isRequired,
}

export default BudgetControl
