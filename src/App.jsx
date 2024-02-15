import { useState, useEffect } from "react"
import Header from "./components/Header"
import ExpensesList from "./components/ExpensesList"
import Modal from "./components/Modal"
import { getId } from "./helpers"
import NewOutcomeIcon from "./img/icons/nuevo-gasto.svg"
import Filters from "./components/Filters"

function App() {
  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : []
  )
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) ?? 0
  )
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [expenseEdit, setExpenseEdit] = useState({})
  const [filter, setFilter] = useState("")
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 100)
    }
  }, [expenseEdit])

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0

    if (budgetLS > 0) {
      setIsValidBudget(true)
    }
  }, [])

  useEffect(() => {
    if (filter) {
      // Category Filter
      const filteredExpenses = expenses.filter(
        (expense) => expense.category === filter
      )
      setFilteredExpenses(filteredExpenses)
    }
  }, [filter, expenses])

  const handleNewOutcome = () => {
    setModal(true)
    setExpenseEdit({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 100)
  }

  const saveExpense = (expense) => {
    if (expense.id) {
      // Update Expense
      const updatedExpenses = expenses.map((stateExpense) =>
        stateExpense.id === expense.id ? expense : stateExpense
      )
      setExpenses(updatedExpenses)
      setExpenseEdit({})
    } else {
      // New Expense
      expense.id = getId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidBudget && ( // To Active New Outcome Icon
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter} />
            <ExpensesList
              expenses={expenses}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={NewOutcomeIcon}
              alt='New Outcome Icon'
              onClick={handleNewOutcome}
            />
          </div>
        </>
      )}
      {modal && ( // To Active Modal
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          saveExpense={saveExpense}
          expenseEdit={expenseEdit}
          setExpenseEdit={setExpenseEdit}
        />
      )}
    </div>
  )
}

export default App
