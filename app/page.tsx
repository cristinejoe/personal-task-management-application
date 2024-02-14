import prisma from "@/prisma/client";
import TaskSummary from "./TaskSummary";
import TaskChart from "./TaskChart";
import LatestTasks from "./LatestTasks";

export default async function Home() {
  const open = await prisma.task.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.task.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.task.count({
    where: { status: "CLOSED" },
  });

  return <TaskChart open={open} inProgress={inProgress} closed={closed} />;
}
