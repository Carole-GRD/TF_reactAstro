
import style from './home.module.css'

import planetLogo6 from '../../assets/planet-6.png'
import planetLogo5 from '../../assets/planet-5.png'
import planetLogo3 from '../../assets/planet-3.png'


const HomePage = () => {

    return (
        <div className={style['home-container']}>

            <div className={style['home-content']}>
            
                <h1>Astro Passion</h1>
                
                {/* <img src={planetLogo5} className={style.logo} alt="Planet5 logo" />
                <img src={planetLogo3} className={style.logo} alt="Planet6 logo" />  */}
                    
                <img src={planetLogo3} className={style['logo']} alt="Planet6 logo" />
                
                <div className={style['about']}>
                    <h2>Ce qui, <br/> face à votre passion pour l’astronomie, <br/> nous rend si particuliers</h2>
                    <p>Le plus grand choix de produits et le meilleur service qui soit : si ces deux aspects sont importants pour vous, Astro Passion est alors le partenaire en astronomie dont vous avez besoin. Chez Astro Passion, vous trouverez non seulement des télescopes, mais encore un gigantesque choix d’accessoires. La petite start-up créée en 1999 au fond d’un garage par les frères Cosmic et Planet est aujourd’hui le plus grand revendeur d’Europe spécialisé en télescopes, avec plus de 120 collaborateurs, des filiales et des showrooms dans huit pays.</p>
                </div>

            </div>

        </div>
    )

}

export default HomePage