"use client";

import React from "react";
import { Task } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const StatusSelect = ({ task }: { task: Task }) => {
  const assignStatus = async (newStatus: string) => {
    try {
      await axios.patch(`/api/tasks/${task.id}`, {
        status: newStatus,
      });
      toast.success("Status updated successfully.");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={task.status || " "}
        onValueChange={assignStatus}
      >
        <Select.Trigger placeholder="Select status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            <Select.Item value="OPEN">Open</Select.Item>
            <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
            <Select.Item value="CLOSED">Closed</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
