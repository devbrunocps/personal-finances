import { createContext, useState } from "react";

export const Context = createContext({})

export default function ContextProvider({ children }) {
    const [users, setUsers] = useState([
        {
            info: {
                firstname: "Bruno",
                lastname: "Campos"
            },
            months: {
                january: {
                    balance: 5280,
                    earnings: [
                        {name: 'Salário', value: 2490},
                        {name: 'Décimo Terceiro', value: 2490},
                        {name: 'Décimo Terceiro', value: 2490},
                        {name: 'Décimo Terceiro', value: 2490},
                        {name: 'Décimo Terceiro', value: 2490},
                        {name: 'Décimo Terceiro', value: 2490},
                        {name: 'Férias', value: 3800},
                        {name: 'Férias', value: 3800}
                    ],
                    expenses: [
                        {name: 'Mercado', value: 1200},
                        {name: 'Contas', value: 1800},
                        {name: 'Lazer', value: 500},
                    ]
                },
                february: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                march: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                april: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                may: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                june: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                july: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                august: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                september: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                october: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                november: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                },
                december: {
                    balance: 0,
                    earnings: [],
                    expenses: []
                }
            }
        }
    ])

    const value = {
        users,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}