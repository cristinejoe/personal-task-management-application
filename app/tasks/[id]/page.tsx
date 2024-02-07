import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: { id: string }
}
  

const TaskDetailPage = async ({ params }: Props) => {

const task = await prisma.task.findUnique({
  where: { id: parseInt(params.id) }
  });

  if (!task)
  notFound();
    
  return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <p>{task.createdAt.toDateString()}</p>
    </div>
  )
}

export default TaskDetailPage