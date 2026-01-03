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
  constructor(type: ExpenseType, amount: number) {
    this.key = type.key
    this.name = type.name
    this.amount = amount
  }
}

function printReport(expenses: Expense[]) {
  let totalExpenses: number = 0
  let mealExpenses: number = 0

  process.stdout.write("Expenses: " + new Date().toISOString().substr(0, 10) + "\n")

  for (const expense of expenses) {
    if (expense.key == "dinner" || expense.key == "breakfast") {
      mealExpenses += expense.amount
    }

    const mealOverExpensesMarker = expense.key == "dinner" && expense.amount > 5000 || expense.key == "breakfast" && expense.amount > 1000 ? "X" : " "

    process.stdout.write(expense.name + "\t" + expense.amount + "\t" + mealOverExpensesMarker + "\n")

    totalExpenses += expense.amount
  }

  process.stdout.write("Meal Expenses: " + mealExpenses + "\n")
  process.stdout.write("Total Expenses: " + totalExpenses + "\n")
}

export {sumTwoValues, printHelloWorld, printReport, Expense, ExpenseType}
