import TaskStatusBadge from '@/app/components/TaskStatusBadge';
import prisma from '@/prisma/client';
import { Heading, Flex, Card, Text, Grid, Box, Button } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
    <Grid columns={{initial: "1", md: "2"}} gap="5">
      <Box>
        <Heading>{task.title}</Heading>
        <Flex className="space-x-3" my="2">
          <TaskStatusBadge status={task.status} />
          <Text>{task.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt='4'>
          <ReactMarkdown>{task.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
      <Button>
        <Pencil2Icon />
        <Link href={`/tasks/${task.id}/edit`}>Edit Issue</Link>
      </Button>
      </Box>
    </Grid>
  )
}

export default TaskDetailPage