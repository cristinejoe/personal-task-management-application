import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';

const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    dueDate: z.string()
    .refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, { message: "Invalid date" })
    .transform((value) => new Date(value)),
});

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

    const newTask = await prisma.task.create({
        data: {
            title: body.title,
            description: body.description,
            dueDate: body.dueDate
        },
    });    

    return NextResponse.json(newTask, {status: 201});
}