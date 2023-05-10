
import { NavLink } from 'react-router-dom'
import style from './custom-navlink.module.css'

const CustomNavLink = ({ to, text }) => (
    <NavLink to={to} className={({ isActive }) => isActive ? style['active-link'] : ''}>
        {text}
    </NavLink>
)

export default CustomNavLink