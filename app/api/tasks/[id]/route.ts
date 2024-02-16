import authOptions from '@/app/auth/authOptions';
import { patchTaskSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const body = await request.json();
  const validation = patchTaskSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

    const { assignedToUserId, title, description, dueDate, status } = body;

    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: { id: assignedToUserId },
      });
      if (!user)
        return NextResponse.json(
          { error: "Invalid user." },
          { status: 400 }
        );
    }

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) }
  });
  if (!task) 
    return NextResponse.json({ error: 'Invalid task' }, { status: 404 });

  const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: {
      title,
      description,
      dueDate,
      assignedToUserId,
      status
    },
  });

  return NextResponse.json(updatedTask);
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string }}) {

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const task = await prisma.task.findUnique({
      where: { id: parseInt(params.id) }
    });
    if (!task) 
      return NextResponse.json({ error: 'Invalid task' }, { status: 404 });  

    await prisma.task.delete({
      where: { id: task.id },
      
    });
  
    return NextResponse.json({});

}