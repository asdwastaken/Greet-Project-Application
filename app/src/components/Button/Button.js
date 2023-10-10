import './button.css';

import { Link } from 'react-router-dom';

export default function Button({
    path,
    value
}) {
    return (
        <Link to={path} className="button">{value}</Link>
    )
}