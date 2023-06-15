import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import "./Article.css";

const Article = ({ _id, title, summary, createdAt, image, author }) => {
  return (
    <article>
      <div className="img">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:3000/" + image} alt="image" />
        </Link>
      </div>
      <div className="text">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="#">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </article>
  );
};

export default Article;
