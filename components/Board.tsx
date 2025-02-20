"use client"
import React, { useState } from 'react'
import { TaskBoard } from './Board/TaskBoard'
import { ListBoard } from './Board/ListBoard'
import { EventBoard } from './Board/EventBoard'
import Image from 'next/image'

export const Board = () => {
  const [showTask, setShowTask] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showEvent, setShowEvent] = useState(false);

  return (
    <div className='w-screen h-screen flex gap-5 p-12 px-32'>
      <TaskBoard showTask={showTask} setShowTask={setShowTask} />
      <ListBoard showList={showList} setShowList={setShowList} />
      <EventBoard showEvent={showEvent} setShowEvent={setShowEvent} />
      <div className="fixed bottom-10 left-0 right-0 mx-auto w-fit h-auto px-6 py-1 flex items-center justify-center gap-4 bg-white rounded-full border-primary border-2">
        <div className="group">
          <Image
            src="/images/task.png"
            alt="Task"
            width={40}
            height={40}
            className="transition-transform duration-200 group-hover:-translate-y-2 cursor-pointer"
            onClick={() => setShowTask(true)}
          />
        </div>
        <div className="group">
          <Image
            src="/images/list.svg"
            alt="List"
            width={40}
            height={40}
            className="transition-transform duration-200 group-hover:-translate-y-2 cursor-pointer"
            onClick={() => setShowList(true)}
          />
        </div>
        <div className="group">
          <Image
            src="/images/event.svg"
            alt="Event"
            width={40}
            height={40}
            className="transition-transform duration-200 group-hover:-translate-y-2 cursor-pointer"
            onClick={() => setShowEvent(true)}
          />
        </div>
      </div>
    </div>
  );
};