import { printHelloWorld, printReport, sumTwoValues, Expense, Meals } from './ExpenseReport'

const today = new Date().toISOString().substr(0, 10);

describe(`ExpenseReport`, () => {
    it(`should keep its original behavior`, () => {
        let interceptedOutput = ""
        jest.spyOn(process.stdout, "write").mockImplementation((output: string): boolean => {
            interceptedOutput += output
            return true;
        })
        printReport([
          new Expense({ key: Meals.Dinner, name: "Dinner" }, 5001)
        ])
        expect(interceptedOutput).toEqual(`Expenses: ${today}
Dinner	5001	X
Meal Expenses: 5001
Total Expenses: 5001
`)
    })

    it(`should print the correct output for a breakfast expense`, () => {
        let interceptedOutput = ""
        jest.spyOn(process.stdout, "write").mockImplementation((output: string): boolean => {
            interceptedOutput += output
            return true;
        })
        printReport([
          new Expense({ key: Meals.Breakfast, name: "Breakfast" }, 1001)
        ])
        expect(interceptedOutput).toEqual(`Expenses: ${today}
Breakfast	1001	X
Meal Expenses: 1001
Total Expenses: 1001
`)
    })

    it(`should print the correct output for a lunch expense under limit`, () => {
        let interceptedOutput = ""
        jest.spyOn(process.stdout, "write").mockImplementation((output: string): boolean => {
            interceptedOutput += output
            return true;
        })
        printReport([
          new Expense({ key: Meals.Lunch, name: "Lunch" }, 1999)
        ])
        expect(interceptedOutput).toEqual(`Expenses: ${today}
Lunch	1999	 
Meal Expenses: 1999
Total Expenses: 1999
`)
    })

    it(`should print the correct output for a lunch expense at limit`, () => {
        let interceptedOutput = ""
        jest.spyOn(process.stdout, "write").mockImplementation((output: string): boolean => {
            interceptedOutput += output
            return true;
        })
        printReport([
          new Expense({ key: Meals.Lunch, name: "Lunch" }, 2000)
        ])
        expect(interceptedOutput).toEqual(`Expenses: ${today}
Lunch	2000	 
Meal Expenses: 2000
Total Expenses: 2000
`)
    })

    it(`should print the correct output for a lunch expense over limit`, () => {
        let interceptedOutput = ""
        jest.spyOn(process.stdout, "write").mockImplementation((output: string): boolean => {
            interceptedOutput += output
            return true;
        })
        printReport([
          new Expense({ key: Meals.Lunch, name: "Lunch" }, 2001)
        ])
        expect(interceptedOutput).toEqual(`Expenses: ${today}
Lunch	2001	X
Meal Expenses: 2001
Total Expenses: 2001
`)
    })

    it(`should print report with various expense types and amounts`, () => {
        let interceptedOutput = ""
        jest.spyOn(process.stdout, "write").mockImplementation((output: string): boolean => {
            interceptedOutput += output
            return true;
        })
        
        printReport([
          new Expense({ key: Meals.Dinner, name: "Dinner" }, 5000),      // At threshold, no marker
          new Expense({ key: Meals.Dinner, name: "Dinner" }, 5001),      // Over threshold, with marker
          new Expense({ key: Meals.Breakfast, name: "Breakfast" }, 1000),    // At threshold, no marker
          new Expense({ key: Meals.Breakfast, name: "Breakfast" }, 1001),    // Over threshold, with marker
          new Expense({ key: Meals.Lunch, name: "Lunch" }, 2000),      // At threshold, no marker
          new Expense({ key: Meals.Lunch, name: "Lunch" }, 2001),      // Over threshold, with marker
          new Expense({ key: "car-rental", name: "Car Rental" }, 5000),   // Non-meal expense
          new Expense({ key: Meals.Breakfast, name: "Breakfast" }, 500),     // Under threshold, no marker
        ])
        
        expect(interceptedOutput).toEqual(`Expenses: ${today}
Dinner	5000	 
Dinner	5001	X
Breakfast	1000	 
Breakfast	1001	X
Lunch	2000	 
Lunch	2001	X
Car Rental	5000	 
Breakfast	500	 
Meal Expenses: 16503
Total Expenses: 21503
`)

    })
})

describe(`given I have this test suite`, () => {
    it(`should always output Hello, World!`, () => {
        //given
        let actualOutputData = ""
        jest.spyOn(process.stdout, "write").mockImplementation((data: string): boolean => {
            actualOutputData += data
            return true
        })
        const expectedOutputData = "Hello, World!\n"

        // when
        printHelloWorld()

        // then
        expect(actualOutputData).toEqual(expectedOutputData)
    })

    it(`should always do the correct sum`, () => {
        // given
        const a = 2, b = 3
        const expectedValue = 5

        // when
        const actualValue = sumTwoValues(a, b)

        // then
        expect(actualValue).toEqual(expectedValue)
    })
})
