
import './header.module.css'
import style from './header.module.css'

import planetLogo6 from '../../assets/planet-6.png'
import planetLogo5 from '../../assets/planet-5.png'
import planetLogo3 from '../../assets/planet-3.png'

import CustomNavLink from '../../components/custom-navlink/custom-navlink'



const Header = () => (
    <header>
        <img src={planetLogo6} className={style['logo-invert']} alt={"Planet5 logo"} />
        
        <nav>
            <ul className={style['nav-links']}>
                <li>
                    <CustomNavLink to='/' text='Accueil' />
                </li>
                <li>
                    <CustomNavLink to='/articles' text='Articles' />
                </li>
                {/* <li>
                    <CustomNavLink to='/weather' text='Météo' />
                </li> */}
                {/* <li>
                    <CustomNavLink to='/about' text='À propos' />
                </li> */}
            </ul>
        </nav>
    </header>
)

export default Header