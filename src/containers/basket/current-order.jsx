
import { useSelector } from 'react-redux';
import style from './basket.module.css';



const CurrentOrder = () => {

    // Evolution => Utiliser le store pour récup le currentOrder
    const currentOrder = useSelector(state => state.shop.currentOrder);

    if (!currentOrder) {
        return (
            <article className={style['data']}>
                <p>Vous n'avez pas de commande en cours pour le moment.</p>
                <p>Parcourez notre catalogue et ajoutez des produits à votre panier pour commencer une nouvelle commande !</p>
            </article>
        )
    }



    let total = 0;
    for (let article of currentOrder.Articles) {
        total += (article.Stores.find(store => store.id === article.MM_Article_Order.store).MM_Article_Store.price * article.MM_Article_Order.quantity);
    }

    return (

        <>
                <article className={style['data']}>
                <p>Statut de la commande : {currentOrder.order_status}</p>
                <p>Statut de l'envoi : {currentOrder.sending_status}</p>
                <p>Mode de paiement : {currentOrder.payment_method}</p>
                <p>Status de paiement : {currentOrder.payment_status}</p>

                <p>Articles : </p>
                <table>
                    <thead>
                        <tr>
                            <th>Articles</th>
                            <th>Prix unitaire</th>
                            <th>Quantité</th>
                            <th></th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentOrder.Articles.map(article => (
                                <tr key={article.id}>
                                    <td>{article.name}</td>
                                    {/* {console.log("article: ",article)} */}
                                    <td>{article.Stores.find(store => store.id === article.MM_Article_Order.store).MM_Article_Store.price.toFixed(2)} €</td> 
                                    <td>{article.MM_Article_Order.quantity}</td>
                                    <td><button>+</button>/<button>-</button></td>
                                    <td>{(article.Stores.find(store => store.id === article.MM_Article_Order.store).MM_Article_Store.price * article.MM_Article_Order.quantity).toFixed(2)} €</td>                                    
                                </tr>
                            ))    
                        }
                        <tr>
                            <td>TOTAL</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{total.toFixed(2)} €</td>
                        </tr>
                    </tbody>
                </table>   
            </article>
        </>
    )
}

export default CurrentOrder;