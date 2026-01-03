const message = 'Hello, World!\n';

const sumTwoValues = (a: number, b: number): number => a + b

const printHelloWorld = (): void => {
  process.stdout.write(message);
}

type ExpenseType = Dinner | Breakfast | CarRental

type Dinner = {
  key: "dinner",
  name: "Dinner"
}
type Breakfast = {
  key: "breakfast"
  name: "Breakfast"
}
type CarRental = {
  key: "car-rental"
  name: "Car Rental"
}

class Expense {
  key: ExpenseType["key"]
  name: ExpenseType["name"]
  amount: number
  mealOverExpensesMarker: string
  constructor(type: ExpenseType, amount: number) {
    this.key = type.key
    this.name = type.name
    this.amount = amount
  }

  get mealAndOverExpensesThreshold(): string {
    const isDinnerOver = this.key == "dinner" && this.amount > 5000;
    const isBreakFastOver = this.key == "breakfast" && this.amount > 1000;
    return isDinnerOver || isBreakFastOver ? "X" : " ";
  }
}

function calculateMealExpenses(expense: Expense, mealExpenses: number) {
  const isMeal = expense.key == "dinner" || expense.key == "breakfast";
  if (isMeal) {
    mealExpenses += expense.amount;
  }
  return mealExpenses;
}

function printReport(expenses: Expense[]): void {
  let totalExpenses = 0
  let mealExpenses = 0

  process.stdout.write("Expenses: " + new Date().toISOString().substr(0, 10) + "\n")

  for (const expense of expenses) {
    mealExpenses = calculateMealExpenses(expense, mealExpenses);
    totalExpenses += expense.amount
  }

  for (const expense of expenses) {
    process.stdout.write(expense.name + "\t" + expense.amount + "\t" + expense.mealAndOverExpensesThreshold + "\n")
  }

  process.stdout.write("Meal Expenses: " + mealExpenses + "\n")
  process.stdout.write("Total Expenses: " + totalExpenses + "\n")
}

export {sumTwoValues, printHelloWorld, printReport, Expense, ExpenseType}

