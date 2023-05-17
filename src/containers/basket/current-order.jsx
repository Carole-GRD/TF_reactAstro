
import style from './basket.module.css';


const CurrentOrder = ({currentOrder}) => {

    // Evolution => Utiliser le store pour récup le currentOrder

    console.log('currentOrder : ', currentOrder);
    // console.log('currentOrder.Articles : ', currentOrder.Articles);
    // console.log('currentOrder.Articles.map(article => article.name) : ', currentOrder.Articles.map(article => article.name));
    // ============================================================================================================================================================
    // const allArticles = currentOrder.Articles;
    // console.log('allArticles : ', allArticles);
    // console.log('allArticles.map(article => article.MM_Article_Order.quantity ) : ', allArticles.map(article => article.MM_Article_Order.quantity ));
    // console.log('allArticles.map(article => article.MM_Article_Order.store ) : ', allArticles.map(article => article.MM_Article_Order.store ));
    // ============================================================================================================================================================
    // console.log('allArticles[0] : ', allArticles[0]);
    // console.log('allArticles[0].MM_Article_Order : ', allArticles[0].MM_Article_Order);
    // console.log('allArticles[0].MM_Article_Order.quantity : ', allArticles[0].MM_Article_Order.quantity);
    // console.log('allArticles[0].MM_Article_Order.store : ', allArticles[0].MM_Article_Order.store);
    // ============================================================================================================================================================
    // console.log('allArticles[0].Stores.map(store => store) : ', allArticles[0].Stores.map(store => store));
    // console.log('allArticles[0].Stores.find(store => store.id === 4) : ', allArticles[0].Stores.find(store => store.id === 4));
    // console.log('allArticles[0].Stores.find(store => store.id === 4).MM_Article_Store.price : ', allArticles[0].Stores.find(store => store.id === 4).MM_Article_Store.price);
    // ============================================================================================================================================================
    // console.log(allArticles[0].MM_Article_Order.store);
    // console.log(allArticles[0].Stores.find(store => store.id === allArticles[0].MM_Article_Order.store).MM_Article_Store.price);



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