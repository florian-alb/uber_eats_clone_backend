import {PrismaClient} from "@prisma/client";

const reviewClient = new PrismaClient().review

// getAllReviews
export const getAllReviews = async (req: any, res: any) => {
    try {
        const allReviews = await reviewClient.findMany({
            include : {
                shop: true,
            }
        })
        res.status(200).json({data: allReviews})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the reviews"})
    }
}

// getReviewById
export const getReviewById = async (req: any, res: any) => {
    try {
        const reviewId = req.params.id;
        const review = await reviewClient.findUnique({
            where: {
                id: reviewId,
            },
            include : {
                shop: true,
            }
        })
        if (review) {
            res.status(200).json({data: review});
        } else {
            res.status(404).json({message: `The review with ID ${reviewId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the review with ID ${req.params.id}`});
    }
};

// createReview
export const createReview = async (req: any, res: any) => {
    try {
        const reviewData = req.body
        const review = await reviewClient.create({
            data: reviewData,
        })
        res.status(201).json({data: review})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new review"})
    }
}

// updateReview
export const updateReview = async (req: any, res: any) => {
    try {
        const reviewId = req.params.id
        const reviewData = req.body
        const review = await reviewClient.update({
            where: {
                id: reviewId,
            },
            data: reviewData,
        })
        res.status(200).json({data: review})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the review"})
    }
}

// deleteReview
export const deleteReview = async (req: any, res: any) => {
    try {
        const reviewId = req.params.id
        await reviewClient.delete({
            where: {
                id: reviewId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the review"})
    }
}