import { createContext, useState } from "react";

export const Context = createContext({})

export default function ContextProvider({ children }) {
    const initialState = [
        {
            months: {
                january: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                february: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                march: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                april: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                may: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                june: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                july: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                august: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                september: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                october: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                november: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
                december: {
                    balance: 0,
                    earnings: [],
                    expenses: [],
                },
            },
        }
    ]

    const [users, setUsers] = useState(() => {
        let storedItems =  localStorage.getItem('personal-finances')
        if(!storedItems) return initialState
        let items = JSON.parse(storedItems)
        return items
    })


    let addEarning = (obj, month) => {
        setUsers((currentState) => {
            currentState[0].months[month].earnings.unshift(obj)

            let earningsValue = currentState[0].months[month].earnings.reduce((accumulator, element) => accumulator + element.value, 0)
            let expensesValue = currentState[0].months[month].expenses.reduce((accumulator, element) => accumulator + element.value, 0)
            let balance = earningsValue - expensesValue

            currentState[0].months[month].balance = balance

            localStorage.setItem('personal-finances', JSON.stringify(currentState))
            return currentState
        })
    }

    let addExpense = (obj, month) => {
        setUsers((currentState) => {
            currentState[0].months[month].expenses.unshift(obj)

            let earningsValue = currentState[0].months[month].earnings.reduce((accumulator, element) => accumulator + element.value, 0)
            let expensesValue = currentState[0].months[month].expenses.reduce((accumulator, element) => accumulator + element.value, 0)
            let balance = earningsValue - expensesValue

            currentState[0].months[month].balance = balance

            localStorage.setItem('personal-finances', JSON.stringify(currentState))
            return currentState
        })
    }

    const value = {
        users,
        setUsers,
        addEarning,
        addExpense,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}