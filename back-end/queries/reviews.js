const db = require("../db/dbConfig");

const getAppReviews = async (id) => {
  try {
    const reviews = await db.any("SELECT * FROM reviews WHERE storeapp_id = $1", id);
    return reviews;
  } catch (err) {
    return err;
  }
};

const getReview = async (id, review_id) => {
  try {
    const review = await db.one("SELECT * FROM reviews WHERE storeapp_id=$1 AND id=$2", [id, review_id]);
    return review;
  } catch (err) {
    return err;
  }
};

const newReview = async (appReview, storeapp_id) => {
  try {
    const { reviewer, title, content, rating } = appReview

    const review = await db.one(
      "INSERT INTO reviews (storeapp_id, reviewer, title, content, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [storeapp_id, reviewer, title, content, rating]
    );
    return review;
  } catch (err) {
    return err;
  }
};

const updateReview = async (storeapp_id, review_id, appReview) => {
  try {
    const { reviewer, title, content, rating } = appReview

    const updatedReview = await db.one(
      "UPDATE reviews SET storeapp_id=$1, reviewer=$2, title=$3, content=$4, rating=$5 WHERE id=$6 RETURNING *",
      [storeapp_id, reviewer, title, content, rating, review_id]
    );
    return updatedReview;
  } catch (err) {
    return err;
  }
};

const deleteReview = async (storeapp_id, id) => {
  try {
    const review = await db.one("DELETE FROM reviews WHERE storeapp_id=$1 AND id=$2 RETURNING *", [storeapp_id, id]);

    return review;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAppReviews,
  getReview,
  newReview,
  updateReview,
  deleteReview,
};
