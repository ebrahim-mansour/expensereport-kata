import { printHelloWorld, printReport, sumTwoValues, Expense, ExpenseType } from './ExpenseReport'

describe(`ExpenseReport`, () => {
    it(`should keep its original behavior`, () => {
        let interceptedOutput = ""
        jest.spyOn(process.stdout, "write").mockImplementation((output: string): boolean => {
            interceptedOutput += output
            return true;
        })
        printReport([
          new Expense("dinner", 5001)
        ])
        expect(interceptedOutput).toEqual(`Expenses: 2026-01-03
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
          new Expense("breakfast", 1001)
        ])
        expect(interceptedOutput).toEqual(`Expenses: 2026-01-03
Breakfast	1001	X
Meal Expenses: 1001
Total Expenses: 1001
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
