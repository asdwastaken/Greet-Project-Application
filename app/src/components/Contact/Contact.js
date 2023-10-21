import './contact.css';
import Button from '../Button/Button';

export default function Contact() {
    return (
        <div className="contact">
            <h1>Contact Us</h1>

            <div className="contact-container">
                <div className="contact-container-inner">
                    <h3>Call Us</h3>
                    <span>Monday to Friday, 9am to 4pm</span>
                    <span><b>1-000-000-0000</b></span>
                </div>
                <div className="contact-container-inner">
                    <h3>Live Chat</h3>
                    <span>Chat with a member of our team.</span>
                    <Button path='/chat' value='Start Live Chat'/>
                </div>

            </div>
        </div>
    )
}