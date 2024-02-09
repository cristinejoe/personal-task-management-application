'use client'

import { Spinner } from '@/app/components';
import { Cross1Icon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteTaskButton =  ({ taskId }: { taskId: number}) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const deleteTask = async () => {
        try {
          setDeleting(true);
          await axios.delete('/api/tasks/' + taskId);
          router.push('/tasks/list');
          router.refresh();
        } catch (error) {
          setDeleting(false);
          setError(true);
        }
      };
    return (
      <>
        <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
          <Cross1Icon />
            Delete Task
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this task? This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant='soft' color="gray">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
          <Button color="red" onClick={deleteTask}>Delete Task</Button>
          </AlertDialog.Action>
        </Flex>
        </AlertDialog.Content>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This task could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
      </>
      
      
    );
  };

export default DeleteTaskButton