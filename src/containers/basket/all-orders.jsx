
import style from './basket.module.css';


const AllOrders = (
                        {
                            id,
                            order_status, 
                            sending_status,
                            payment_method, 
                            payment_status, 
                            Articles
                        }

                    ) => {

    console.log('all articles : ', Articles);

    return (
        
        <article className={style['data']}>
            <p>Commande n°{id}</p>
            <p>Statut de la commande : {order_status}</p>
            <p>Statut de l'envoi : {sending_status}</p>
            <p>Mode de paiement : {payment_method}</p>
            <p>Status de paiement : {payment_status}</p>

            
            {
                Articles && Articles.map(article => <p key={article.id} className={style.article}>- {article.name}</p>)
                    
            }
        
        </article>
    )
}

export default AllOrders;