import { Link } from 'react-router-dom';

export const FactItem = ({
    fact
}) => {
    return (
        <div className="fact">
            <img src={fact.imageUrl} alt="example1" />
            <h3 className="category">{fact.category}</h3>
            <p className="description">{fact.description}</p>
            <Link className="details-btn" to={`/details-fact/${fact._id}`}>More Info</Link>
        </div>
    )
}