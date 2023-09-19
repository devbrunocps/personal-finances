import { useContext, useState } from "react"
import './style.css'
import { Context } from "../../contexts/Context"

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

    const [name, setName] = useState("")
    const [value, setValue] = useState()
    const [type, setType] = useState("")

    const [viewList, setViewList] = useState("earnings")

    const handleChange = (el, setState) => {
        setState(el.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
    }

    const changeMonth = (ev) => {
        setMonth(() => ev.target.value)
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
                            <input onChange={(el) => handleChange(el, setName)} value={name} type="text" name="name" id="name" className="name" autoComplete="off" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="value">Valor</label>
                            <input onChange={(el) => handleChange(el, setValue)} value={value} type="number" name="value" id="value" className="value" autoComplete="off" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="type">Tipo</label>
                            <select onChange={(el) => handleChange(el, setType)} value={type} name="type" id="type" required>
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
                        <div className="btns">
                            <button className={viewList == "earnings" ? "earnings" : ""} onClick={() => setViewList("earnings")}>GANHOS</button>
                            <button className={viewList == "expenses" ? "expenses" : ""} onClick={() => setViewList("expenses")}>DESPESAS</button>
                        </div>

                        {viewList == "earnings" && (
                            <div className="list">
                                {context.users[0].months[month].earnings.map(earning => {
                                    return (
                                        <div className="item">
                                            <div className="name">
                                                <span>{earning.name}</span>
                                            </div>
                                            <div className="value-earning">
                                                <span>R${earning.value}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {viewList == "expenses" && (
                            <div className="list">
                                {context.users[0].months[month].expenses.map(expense => {
                                    return (
                                        <div className="item">
                                            <div className="name">
                                                <span>{expense.name}</span>
                                            </div>
                                            <div className="value-expense">
                                                <span>R${expense.value}</span>
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