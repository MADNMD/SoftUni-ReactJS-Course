import { Link } from 'react-router-dom';

export const CarItem = ({
    car,
}) => {
    return (
        <div className="car">
            <img src={car.imageUrl} alt="example1" />
            <h3 className="model">{car.model}</h3>
            <Link className="details-btn" to={`/details-page/${car._id}`}>More Info</Link>
        </div>
    )
}