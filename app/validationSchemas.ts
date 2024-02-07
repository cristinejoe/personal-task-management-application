import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(1, { message: 'Title is required'}).max(255),
    description: z.string().min(1, { message: 'Description is required'}),
    dueDate: z.string()
        .refine((value) => {
            const date = new Date(value);
            return !isNaN(date.getTime());
        }, { message: "Invalid date" })
        .transform((value) => new Date(value)),
});
