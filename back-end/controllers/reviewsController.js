const express = require("express");
const {
  getAppReviews,
  getReview,
  newReview,
  updateReview,
  deleteReview,
} = require("../queries/reviews");

const reviews = express.Router({mergeParams: true});

//INDEX
reviews.get("/", async (req, res) => {
    const reviews = await getAppReviews(req.params.id);

    if(reviews.length === 0){
        res.status(500).json({error: 'server error'})
    } else {
        res.status(200).json({ payload: reviews })
    }
});

//SHOW
reviews.get("/:review_id", async (req, res) => {
  console.log("GET to /reviews/:review_id");
  try {
      const review = await getReview(req.params.id, req.params.review_id);
      if (review.id) {
        res.status(200).json({ success: true, payload: review });
      } else {
        res.status(404).json({ success: false, payload: "Review not found" });
      }
  } catch(err) {
      throw err
  }
});

//CREATE
reviews.post("/", async (req, res) => {
  console.log("POST to /reviews");
  try {
      const review = await newReview(req.body, req.params.id);
      if (review.id) {
        res.status(200).json({ success: true, payload: review });
      } else {
        res.status(404).json({ success: false, payload: "Failed to create new review" });
      }
      
  } catch(err) {
      throw err
  }
});

reviews.put("/:review_id", async (req, res) => {
  console.log("PUT to /reviews/:review_id");
  try {
      const review = await updateReview(req.params.id, req.params.review_id, req.body);
      if (review.id) {
        res.status(200).json({ success: true, payload: review});
      } else {
        res.status(404).json({ success: false, payload: "Review could not be updated" });
    }

  } catch(err) {
      throw err
  }
});

reviews.delete("/:review_id", async (req, res) => {
  console.log("DELETE to /reviews/:review_id");
  try {
      const review = await deleteReview(req.params.id, req.params.review_id);
      if (review.id) {
        res.status(200).json({ success: true, payload: review });
      } else {
        res.status(404).json({ success: false, payload: `Review with id of ${req.params.review_id} could not be deleted` });
      }

  } catch(err) {
      throw err
  }
});

module.exports = reviews;
