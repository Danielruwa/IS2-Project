import TopNav from "./TopNav";
import Footer from "./Footer";

export default function About() {
    return (
        <>
        <TopNav />
            <div className="about-page">
                <div className="about-content">
                    <h2>About Us</h2>
                    <p>
                        Welcome to Worthwise, your go-to platform for all your real estate needs.
                        Our mission is to make buying and selling properties a seamless experience
                        for everyone involved. Whether you are a buyer, seller, or real estate agent,
                        Worthwise provides a user-friendly and efficient platform to meet your needs.
                    </p>
                    <p>
                        At Worthwise, we understand the importance of finding the perfect property.
                        That's why we offer a wide range of listings, from cozy apartments to spacious
                        family homes. Our platform is designed to empower users with the information
                        they need to make informed decisions about their real estate transactions.
                    </p>
                    <p>
                        Our team is dedicated to providing excellent service and ensuring that
                        Worthwise remains a trusted and reliable platform in the real estate industry.
                        If you have any questions or feedback, feel free to reach out to our support team.
                    </p>
                </div>
            </div>
            <Footer/>
        </>
    )
}