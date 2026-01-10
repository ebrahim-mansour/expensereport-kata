const message = 'Hello, World!\n';

const sumTwoValues = (a: number, b: number): number => a + b

const printHelloWorld = (): void => {
  process.stdout.write(message);
}

type ExpenseType = Dinner | Breakfast | Lunch | CarRental

enum Meals {
  Dinner = "dinner",
  Breakfast = "breakfast",
  Lunch = "lunch"
}

type Dinner = {
  key: Meals.Dinner,
  name: "Dinner"
}
type Breakfast = {
  key: Meals.Breakfast
  name: "Breakfast"
}
type Lunch = {
  key: Meals.Lunch
  name: "Lunch"
}
type CarRental = {
  key: "car-rental"
  name: "Car Rental"
}

const EXPENSE_LIMITS = {
  DINNER: 5000,
  BREAKFAST: 1000,
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
    const isDinnerOver = this.key === Meals.Dinner && this.amount > EXPENSE_LIMITS.DINNER;
    const isBreakFastOver = this.key === Meals.Breakfast && this.amount > EXPENSE_LIMITS.BREAKFAST;
    return isDinnerOver || isBreakFastOver ? "X" : " ";
  }
}

function calculateMealExpenses(expense: Expense, mealExpenses: number) {
  const isMeal = expense.key === Meals.Dinner || expense.key === Meals.Breakfast || expense.key === Meals.Lunch;
  if (isMeal) {
    mealExpenses += expense.amount;
  }
  return mealExpenses;
}

function printReport(expenses: Expense[]): void {
  const { today, expensesData, mealExpenses, totalExpenses } = prepareReportData(expenses);

  process.stdout.write("Expenses: " + today + "\n");
  process.stdout.write(expensesData)
  process.stdout.write("Meal Expenses: " + mealExpenses + "\n")
  process.stdout.write("Total Expenses: " + totalExpenses + "\n")
}

function prepareReportData(expenses: Expense[]) {
  let totalExpenses = 0;
  let mealExpenses = 0;
  const today = new Date().toISOString().substr(0, 10);
  ({ mealExpenses, totalExpenses } = calculateMealExpensesAndTotalExpenses(expenses, mealExpenses, totalExpenses));
  const expensesData = calculateExpensesData(expenses);
  return { today, expensesData, mealExpenses, totalExpenses };
}

function calculateExpensesData(expenses: Expense[]) {
  let expensesData = "";
  for (const expense of expenses) {
    expensesData += expense.name + "\t" + expense.amount + "\t" + expense.mealAndOverExpensesThreshold + "\n";
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

export {sumTwoValues, printHelloWorld, printReport, Expense, ExpenseType, Meals }
