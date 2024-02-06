'use client';

import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
//import React from 'react'
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';

const newTaskPage = () => {

  // const handleDateChange = () => {
  //   // Empty function, does nothing
  // };
  
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder='Title' />
        </TextField.Root>
        <SimpleMDE placeholder='Description' />
        <div>
          <TextField.Root>
            <TextField.Input
              placeholder="Due Date (YYYY-MM-DD)"
             
            />
          </TextField.Root>
        </div>
        {/* <div className='relative'>
        <TextField.Root>
            <TextField.Input placeholder='Due Date' />
            <DatePicker className='absolute top-full left-0 mt-1' onChange={handleDateChange} />
        </TextField.Root>
        </div>
        <DatePicker onChange={handleDateChange} /> */}
        
        
        {/* <div className='my-3 flex items-center'>
          <span className='mr-2'>Due Date:</span>
          <DatePicker onChange={handleDateChange} />
        </div> */}
        <Button>Create New Task</Button>
    </div>
  )
}

export default newTaskPage