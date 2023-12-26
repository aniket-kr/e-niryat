const { z } = require('zod');

exports.createProductSchema = z.object({
    name: z.string().min(1),
    images: z.array(z.string().url()),
    priceInInr: z.number().min(1),
    description: z.string().min(1),
    weight: z.number(),
    height: z.number(),
    quantity: z.number(),
    hsCode: z.string(),

    tags: z.array(z.string()),
});
