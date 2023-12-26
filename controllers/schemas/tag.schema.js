const { z } = require('zod');

exports.createTagSchema = z.object({
    label: z.string().min(1),
});
