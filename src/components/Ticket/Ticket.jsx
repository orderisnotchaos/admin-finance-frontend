

import "./Ticket.css";

import { Link } from "react-router-dom";

export default function Ticket(props) {

    return(
        <p className="ticket-name">{props.ticket ? <Link to={'/'}>{props.ticket.name}</Link> : ''}</p>
    );
}