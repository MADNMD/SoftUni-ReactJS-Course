import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <section id="home">
            <div className="home-intro">
                <h1 className="fancy">Welcome to our community-driven events website! We believe that the best events
                    come from the community.</h1>

                <p>So why wait? Join our community today and start
                    discovering and sharing the best events in your area!</p>
                <Link className="event-btn" to="/dashboard">To Events</Link>
            </div>
            <img className="party-img" src="./public/images/party people.png" alt="event" />
        </section>
    )
}