
import style from './not-found.module.css'



const NotFoundPage = () => (

    <div className={style['notfound-container']}>
        <p className={style['text-3d']}>Erreur 404</p>
        <p className={style['text-3d']}>Page non trouvée</p>
    </div>

)

export default NotFoundPage