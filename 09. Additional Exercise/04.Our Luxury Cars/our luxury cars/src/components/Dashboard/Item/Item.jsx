import { Link } from 'react-router-dom';

export const Item = ({
    car,
}) => {
    return (
        <div className="car">
            <img src={car.imageUrl} alt="example1" />
            <h3 className="model">{car.model}</h3>
            <div className="specs">
                <p className="price">Price: {car.price}</p>
                <p className="weight">Weight: {car.weight} kg</p>
                <p className="top-speed">Top Speed: {car.speed} kph</p>
            </div>
            <Link className="details-btn" to={`/details-page/${car._id}`}>More Info</Link>
        </div>
    )
}