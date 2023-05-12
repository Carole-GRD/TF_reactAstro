
import { NavLink } from 'react-router-dom'
import style from './custom-navlink.module.css'

const CustomNavlink = ({ to, text }) => (
    <NavLink to={to} className={({ isActive }) => isActive ? style['active-link'] : ''}>
        {text}
    </NavLink>
)

export default CustomNavlink