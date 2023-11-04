import { useContext, useState } from 'react'
import './style.css'
import { Context } from '../../contexts/Context'

export default function Dashboard() {

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

    let totalBalance = 0;
    let totalEarnings = 0;
    let totalExpenses = 0;

    // CALCULA O SALDO TOTAL DOS ÚLTIMOS 12 MESES

    months.forEach(element => {
        totalBalance += context.users[0].months[element.en].balance
    })

    // CALCULA OS GANHOS TOTAIS OS ÚLTIMOS 12 MESES

    months.forEach(element => {
        let earningValue = context.users[0].months[element.en].earnings.reduce((accumulator, element) => {
            return accumulator += element.value
        }, 0)

        totalEarnings += earningValue
    })

    // CALCULA OS GASTOS TOTAIS DOS ÚLTIMOS 12 MESES

    months.forEach(element => {
        let expenseValue = context.users[0].months[element.en].expenses.reduce((accumulator, element) => {
            return accumulator += element.value
        }, 0)

        totalExpenses += expenseValue
    })

    return (
        <main className='dashboard'>
            <header className="last-months">
                <div className="title">
                    <span>DASHBOARD</span>
                </div>
                <div className="last-twelve-months">
                    <span>Últimos 12 meses</span>
                </div>
            </header>
            <section>
                <div className="left">
                    <div className="totals">
                        <div className="total-earnings">
                            <span>GANHOS TOTAIS</span>
                            <span className='value-earnings'>R${totalEarnings}</span>
                        </div>
                        <div className="total-expenses">
                            <span>DESPESAS TOTAIS</span>
                            <span className='value-expenses'>R${totalExpenses}</span>
                        </div>
                    </div>
                    <div className="total-balance">
                        <span>SALDO TOTAL</span>
                        <span className='value-total'>R${totalBalance}</span>
                    </div>
                </div>
                <div className="right">
                    <div className="summary">
                        <div className="title">
                            <span>RESUMO</span>
                        </div>
                        <div className="history">
                            {months.map((element, index) => {
                                return (
                                    <div className='item' key={index}>
                                        <div className="month">
                                            <span>{element.br}</span>
                                        </div>
                                        <div className="balance">
                                            <span>R${context.users[0].months[element.en].balance}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}