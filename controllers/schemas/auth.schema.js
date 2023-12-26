const { z } = require('zod');

exports.loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['BUYER', 'SELLER']),
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
const passwordError =
    'Password must be 8-32 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char';

exports.registerBuyerSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordRegex, passwordError),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    address: z.string().min(10),
    pinCode: z.string().min(3).max(10),
});

exports.registerSellerSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordRegex, passwordError),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    address: z.string().min(10),
    pinCode: z.string().min(3).max(10),
    codeIec: z.string(),
    codeAd: z.string(),
    gstin: z.string().length(15),
});

exports.EditBuyerSchema = z.object({
    email: z.string().email().optional(),
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    address: z.string().min(10).optional(),
    pinCode: z.string().min(3).max(10).optional(),
});

exports.EditSellerSchema = z.object({
    email: z.string().email().optional(),
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    address: z.string().min(10).optional(),
    pinCode: z.string().min(3).max(10).optional(),
    codeIec: z.string().optional(),
    codeAd: z.string().optional(),
    gstin: z.string().length(15).optional(),
    lutDocument: z.string().optional(),
});
