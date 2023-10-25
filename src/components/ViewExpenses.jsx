import { Button, Modal, Stack } from 'react-bootstrap'
import { useBudgets } from '../contexts/AppContext';
import { UNCATEGORIZED_BUDGET_ID } from '../contexts/AppContext';
import { currencyFormatter } from '../utils/utils';

export default function ViewExpensesModal({ budgetId, handleClose }) {

    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {
        name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID} : 
        budgets.find(b => b.id == budgetId)

    const expenses = getBudgetExpenses(budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='name'>
                    <Stack direction='horizontal' gap={3}>
                        <div>Expneses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button variant='outline-danger' onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }}>
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={3}>
                    {expenses.map(expense => (
                        <Stack direction='horizontal' gap={3} key={expense.id }>
                            <div className='me-auto fs-4'> { expense.description } </div>
                            <div className='fs-5'> { currencyFormatter.format(expense.amount) } </div>
                            <Button size='sm' variant='outline-danger' onClick={() => deleteExpense(expense)}> &times; </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}
