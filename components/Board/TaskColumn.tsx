import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task } from "@/types";
import TaskItem from "./TaskItem";
import Image from "next/image";
import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
  DatePicker,
} from "@heroui/react";

interface Props {
  droppableId: string;
  tasks: Task[];
  showTask: boolean;
  setShowTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const stickers = [
  { name: "angel", path: "/images/stickers/task/angel.png" },
  { name: "angry", path: "/images/stickers/task/angry.png" },
  { name: "closed_eye", path: "/images/stickers/task/closed_eye.png" },
  { name: "coffe", path: "/images/stickers/task/coffe.png" },
  { name: "cool", path: "/images/stickers/task/cool.png" },
  { name: "cry", path: "/images/stickers/task/cry.png" },
  { name: "curious", path: "/images/stickers/task/curious.png" },
  { name: "cute", path: "/images/stickers/task/cute.png" },
  { name: "dissapointed", path: "/images/stickers/task/dissapointed.png" },
  { name: "dumb", path: "/images/stickers/task/dumb.png" },
  { name: "eating", path: "/images/stickers/task/eating.png" },
  { name: "excited", path: "/images/stickers/task/excited.png" },
  { name: "in_love", path: "/images/stickers/task/in_love.png" },
  { name: "indifferent", path: "/images/stickers/task/indifferent.png" },
  { name: "love_glasses", path: "/images/stickers/task/love_glasses.png" },
  { name: "love_kiss", path: "/images/stickers/task/love_kiss.png" },
  { name: "nervous", path: "/images/stickers/task/nervous.png" },
  { name: "normal", path: "/images/stickers/task/normal.png" },
  { name: "question", path: "/images/stickers/task/question.png" },
  { name: "sad", path: "/images/stickers/task/sad.png" },
  { name: "scared", path: "/images/stickers/task/scared.png" },
  { name: "smile", path: "/images/stickers/task/smile.png" },
  { name: "surprised", path: "/images/stickers/task/surprised.png" },
  { name: "thinking", path: "/images/stickers/task/thinking.png" },
  { name: "unmotivated", path: "/images/stickers/task/unmotivated.png" },
  { name: "very_dumb", path: "/images/stickers/task/very_dumb.png" },
  { name: "waiting_love", path: "/images/stickers/task/waiting_love.png" },
  { name: "waiting_sad", path: "/images/stickers/task/waiting_sad.png" },
  { name: "waiting", path: "/images/stickers/task/waiting.png" },
  { name: "worried", path: "/images/stickers/task/worried.png" },
];

export const TaskColumn = ({
  droppableId,
  tasks,
  showTask,
  setShowTask,
}: Props) => {
  const [taskName, setTaskName] = React.useState<string>("");
  const [taskSticker, setTaskSticker] = React.useState<string>("");
  const [isStickerSelected, setIsStickerSelected] = React.useState(false);
  const taskInput = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  async function handleAddTask() {
    // if (!taskName) return;
    // const createAction = await createTask(name);
    // if (createAction) {
    //   router.refresh();
    // }
    // Clear input
    taskInput.current!.value = "";
    setTaskName("");
  }

  function handleSelectSticker(newSticker: string) {
    if (newSticker != taskSticker) {
      setIsStickerSelected(false);
      setTaskSticker(newSticker);
      return;
    }
    setTaskSticker("");
    setIsStickerSelected(false);
  }

  return (
    <Droppable droppableId={droppableId} type="column">
      {(provided) => (
        <>
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-2/4 h-full flex px-1 flex-col gap-3">
            {(droppableId === "pending" && showTask) && (
              <li className="w-full h-36 bg-white border-zinc-400 border-2 rounded-2xl p-5 relative group flex flex-col justify-between">
                <Image
                  src="/images/pin.png"
                  alt="Pin"
                  width={50}
                  height={50}
                  className="absolute -top-5 left-0 right-0 mx-auto"
                />
                <input
                  type="text"
                  className=" border-none outline-none text-lg text-primary font-bold"
                  ref={taskInput}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                  placeholder="New task..."
                />
                <div className="ml-auto flex gap-2 items-center">
                  <Button
                    onPress={() => {
                      setShowTask(false);
                    }}
                    isIconOnly
                    className="bg-transparent min-w-fit w-fit h-fit"
                    radius="none">
                    <svg
                      className="text-primary size-4"
                      fill="currentColor"
                      viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  </Button>
                  <Popover
                    placement="bottom"
                    showArrow={true}
                    isOpen={isStickerSelected}
                    onOpenChange={(open) => setIsStickerSelected(open)}>
                    <PopoverTrigger>
                      <Button
                        isIconOnly
                        className="bg-transparent min-w-fit w-fit h-fit relative"
                        radius="none">
                        {taskSticker && (
                          <div className="size-2 bg-primary rounded-full absolute top-0 right-0"></div>
                        )}
                        <svg className="size-5" fill="none" viewBox="0 0 24 24">
                          <path
                            d="M21.93 12.86C21.91 13.05 21.88 13.23 21.83 13.41C20.79 12.53 19.44 12 17.97 12C14.66 12 11.97 14.69 11.97 18C11.97 19.47 12.5 20.82 13.38 21.86C13.2 21.91 13.02 21.94 12.83 21.96C11.98 22.04 11.11 22 10.21 21.85C6.09999 21.15 2.78999 17.82 2.10999 13.7C0.97999 6.85002 6.81999 1.01002 13.67 2.14002C17.79 2.82002 21.12 6.13002 21.82 10.24C21.97 11.14 22.01 12.01 21.93 12.86Z"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21.83 13.41C21.69 13.9 21.43 14.34 21.06 14.71L14.68 21.09C14.31 21.46 13.87 21.72 13.38 21.86C12.5 20.82 11.97 19.47 11.97 18C11.97 14.69 14.66 12 17.97 12C19.44 12 20.79 12.53 21.83 13.41Z"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="grid grid-cols-3 py-2 gap-y-2 max-h-40 overflow-y-auto">
                        {stickers.map((sticker, index) => (
                          <Button
                            key={index}
                            className="h-min bg-transparent"
                            size="lg"
                            onClick={() => handleSelectSticker(sticker.name)}>
                            <Image
                              src={sticker.path}
                              alt="alt"
                              width={50}
                              height={50}
                            />
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                    isIconOnly
                    className="bg-primary rounded-full w-fit"
                    size="sm"
                  // onPress={handleAddEvent}
                  >
                    <svg
                      fill="currentColor"
                      className="size-5 text-secondary"
                      viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                      />
                    </svg>
                  </Button>
                </div>
                {/* <Image className="absolute -bottom-5 right-3" src={taskSticker} alt="Sticker" width={80} height={80} /> */}
              </li>
            )}
            {tasks
              .filter((task) => task.state === droppableId)
              .map((task: Task, index: number) => {
                return (
                  <TaskItem
                    key={task._id}
                    task={task}
                    index={index}
                    columnId={droppableId}
                    showTask={showTask}
                    setShowTask={setShowTask}
                  />
                );
              })}
            {provided.placeholder}
          </ul>
        </>
      )}
    </Droppable>
  );
};
