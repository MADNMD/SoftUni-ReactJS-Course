import { Link } from "react-router-dom";

export const DashboardItem = ({
    hero,
}) => {
    return (
        <div className="character">
            <img src={hero.imageUrl} alt="example1" />
            <div className="hero-info">
                <h3 className="category">{hero.category}</h3>
                <p className="description">{hero.description}</p>
                <Link className="details-btn" to={`/details-page/${hero._id}`}>More Info</Link>
            </div>
        </div>
    )
}