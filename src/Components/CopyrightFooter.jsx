import { Link, useNavigate } from 'react-router-dom'
import './CopyrightFooter.css';

const CopyrightFooter = () => {
    const navigate = useNavigate();

    return (
        <footer>
            <div className='footer-stack'>
                <br/>
                <div className='footer-line'>
                    <p onClick={() => navigate("/data")} className='footer-text'>Data</p>
                    <a href="https://careers.mcdonalds.com/" target="_blank" className='footer-text'>Jobs</a>
                    <p className='footer-text'>Contact</p>
                </div>

                <p className='footer-text'>© 2024 Knule from Knule Group</p>
            </div>
        </footer>
  )
}

export default CopyrightFooter