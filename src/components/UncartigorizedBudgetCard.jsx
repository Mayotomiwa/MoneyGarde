import React from 'react'
import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/AppContext'

export default function UncartigorizedBudgetCard(props) {

    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
    )
    if(amount === 0) {
        return null
    }
    return (
        <BudgetCard name="Uncategorized" amount={amount} grey {...props} />
    )
}
