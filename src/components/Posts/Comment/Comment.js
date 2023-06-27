import 'bootstrap/dist/css/bootstrap.min.css';
import './Comment.css'

const Comment = ({ comment }) => {
  return (
    <div className="card-body">
        <h5 className="card-title">{comment.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{comment.email}</h6>
        <p className="card-text">{comment.body}</p>
      </div>
  );
};

export default Comment;
