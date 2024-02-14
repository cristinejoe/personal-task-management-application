import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";

interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="md:col-span-4">
        <TaskDetails task={task} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect task={task} />
            <EditTaskButton taskId={task.id} />
            <DeleteTaskButton taskId={task.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: task?.title,
    description: "Details of task " + task?.id,
  };
}

export default TaskDetailPage;
