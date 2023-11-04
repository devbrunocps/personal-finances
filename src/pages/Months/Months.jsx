import { useContext, useEffect, useRef, useState } from "react"
import './style.css'
import { Context } from "../../contexts/Context"
import { BsFillTrash3Fill } from "react-icons/bs";

export default function Months() {

    const context = useContext(Context)

    const [months, setMonths] = useState([
        { br: "Janeiro", en: "january" },
        { br: "Fevereiro", en: "february" },
        { br: "Março", en: "march" },
        { br: "Abril", en: "april" },
        { br: "Maio", en: "may" },
        { br: "Junho", en: "june" },
        { br: "Julho", en: "july" },
        { br: "Agosto", en: "august" },
        { br: "Setembro", en: "september" },
        { br: "Outubro", en: "october" },
        { br: "Novembro", en: "november" },
        { br: "Dezembro", en: "december" },
    ])

    const [month, setMonth] = useState("january")

    const [name, setName] = useState()
    const [value, setValue] = useState()
    const [type, setType] = useState("")

    const [viewList, setViewList] = useState("earnings")
    const [isListUpdated, setIsListUpdated] = useState(false);

    const inputNameRef = useRef(null)
    const inputValueRef = useRef(null)
    const inputTypeRef = useRef(null)

    const handleChange = (el, setState) => {
        setState(el.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const obj = {
            name: inputNameRef.current.value,
            value: +inputValueRef.current.value,
        }

        inputTypeRef.current.value == "earnings" ? context.addEarning(obj, month) : context.addExpense(obj, month)

        setIsListUpdated((currentState) => !currentState)

        inputNameRef.current.value = ""
        inputValueRef.current.value = ""
        inputTypeRef.current.value = ""
    }

    const changeMonth = (ev) => {
        setMonth(() => ev.target.value)
    }

    const handleDeleteEarnings = (index, month) => {
        let deleteItem = context.users[0].months[month].earnings[index]
        let updatedItems = context.users[0].months[month].earnings.filter(element => element != deleteItem)

        context.users[0].months[month].earnings = updatedItems
        localStorage.setItem('personal-finances', JSON.stringify(context.users))
        setIsListUpdated((currentState) => !currentState)


        let earningsValue = context.users[0].months[month].earnings.reduce((accumulator, element) => accumulator + element.value, 0)
        let expensesValue = context.users[0].months[month].expenses.reduce((accumulator, element) => accumulator + element.value, 0)
        let balance = earningsValue - expensesValue

        context.users[0].months[month].balance = balance
    }

    const handleDeleteExpenses = (index, month) => {
        let deleteItem = context.users[0].months[month].expenses[index]
        let updatedItems = context.users[0].months[month].expenses.filter(element => element != deleteItem)

        context.users[0].months[month].expenses = updatedItems
        localStorage.setItem('personal-finances', JSON.stringify(context.users))
        setIsListUpdated((currentState) => !currentState)

        let earningsValue = context.users[0].months[month].earnings.reduce((accumulator, element) => accumulator + element.value, 0)
        let expensesValue = context.users[0].months[month].expenses.reduce((accumulator, element) => accumulator + element.value, 0)
        let balance = earningsValue - expensesValue

        context.users[0].months[month].balance = balance
    }


    return (
        <main>
            <header className="months">
                <div className="title">
                    <span>DESPESAS MENSAIS</span>
                </div>
                <select name="months" id="months" onChange={changeMonth}>
                    {months.map((month, index) => {
                        return <option key={index} value={month.en}>{month.br}</option>
                    })}
                </select>
            </header>

            <section className="container">
                <div className="left">
                    <div className="title">
                        <span>NOVA TRANSAÇÃO</span>
                    </div>
                    <form onSubmit={(ev) => handleSubmit(ev)}>
                        <div className="input-group">
                            <label htmlFor="name">Nome</label>
                            <input onChange={(el) => handleChange(el, setName)} ref={inputNameRef} value={name} type="text" name="name" id="name" className="name" autoComplete="off" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="value">Valor</label>
                            <input onChange={(el) => handleChange(el, setValue)} ref={inputValueRef} value={value} type="number" name="value" id="value" className="value" autoComplete="off" max={100000000} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="type">Tipo</label>
                            <select onChange={(el) => handleChange(el, setType)} ref={inputTypeRef} value={type} name="type" id="type" required>
                                <option disabled></option>
                                <option value="earnings">GANHOS</option>
                                <option value="expenses">DESPESAS</option>
                            </select>
                        </div>
                        <div className="btn">
                            <button type="submit">ADICIONAR</button>
                        </div>
                    </form>
                </div>
                <div className="right">
                    <div className="summary">

                        <div className="balance">
                            <span>SALDO TOTAL  -  {context.users[0].months[month].balance}</span>
                        </div>

                        <div className="btns">
                            <button className={viewList == "earnings" ? "earnings" : ""} onClick={() => setViewList("earnings")}>GANHOS</button>
                            <button className={viewList == "expenses" ? "expenses" : ""} onClick={() => setViewList("expenses")}>DESPESAS</button>
                        </div>

                        {viewList == "earnings" && (
                            <div className="list">
                                {context.users[0].months[month].earnings.map((earning, index) => {
                                    return (
                                        <div className="item" key={index}>
                                            <div className="name">
                                                <span>{earning.name}</span>
                                            </div>
                                            <div className="value-earning">
                                                <span>R${earning.value}</span>
                                            </div>
                                            <div className="delete">
                                                <BsFillTrash3Fill onClick={() => handleDeleteEarnings(index, month)}/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {viewList == "expenses" && (
                            <div className="list">
                                {context.users[0].months[month].expenses.map((expense, index) => {
                                    return (
                                        <div className="item" key={index}>
                                            <div className="name">
                                                <span>{expense.name}</span>
                                            </div>
                                            <div className="value-expense">
                                                <span>R${expense.value}</span>
                                            </div>
                                            <div className="delete">
                                                <BsFillTrash3Fill onClick={() => handleDeleteExpenses(index, month)}/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}


                    </div>
                </div>
            </section>
        </main>
    )
}