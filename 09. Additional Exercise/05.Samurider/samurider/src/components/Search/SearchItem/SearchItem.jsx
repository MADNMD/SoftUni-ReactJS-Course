import { Link } from "react-router-dom"

export const SearchItem = ({
    moto,
}) => {
    return (
        <div className="motorcycle">
            <img src={moto.imageUrl} alt="example1" />
            <h3 className="model">{moto.model}</h3>
            <Link className="details-btn" to={`/details-page/${moto._id}`}>More Info</Link>
        </div>
    )
}