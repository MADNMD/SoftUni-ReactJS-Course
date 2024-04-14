import { useEffect, useState } from 'react';

import * as cosmeticService from '../../Services/cosmeticService';
import { CatalogItem } from './CatalogItem';

export const Catalog = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        cosmeticService.getAllCosmetics()
            .then(allProducts => {
                setProducts(allProducts);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <h2>Products</h2>
            {products.length !== 0
                ? <section id="dashboard">
                    {products.map(product => <CatalogItem key={product._id} product={product} />)}
                </section>
                : <h2>No products yet.</h2>
            }

        </>
    )
}