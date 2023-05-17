import { useSelector } from "react-redux";


import style from './basket.module.css';

import defaultAvatar from '../../assets/avatar.jpg'; 


const MyPersonalData = () => {

    const auth = useSelector(state => state.auth);
    // console.log(auth);

    return (
        <article className={style['data']}>

            <p>Prénom : {auth.userFirstname}</p>
            <p>Nom : {auth.userLastname}</p>
            <p>Pseudo : {auth.userPseudo}</p>

            <p>Avatar : </p>
            {/* TODO : ajouter l'avatar de la DB */}
            {
                auth.avatar ? (<img src="" alt="" />) : (<img src={defaultAvatar} alt="Avatar par défaut" />)
            }

            <p>Email : {auth.userEmail}</p>
            <p>Rue : {auth.userAddressStreet}</p>
            <p>Numéro : {auth.userAddressNumber}</p>
            <p>Ville : {auth.userAddressCity}</p>
            <p>Code postal : {auth.userAddressPostalCode}</p>
            <p>Pays : {auth.userAddressCountry}</p>

         </article>
    )
}

export default MyPersonalData;