'use client';

import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface TaskForm {
  title: string;
  description: string;
  dueDate: Date;
}

const newTaskPage = () => {

  const router = useRouter();
  const {register, control, handleSubmit} = useForm<TaskForm>();
  
  return (
    <form 
      className='max-w-xl space-y-3' 
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/tasks', data);
        router.push('/tasks')
      })}>
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({field}) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: Date) => field.onChange(date)}
              placeholderText="Due Date"
            />
          )}
        />
        <Button>Create New Task</Button>
    </form>
  )
}

export default newTaskPage