import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import {TaskStatusBadge, Link} from '@/app/components';
import TaskActions from './TaskActions';
import { Task, Status } from "@prisma/client";
import NextLink from 'next/link';
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props { 
  searchParams: { status: Status, orderBy: keyof Task  }
}

const TasksPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Task;
    className?: string;
  }[] = [
    { label: "Task", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    { label: "Description", 
      value: "description",
      className: "hidden md:table-cell", 
    },
    {
      label: "Due Date",
      value: "dueDate",
      className: "hidden md:table-cell",
    },
  ];


  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) 
    ? searchParams.status
    : undefined;

  const orderBy = columns
  .map(column => column.value)
  .includes(searchParams.orderBy)
  ? { [searchParams.orderBy]: 'asc' }
  : undefined;

  const tasks = await prisma.task.findMany({
    where: {
      status,
    },
    orderBy
  });
  return (
    <div>
      <TaskActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
          {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value }                  
                }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map(task => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Link href={`/tasks/${task.id}`}>
                  {task.title}
                </Link>
                <div className='block md:hidden'>
                  <TaskStatusBadge status={task.status}/>
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <TaskStatusBadge status={task.status}/>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{task.description}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{task.dueDate.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
    
export const dynamic = 'force-dynamic';

export default TasksPage