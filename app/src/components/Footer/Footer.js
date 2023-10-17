import { Link } from 'react-router-dom';
import './footer.css';


export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-container-inner">
                    <Link className="footer-link">Policies</Link>
                    <Link className="footer-link">Terms & Conditions</Link>
                    <Link className="footer-link">FAQ</Link>
                </div>
            </div>
        </div>
    )
}