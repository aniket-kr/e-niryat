const { z } = require('zod');

exports.createReviewSchema = z.object({
    review: z.string().min(1),
    stars: z.number().int().min(1).max(5),
    productSlug: z.string().min(1)
});
