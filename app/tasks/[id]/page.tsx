import TaskStatusBadge from '@/app/components/TaskStatusBadge';
import prisma from '@/prisma/client';
import { Heading, Flex, Card, Text } from '@radix-ui/themes';
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
      <Heading>{task.title}</Heading>
      <Flex className="space-x-3" my="2">
        <TaskStatusBadge status={task.status} />
        <Text>{task.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{task.description}</p>
      </Card>
    </div>
  )
}

export default TaskDetailPage