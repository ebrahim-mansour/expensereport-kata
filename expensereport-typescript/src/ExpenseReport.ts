const message = 'Hello, World!\n';

const sumTwoValues = (a: number, b: number): number => a + b

const printHelloWorld = (): void => {
  process.stdout.write(message);
}

type ExpenseType = Dinner | Breakfast | CarRental

enum Meals {
  Dinner = "dinner",
  Breakfast = "breakfast"
}

type Dinner = {
  key: Meals.Dinner,
  name: "Dinner"
}
type Breakfast = {
  key: Meals.Breakfast
  name: "Breakfast"
}
type CarRental = {
  key: "car-rental"
  name: "Car Rental"
}

const DINNER_THRESHOLD = 5000;
const BREAKFAST_THRESHOLD = 1000;

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
    const isDinnerOver = this.key == Meals.Dinner && this.amount > DINNER_THRESHOLD;
    const isBreakFastOver = this.key == Meals.Breakfast && this.amount > BREAKFAST_THRESHOLD;
    return isDinnerOver || isBreakFastOver ? "X" : " ";
  }
}

function calculateMealExpenses(expense: Expense, mealExpenses: number) {
  const isMeal = expense.key == Meals.Dinner || expense.key == Meals.Breakfast;
  if (isMeal) {
    mealExpenses += expense.amount;
  }
  return mealExpenses;
}

function printReport(expenses: Expense[]): void {
  let totalExpenses = 0
  let mealExpenses = 0
  const today = new Date().toISOString().substr(0, 10);

  ({ mealExpenses, totalExpenses } = calculateMealExpensesAndTotalExpenses(expenses, mealExpenses, totalExpenses));

  process.stdout.write("Expenses: " + today + "\n");

  const expensesData = calculateExpensesData(expenses);
  process.stdout.write(expensesData)

  process.stdout.write("Meal Expenses: " + mealExpenses + "\n")
  process.stdout.write("Total Expenses: " + totalExpenses + "\n")
}

export {sumTwoValues, printHelloWorld, printReport, Expense, ExpenseType, Meals }

function calculateExpensesData(expenses: Expense[]) {
  let expensesData = "";
  for (const expense of expenses) {
    const expenseData = expense.name + "\t" + expense.amount + "\t" + expense.mealAndOverExpensesThreshold + "\n";
    expensesData += expenseData;
  }
  return expensesData;
}

function calculateMealExpensesAndTotalExpenses(expenses: Expense[], mealExpenses: number, totalExpenses: number) {
  for (const expense of expenses) {
    mealExpenses = calculateMealExpenses(expense, mealExpenses);
    totalExpenses += expense.amount;
  }
  return { mealExpenses, totalExpenses };
}

