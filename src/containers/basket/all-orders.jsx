
import { useSelector } from 'react-redux';
import style from './basket.module.css';



const AllOrders = () => {
    const orders = useSelector(state => state.order.allOrders);

    // Si l'utilisateur n'a pas encore passé de commande, on affiche un message
    // ------------------------------------------------------------------------
    if (orders.length === 0) {
        return (
            <article className={style['data']}>
                <p>Vous n'avez pas encore passé de commande.</p>
                <p>Commencez dès maintenant et découvrez notre sélection de produits exceptionnels !</p>
            </article>
        )
    }

     // Si l'utilisateur a déjà passé au moins une commande, on affiche la/les commande(s)
    //  ----------------------------------------------------------------------------------
    return (orders.map(order => <OrderRow key={order.id} {...order} />))
}



const OrderRow = (
        {
            id,
            order_status,
            sending_status,
            payment_method,
            payment_status,
            Article_Orders
        }

    ) => {

        return (

            <article className={style['data']}>
                <p>Commande n°{id}</p>
                <p>Statut de la commande : {order_status}</p>
                <p>Statut de l'envoi : {sending_status}</p>
                <p>Mode de paiement : {payment_method}</p>
                <p>Status de paiement : {payment_status}</p>

                {
                    Article_Orders.map(article_order => <p key={article_order.id} className={style['article-already-bought']}>- {article_order.Article.name}</p>)

                }

            </article>
        )
}


export default AllOrders;