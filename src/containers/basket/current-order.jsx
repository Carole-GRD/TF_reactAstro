


import style from './basket.module.css';


const CurrentOrder = ({currentOrder}) => {
    console.log('currentOrder : ', currentOrder);
    console.log('currentOrder.order_status : ', currentOrder.order_status);

    const order = currentOrder[0];

    for (let item in currentOrder) {
        console.log('item : ', item);
    }

    return (
        
        <article className={style['data']}>
            <p>Commande n°{order.id}</p>
            <p>Statut de la commande : {order.order_status}</p>
            <p>Statut de l'envoi : {order.sending_status}</p>
            <p>Mode de paiement : {order.payment_method}</p>
            <p>Status de paiement : {order.payment_status}</p>

            {
                currentOrder.Articles &&
                    currentOrder.Articles.map(article => {
                        <div>
                            <p key={article.id}>{article.name}</p>
                        </div>
                    })  
            }
        </article>
        
    )
}

export default CurrentOrder;