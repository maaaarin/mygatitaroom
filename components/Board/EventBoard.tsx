"use client"
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
import React, { useEffect } from "react";
import { format, isToday, setDate } from "date-fns";
// import { createEvent, deleteEvent } from "@/lib/actions/events.actions";
import { useRouter } from "next/navigation";
import { Event } from "@/types";
// import { createTask } from "@/lib/actions/task.actions";
import Image from "next/image";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

const colors = [
    {
        name: "Rose",
        color: "#FD0F76",
    },
    {
        name: "Malachite",
        color: "#25D952",
    },
    {
        name: "Cornflower Blue",
        color: "#576EF2",
    },
    {
        name: "Corn",
        color: "#F2CB05",
    },
    {
        name: "Grape",
        color: "#3C1F5C",
    },
];

const stickers = [
    {
        name: "alert",
        path: "/images/stickers/event/alert.png",
    },
    {
        name: "cry",
        path: "/images/stickers/event/cry.png",
    },
    {
        name: "big_heart",
        path: "/images/stickers/event/big_heart.png",
    },
    {
        name: "depressed",
        path: "/images/stickers/event/depressed.png",
    },
    {
        name: "excited",
        path: "/images/stickers/event/excited.png",
    },
    {
        name: "idol",
        path: "/images/stickers/event/idol.png",
    },
    {
        name: "money1",
        path: "/images/stickers/event/money1.png",
    },
    {
        name: "money2",
        path: "/images/stickers/event/money2.png",
    },
    {
        name: "take_money",
        path: "/images/stickers/event/take_money.png",
    },
    {
        name: "nervous",
        path: "/images/stickers/event/nervous.png",
    },
    {
        name: "nervous",
        path: "/images/stickers/event/nervous.png",
    },
    {
        name: "thinking",
        path: "/images/stickers/event/thinking.png",
    },
];

const events: Event[] = [
    {
        name: "See you again",
        date: new Date("2025-02-22T22:59:59.000+00:00"),
        sticker: "nervous",
    },
    {
        name: "Dentist Appointment",
        date: new Date("2023-12-01T10:30:00.000+00:00"),
        sticker: "depressed",
    },
];

type Props = {
    showEvent: boolean;
    setShowEvent: React.Dispatch<React.SetStateAction<boolean>>;
  };

