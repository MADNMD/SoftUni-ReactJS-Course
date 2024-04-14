import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as cosmeticService from '../../Services/cosmeticService';
import * as buyService from '../../Services/buyService';
import { useAuthContext } from '../../contexts/AuthContext';
import { DeleteModal } from "../DeleteModal";

export const Details = () => {

    const { productId } = useParams();
    const { userId, isAuthenticated } = useAuthContext();
    const [product, setProduct] = useState({});
    const [isBuy, setIsBuy] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        buyService.getAllBuy(productId)
            .then(count => {
                setIsBuy(count)
            })
            .catch(error => {
                console.log(error)
            })
    }, [productId]);

    const iBuy = () => {
        buyService.addBuy(productId)
            .then(() => {
                setIsBuy(prevCount => [...prevCount, { _ownerId: userId }]);
            })
            .catch(error => {
                console.log(error);
            })
    }


    useEffect(() => {
        cosmeticService.getOneProduct(productId)
            .then(productData => {
                setProduct(productData);
            })
            .catch(error => {
                console.log(error);
            })
    }, [productId]);

    const isOwner = product._ownerId === userId;
    const isBought = isBuy.some(userBuy => userBuy._ownerId === userId);

    const openDeleteBtn = () => {
        setIsDelete(true);
    }

    const cancelDeleteBtn = () => {
        setIsDelete(false);
    }

    const confirmDeleteBtn = () => {
        cosmeticService.deleteProduct(productId);
        setIsDelete(false);
        navigate('/catalog');
    }


    return (
        <>
            <section id="details">
                <div id="details-wrapper">
                    <img id="details-img" src={product.imageUrl} alt="example1" />
                    <p id="details-title">{product.name}</p>
                    <p id="details-category">
                        Category: <span id="categories">{product.category}</span>
                    </p>
                    <p id="details-price">
                        Price: <span id="price-number">{product.price}</span>$
                    </p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <h4>Bought: <span id="buys">{isBuy.length}</span> times.</h4>
                            <span>{product.description}</span>
                        </div>
                    </div>

                    {isAuthenticated &&
                        <div id="action-buttons">
                            {isOwner
                                ? <>
                                    <Link to={`/edit/${product._id}`} id="edit-btn">Edit</Link>
                                    <Link onClick={openDeleteBtn} id="delete-btn">Delete</Link>
                                </>
                                : !isBought && <Link onClick={iBuy} id="buy-btn">Buy</Link>
                            }
                            {isBought
                                ? <span id="buy-btn">You have already buy</span>
                                : null
                            }
                        </div>
                    }

                </div>
            </section>
            {isDelete
                ? <DeleteModal isConfirm={confirmDeleteBtn} isCancel={cancelDeleteBtn} />
                : null
            }

        </>
    )
}