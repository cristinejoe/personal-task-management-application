'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';


interface TaskForm {
  title: string;
  description: string;
  dueDate: Date;
}

const newTaskPage = () => {

  const router = useRouter();
  const {register, control, handleSubmit} = useForm<TaskForm>();
  const [error, setError] = useState('');
  
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form 
        className='space-y-3' 
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/tasks', data);
            router.push('/tasks')
          } catch (error) {
            setError('An unexpected error occurred.');
          }
          
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
    </div>
  )
}

export default newTaskPage