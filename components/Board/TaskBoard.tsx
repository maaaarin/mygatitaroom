"use client";
import { State, Task } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import { TaskColumn } from "./TaskColumn";

const initialTasks: Task[] = [
  {
    _id: "6782efe77ff2657f21b15692",
    name: "appeller psy 06 51 71 12 98",
    state: "pending",
    sticker: "/images/stickers/task/sad.png",
    order: 2,
  },
  {
    _id: "679ca27cb147cae0a29ac17a",
    name: "gata",
    state: "pending",
    sticker: "/images/stickers/task/coffe.png",
    order: 0,
  },
  {
    _id: "67afd34e2fbe47341bb7028a",
    name: "raccordement fibre 15h 17h",
    state: "pending",
    sticker: "/images/stickers/task/dumb.png",
    order: 1,
  },
];

const stickers = [
  { name: "angel", path: "/images/stickers/angel.png" },
  { name: "angry", path: "/images/stickers/angry.png" },
  { name: "closed_eye", path: "/images/stickers/closed_eye.png" },
  { name: "coffe", path: "/images/stickers/coffe.png" },
  { name: "cool", path: "/images/stickers/cool.png" },
  { name: "cry", path: "/images/stickers/cry.png" },
  { name: "curious", path: "/images/stickers/curious.png" },
  { name: "cute", path: "/images/stickers/cute.png" },
  { name: "dissapointed", path: "/images/stickers/dissapointed.png" },
  { name: "dumb", path: "/images/stickers/dumb.png" },
  { name: "eating", path: "/images/stickers/eating.png" },
  { name: "excited", path: "/images/stickers/excited.png" },
  { name: "in_love", path: "/images/stickers/in_love.png" },
  { name: "indifferent", path: "/images/stickers/indifferent.png" },
  { name: "love_glasses", path: "/images/stickers/love_glasses.png" },
  { name: "love_kiss", path: "/images/stickers/love_kiss.png" },
  { name: "nervous", path: "/images/stickers/nervous.png" },
  { name: "normal", path: "/images/stickers/normal.png" },
  { name: "question", path: "/images/stickers/question.png" },
  { name: "sad", path: "/images/stickers/sad.png" },
  { name: "scared", path: "/images/stickers/scared.png" },
  { name: "smile", path: "/images/stickers/smile.png" },
  { name: "surprised", path: "/images/stickers/surprised.png" },
  { name: "thinking", path: "/images/stickers/thinking.png" },
  { name: "unmotivated", path: "/images/stickers/unmotivated.png" },
  { name: "very_dumb", path: "/images/stickers/very_dumb.png" },
  { name: "waiting_love", path: "/images/stickers/waiting_love.png" },
  { name: "waiting_sad", path: "/images/stickers/waiting_sad.png" },
  { name: "waiting", path: "/images/stickers/waiting.png" },
  { name: "worried", path: "/images/stickers/worried.png" },
];


const states = [
  {
    name: "pending",
    description: "The task or process is currently awaiting action or completion.",
  },
  {
    name: "done",
    description: "The task or process has been completed successfully.",
  }
];

type Props = {
  showTask: boolean;
  setShowTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TaskBoard =({ showTask, setShowTask }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const router = useRouter();

  const sortTasksByOrder = (tasks: any[]) => {
    return [...tasks].sort((a, b) => a.order - b.order);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
    setTasks(sortTasksByOrder(tasks));
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    const newTasks = [...tasks];
    // Drag on same area
    if (source.droppableId === destination.droppableId) {
      const tasksInColumn = newTasks.filter(task => task.state === source.droppableId);
      const movedTask = tasksInColumn.find(task => task.order === source.index);
      const destinationTask = tasksInColumn.find(
        (task) => task.order == destination.index
      );
      // Detect the direction in which it moves
      if (movedTask && destinationTask) {
        console.log(movedTask)
        console.log(destinationTask)
        if (source.index < destination.index) {
          // Subtract down
          tasksInColumn.forEach((task) => {
            if (task.order > movedTask.order && task.order <= destinationTask.order) {
              task.order--;
            }
          })
          // Change the order of source to that of destination
          movedTask.order = destination.index
        } else {
          // Add up
          tasksInColumn.forEach((task) => {
            if (task.order < movedTask.order && task.order >= destinationTask.order) {
              task.order++;
            }
          })
          // Change the order of source to that of destination
          movedTask.order = destination.index
        }
      }
      // Update the original array
      newTasks.forEach(task => {
        if (task.state === source.droppableId) {
          const updatedTask = tasksInColumn.find(t => t._id === task._id);
          if (updatedTask) {
            task.order = updatedTask.order;
          }
        }
      });
      const sortedTasks = sortTasksByOrder(newTasks);
      setTasks(sortedTasks);
    } else {
      // From element, subtract downwards
      const tasksOriginColumn = newTasks.filter(task => task.state === source.droppableId);
      const tasksDestinationColumn = newTasks.filter(task => task.state === destination.droppableId);
      const movedTask = tasksOriginColumn.find(task => task.order === source.index);
      tasksOriginColumn.forEach((task) => {
        if (task.order > source.index) {
          task.order--;
        }
      })
      // In the other column, starting from the destination element, add downwards.
      tasksDestinationColumn.forEach((task) => {
        if (task.order >= destination.index) {
          task.order++;
        }
      })
      // Assign the index to the source element and change state
      if (movedTask) {
        movedTask.order = destination.index
        movedTask.state = destination.droppableId
      }
      // Update the original array
      newTasks.forEach(task => {
        if (task.state === source.droppableId) {
          const updatedTask = tasksOriginColumn.find(t => t._id === task._id);
          if (updatedTask) {
            task.order = updatedTask.order;
          }
        } else if (task.state === destination.droppableId) {
          const updatedTask = tasksDestinationColumn.find(t => t._id === task._id);
          if (updatedTask) {
            task.order = updatedTask.order;
          }
        }
      });
      const sortedTasks = sortTasksByOrder(newTasks);
      setTasks(sortedTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="w-2/4 h-full flex relative">
        {/* Categories */}
        <div className="size-full flex overflow-y-au">
          {isBrowser
            ? states.map((state: State, index: number) => {
              return (
                <TaskColumn key={index} droppableId={state.name} tasks={tasks} showTask={showTask} setShowTask={setShowTask}/>
              );
            })
            : null}
        </div>
      </section>
    </DragDropContext>
  );
}
