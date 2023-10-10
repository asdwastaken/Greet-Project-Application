import './home.css';

import homeImage1 from '../../content/images/home-image1.png';
import homeImage2 from '../../content/images/home-image2.png';
import homeImage3 from '../../content/images/home-image3.png';



export default function Home() {
    return (
        <div className="home">
            <div className="home-container">
                <div className="home-headings">
                    <h1>Book Your Greet</h1>
                    <h3>Meet your favourite creator</h3>
                    <h3>Take a look behind the scenes</h3>
                </div>

                <div className="home-images-container">
                    <img src={homeImage1} className="home-image" />
                    <img src={homeImage3} className="home-image" />
                    <img src={homeImage2} className="home-image" />

                </div>
            </div>
        </div>
    )
}