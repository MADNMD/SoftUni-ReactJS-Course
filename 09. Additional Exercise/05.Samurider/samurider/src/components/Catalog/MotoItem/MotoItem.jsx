import { Link } from "react-router-dom";

export const MotoItem = ({
    moto,
}) => {
    return (
        <div className="motorcycle">
            <img src={moto.imageUrl} alt="example1" />
            <h3 className="model">{moto.model}</h3>
            <p className="year">Year: {moto.year}</p>
            <p className="mileage">Mileage: {moto.mileage} km.</p>
            <p className="contact">Contact Number: {moto.contact}</p>
            <Link className="details-btn" to={`/details-page/${moto._id}`}>More Info</Link>
        </div>
    )
}