import prisma from "@/prisma/client";
import TaskSummary from "./TaskSummary";

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

  return <TaskSummary open={open} inProgress={inProgress} closed={closed} />;
}
