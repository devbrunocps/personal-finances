import { Link, Outlet } from "react-router-dom";
import './style.css'

export default function RootLayout() {
    return (
        <>
            <header>
                <div className="logo">
                    <Link to={'/'} >PERSONAL FINANCES</Link>
                </div>
                <nav className="navbar" id="navbar">
                    <Link to={'/'}>Dashboard</Link>
                    <Link to={'/months'}>Mensal</Link>
                </nav>
            </header>
            <Outlet />
        </>
    )
}