export const EventBoard = ({ showEvent, setShowEvent }: Props) => {
    const router = useRouter();
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState(today(getLocalTimeZone()));
    const [color, setColor] = React.useState<any>(new Set(["Grape"]));
    const [sticker, setSticker] = React.useState("");
    const [isStickerSelected, setIsStickerSelected] = React.useState(false);
    const [isNewEvent, setIsNewEvent] = React.useState(false);
    const [sortedEvents, setSortedEvents] = React.useState<Event[]>([]);
    const [loaded, setLoaded] = React.useState(false);
    const [processedTodayEvents, setProcessedTodayEvents] = React.useState(false);

    // Sort events by date
    useEffect(() => {
        // Process today events
        if (!processedTodayEvents) {
            // todayEvents();
            setProcessedTodayEvents(true);
        }
        // Sort events by date
        const sortEvents = events.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        // setSortedEvents(sortEvents);
        setSortedEvents(events);
    }, [events]);

    // New event bug fix on reload
    useEffect(() => {
        if (loaded) {
            setIsNewEvent(true);
        }
        setLoaded(true);
    }, [date]);

    function handleSelectSticker(newSticker: string) {
        if (newSticker != sticker) {
            setIsStickerSelected(false);
            setSticker(newSticker);
            return;
        }
        setSticker("");
        setIsStickerSelected(false);
    }

    function handleAddEvent(){
        if (!name || !date) return;
        const newEvent: Event = {
            name,
            date: new Date(Date.UTC(date.year, date.month - 1, date.day)),
            sticker,
        };
        events.push(newEvent);
        setSortedEvents([...events]);
        setShowEvent(false);
        setName("");
        setSticker("");
        setIsStickerSelected(false);
    }

    // // Delete Event
    // async function handleDeleteEvent(e: Event) {
    //     const removedEvent = await deleteEvent(e._id!);
    //     if (removedEvent) {
    //         router.refresh();
    //     }
    // }

    // Add Event
    // async function handleAddEvent() {
    //     if (!name || !date) return;
    //     const selectedDate = new Date(
    //         Date.UTC(date.year, date.month - 1, date.day)
    //     );
    //     selectedDate.setHours(23, 59, 59);
    //     // Create task or event
    //     const isTodayEvent = isToday(selectedDate);
    //     const createAction = isTodayEvent
    //         ? createTask(name, "event")
    //         : createEvent({
    //             name,
    //             date: selectedDate,
    //             color: [...color][0],
    //             sticker: sticker,
    //         });
    //     const createdItem = await createAction;
    //     if (createdItem) {
    //         setIsNewEvent(false);
    //         setName("");
    //         setSticker("");
    //         setIsStickerSelected(false);
    //         setColor(new Set(["Grape"]));
    //         router.refresh();
    //     }
    // }

    // // Today Events
    // async function todayEvents() {
    //     const filteredTodayEvents = events.filter((event) =>
    //         isToday(new Date(event.date))
    //     );
    //     const createdTasks = await Promise.all(
    //         filteredTodayEvents.map(async (event) => {
    //             return Promise.all([
    //                 createTask(event.name, "event"),
    //                 deleteEvent(event._id!),
    //             ]);
    //         })
    //     );
    //     if (createdTasks.length > 0) {
    //         router.refresh();
    //     }
    // }

    return (
        <aside className="w-1/4 h-full flex flex-col justify-center items-center gap-2 relative">
            <div className="size-full flex overflow-hidden flex-col gap-2">
                {showEvent && (
                    <div className="w-full h-auto rounded-2xl p-4 flex flex-col bg-white justify-between border-primary border-2 gap-4">
                        <Input
                            type="text"
                            required
                            variant={"bordered"}
                            label="Name"
                            value={name}
                            classNames={{
                                label: "text-primary",
                                inputWrapper:
                                    "border-primary/40 group-data-[focus=true]:border-primary",
                            }}
                            onValueChange={setName}
                        />
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <DatePicker
                                        className="max-w-[284px] !text-primary"
                                        value={date}
                                        // onChange={setDate(value)}
                                    />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Button
                                        onPress={() => {
                                            setShowEvent(false);
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
                                                {sticker && (
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
                                        onPress={handleAddEvent}
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
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-full flex flex-col gap-2 overflow-y-auto">
                    {sortedEvents.map((event: Event, index: number) => {
                        return (
                            <div
                                key={index}
                                className="w-full h-auto bg-white rounded-2xl flex justify-between gap-6 group border-4 relative z-10"
                                >
                                <div className="size-full flex flex-col justify-between p-4">
                                    <span className="text-primary font-bold">{event.name}</span>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="text-primary size-5"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                                            </svg>
                                            <span className="text-primary text-lg">
                                                {format(event.date, "d MMM.")}
                                            </span>
                                        </div>
                                        <Button
                                            isIconOnly
                                            className="bg-transparent absolute top-5 right-5 z-20 min-w-fit w-fit h-fit opacity-0 group-hover:opacity-100"
                                            radius="none"
                                            // onPress={() => {
                                            //     handleDeleteEvent(event);
                                            // }}
                                            >
                                            <svg
                                                className="text-primary size-5"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                                {event.sticker && (
                                    <Image
                                    className="m-2"
                                        src={
                                            stickers.find(
                                                (sticker) => sticker.name === event.sticker
                                            )?.path || ""
                                        }
                                        alt="Sticker"
                                        width={125}
                                        height={125}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <div className="w-full h-2/5 absolute bottom-0 bg-gradient-to-t from-white rounded-b-3xl pointer-events-none ">
            </div> */}
        </aside>
    );
}
