import { Link } from "react-router-dom"

export const DashboardItem = ({
    event
}) => {
    return (
        <div className="event">
            <img src={event.imageUrl} alt="example1" />
            <p className="title">{event.name}</p>
            <p className="date">{event.date}</p>
            <Link className="details-btn" to={`/details/${event._id}`}>Details</Link>
        </div>
    )
}