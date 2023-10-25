import React from 'react';
import '../App.css';
import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

import BudgetCard from './BudgetCard';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/AppContext';
import AddExpenseModal from './Add Expense';
import ViewExpensesModal  from './ViewExpenses';
import AddBudgetModal from './AddBudget';
import UncartigorizedBudgetCard from './UncartigorizedBudgetCard';
import TotalCard from './TotalCard';

export default function MainPanel() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showExpense, setshowExpense] = useState(false)
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
    const [showExpenseModal, setshowExpenseModal] = useState()
    const { budgets, getBudgetExpenses } = useBudgets()
  
    function openAddExpenseModal(budgetId) {
      setshowExpense(true)
      setshowExpenseModal(budgetId)
    }
  
    return (
      <>
        <Container className="my-4">
          <Stack direction="horizontal" gap="2" className="mb-4">
            <h1 className="name me-auto">MoneyGrade</h1>
            <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
              Add Budget
            </Button>
            <Button variant="outline-primary" onClick={openAddExpenseModal}>
              Add Expense
            </Button>
          </Stack>
          <div className='body-container '>
            {budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              )
              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpensesClick={() =>
                    setViewExpensesModalBudgetId(budget.id)
                  }
                />
              )
            })}
            <UncartigorizedBudgetCard  
            onAddExpenseClick={openAddExpenseModal} 
            onViewExpensesClick={() =>setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
            <TotalCard />
          </div>
        </Container>
        <AddBudgetModal
          show={showAddBudgetModal}
          handleClose={() => setShowAddBudgetModal(false)}
        />
        <AddExpenseModal
          show={showExpense}
          defaultBudgetId={showExpenseModal}
          handleClose={() => setshowExpense(false)}
        />
         <ViewExpensesModal
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId()}
        />
      </>
    )
  }