import React, { useEffect } from "react";
import {
    Draggable,
} from "react-beautiful-dnd";
import { Task } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "@heroui/react";

interface Props {
    index: number;
    task: Task;
    columnId: string;
    showTask: boolean;
    setShowTask: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskItem({ task, index, columnId, showTask, setShowTask }: Props) {
    function taskRemove(taskId: string, state: string) {
        // removeTask(taskId, state);
        // router.refresh();
    }

    return (
        <Draggable draggableId={task._id!} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={clsx(
                        "w-full h-36 bg-white border-zinc-400 border-2 rounded-2xl p-5 relative group flex flex-col justify-between",
                        {
                            "!bg-[#FFE1F7] !border-primary border-2": columnId === "done",
                        }
                    )}>
                    <Image src="/images/pin.png" alt="Pin" width={50} height={50} className="absolute -top-5 left-0 right-0 mx-auto" />
                    <div className="text-normal text-primary font-bold">{task.name}</div>
                    <Button className="size-6 bg-zinc-200 rounded-full" isIconOnly size='sm'>
                        <svg className="size-4" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </Button>
                    <Image className="absolute -bottom-5 right-3" src={task.sticker} alt="Sticker" width={80} height={80} />
                </li>
            )}
        </Draggable>
    );
}
