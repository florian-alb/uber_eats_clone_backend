import {Router} from "express";
import {createReview, deleteReview, getAllReviews, getReviewById, updateReview} from "../controllers/review.controller";

const reviewRouter = Router()

reviewRouter.get('/', getAllReviews)
reviewRouter.get("/:id", getReviewById)
reviewRouter.post('/', createReview)
reviewRouter.put("/:id", updateReview)
reviewRouter.delete("/:id", deleteReview)

export default reviewRouter