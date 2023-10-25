import { Card, ProgressBar, Button, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils/utils"


function getProgress(amount, max) {
    const ratio = amount / max
    if (ratio < .5) {
        return 'primary'
    } else if (ratio < .75) {
        return 'warning'
    } else {
        return 'danger'
    }
}
function BudgetCard({ name, amount, max, grey, onAddExpenseClick, onViewExpensesClick, hideButtons }) {
    const classNames = []
    if (amount > max) {
        classNames.push('bg-danger bg-opacity-10')
    } else if (grey) {
        classNames.push('bg-light')
    }
    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="name me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
                        {max && <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>}
                    </div>
                </Card.Title>
                {max && <ProgressBar
                    className="rounded-pill"
                    variant={getProgress(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />}
                {!hideButtons && <Stack direction="horizontal" gap={3} className="mt-4">
                    <Button variant='outline-primary' className='ms-auto' onClick={onAddExpenseClick}>Add Expense</Button>
                    <Button variant='outline-secondary' onClick={onViewExpensesClick}>View Expense</Button>
                </Stack>}
            </Card.Body>
        </Card>
    )
}
export default BudgetCard