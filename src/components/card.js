import { Link } from "react-router-dom";
import style from "./card.module.css";

function Card(props) {
  return (
    <Link to={props.link} className={`col-md-4 p-1 ${style["cardHeading"]}`}>
      {props.loading ? <p>Loading...</p> : null}

      <div key={props.index}>
        <img
          src={process.env.PUBLIC_URL + `/shoes${props.index + 1}.jpg`}
          width="80%"
          alt=""
        />
        <h2>{props.title}</h2>
        <p>{props.content}</p>
      </div>
    </Link>
  );
}
export default Card;
