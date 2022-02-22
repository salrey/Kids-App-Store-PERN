import axios from "axios";
import { useEffect, useState } from "react";
import  { useParams } from "react-router-dom";
import FormatReviews from "./FormatReviews";

const API = process.env.REACT_APP_API_URL;

const Reviews = () => {
    const [ reviews, setReviews ] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get((`${API}/apps/${id}/reviews`))
        .then((response) => {console.log(response.data.payload); return setReviews(response.data.payload)})
        .catch((err) => console.warn(err))
    }, [id]);

    return (
        <section className="Reviews">
            {reviews.map((review) => <FormatReviews key={review.id} review={review} />)}
        </section>
    )
}

export default Reviews;