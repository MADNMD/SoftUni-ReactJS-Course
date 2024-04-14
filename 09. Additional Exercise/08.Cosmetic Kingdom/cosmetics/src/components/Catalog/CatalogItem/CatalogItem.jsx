import { Link } from "react-router-dom"

export const CatalogItem = ({
    product,
}) => {
    return (
        <div className="product">
            <img src={product.imageUrl} alt="example1" />
            <p className="title">{product.name}</p>
            <p><strong>Price:</strong><span className="price">{product.price}</span>$</p>
            <Link className="details-btn" to={`/details/${product._id}`}>Details</Link>
        </div>
    )
}