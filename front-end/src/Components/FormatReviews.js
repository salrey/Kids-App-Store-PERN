const Review = ({ review }) => {
    return (
        <div className="Review">
            <h4>{review.title}</h4> 
            <span>{review.rating}</span>
            <h5>{review.reviewer}</h5>
            <p>{review.content}</p>
        </div>
    )
};

export default Review;