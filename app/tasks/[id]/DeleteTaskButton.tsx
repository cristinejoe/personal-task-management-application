import { Button } from '@radix-ui/themes'

const DeleteTaskButton =  ({ taskId }: { taskId: number}) => {
    return (
      <Button color="red">Delete Task</Button>
    )
  }

export default DeleteTaskButton