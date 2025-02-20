import { List } from '@/types';
import { Accordion, AccordionItem, Button, Chip, Input } from '@heroui/react';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@heroui/react";

const stickers = [
    { name: "strawberry", path: "/images/stickers/list/strawberry.png" },
    { name: "watermelon", path: "/images/stickers/list/watermelon.png" },
    { name: "ball", path: "/images/stickers/list/ball.png" },
    { name: "cake", path: "/images/stickers/list/cake.png" },
    { name: "dinosaur", path: "/images/stickers/list/dinosaur.png" },
    { name: "fish", path: "/images/stickers/list/fish.png" },
    { name: "flower1", path: "/images/stickers/list/flower1.png" },
    { name: "flower2", path: "/images/stickers/list/flower2.png" },
    { name: "flower3", path: "/images/stickers/list/flower3.png" },
    { name: "flower4", path: "/images/stickers/list/flower4.png" },
    { name: "flower5", path: "/images/stickers/list/flower5.png" },
    { name: "flower6", path: "/images/stickers/list/flower6.png" },
    { name: "flower7", path: "/images/stickers/list/flower7.png" },
    { name: "flower8", path: "/images/stickers/list/flower8.png" },
    { name: "heart1", path: "/images/stickers/list/heart1.png" },
    { name: "heart2", path: "/images/stickers/list/heart2.png" },
    { name: "hearts", path: "/images/stickers/list/hearts.png" },
    { name: "icecream", path: "/images/stickers/list/icecream.png" },
    { name: "mango", path: "/images/stickers/list/mango.png" },
    { name: "music", path: "/images/stickers/list/music.png" },
    { name: "party", path: "/images/stickers/list/party.png" },
    { name: "stars", path: "/images/stickers/list/stars.png" },
];

const initialLists = [
    {
        name: "Fruits",
        items: ["Apple", "Banana", "Orange", "Strawberries"],
        sticker: "icecream",
    },
    {
        name: "Vegetables",
        items: ["Carrot", "Broccoli", "Spinach"],
        sticker: "heart1",
    },
    {
        name: "Dairy",
        items: ["Milk", "Cheese", "Yogurt", "Butter"],
        sticker: "dinosaur",
    }
];


type Props = {
    showList: boolean;
    setShowList: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ListBoard = ({ showList, setShowList }: Props) => {
    const [listName, setListName] = React.useState("");
    const [itemName, setItemName] = React.useState("");
    const [isNewList, setIsNewList] = React.useState(false);
    const [lists, setLists] = React.useState(initialLists);
    const [isNewItemIndex, setIsNewItemIndex] = React.useState<number | null>(null);
    const [listSticker, setListSticker] = React.useState<string>("");
    const [isStickerSelected, setIsStickerSelected] = React.useState(false);

    async function handleClose(list: List, itemToRemove: string) {
        let listsUpdated = lists.map((currentList) => {
            if (currentList.name === list.name) {
                return {
                    ...currentList,
                    items: currentList.items.filter(
                        (item) => item !== itemToRemove
                    ),
                };
            }
            return currentList;
        });
        setLists(listsUpdated);

        // Update database
        // await removeGrocery(list, groceryToRemove);
    };

    async function handleAddList() {
        if (!setListName) {
            return;
        }
        let listsUpdated = [
            ...lists,
            {
                name: listName,
                items: [],
                sticker: listSticker,
            },
        ];
        setLists(listsUpdated);
        setListName("");
        setIsNewList(false);

        // Update database
        // await createGroceryList(listName);
    }

    async function handleRemoveList(listToRemove: List) {
        let listsUpdated = lists.filter(
            (list) => list.name !== listToRemove.name
        );
        setLists(listsUpdated);

        // Update database
        // await removeGroceryList(listToRemove);
    }

    async function handleAddItem(list: List) {
        if (!itemName) {
            return;
        }

        let listsUpdated = lists.map((currentList) => {
            if (currentList.name === list.name) {
                return {
                    ...currentList,
                    items: [
                        ...currentList.items,
                        itemName,
                    ],
                };
            }
            return currentList;
        });

        setLists(listsUpdated);
        setItemName("");
        setIsNewItemIndex(null);

        // Update database
        // await addGrocery(list, newGrocery);
    }

    function handleSelectSticker(newSticker: string) {
        if (newSticker != listSticker) {
            setIsStickerSelected(false);
            setListSticker(newSticker);
            return;
        }
        setListSticker("");
        setIsStickerSelected(false);
    }

    return (
        <aside className="w-1/4 h-full flex flex-col justify-center items-center gap-2 relative">
            <div className="size-full flex overflow-hidden flex-col gap-2 relative">
                {showList && (
                    <div className="w-full min-h-12 flex items-center relative px-2 mb-1">
                        <input
                            type="text"
                            className="size-full border-none outline-none  rounded-xl indent-4 text-base font-bold pr-3"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddList()}
                            placeholder="Name"
                        />
                        <div className="flex absolute items-center right-5 gap-2">
                            <Button
                                onPress={() => {
                                    setShowList(false);
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
                                        {listSticker && (
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
                                                onPress={() => handleSelectSticker(sticker.name)}>
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
                                className="bg-primary"
                                radius="full"
                                size="sm"
                                onPress={handleAddList}>
                                <svg
                                    fill="currentColor"
                                    className="size-4 text-secondary"
                                    viewBox="0 0 16 16">
                                    <path
                                        fillRule="evenodd"
                                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                )}
                {/* {!lists.length &&
                    <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-primary pointer-events-none">
                        <Image src="/assets/cat/list.png" alt="alt" width={100} height={100} />
                        <span>No groceries... Grrr...</span>
                    </div>
                } */}
                <div className="w-full h-full flex flex-col overflow-y-auto">
                    <Accordion className='flex flex-col gap-3 relative' selectionMode="multiple" showDivider={false} >
                        {/* Grocery Lists */}
                        {lists.map((list, index) => (
                            <AccordionItem
                                key={index}
                                title={list.name}
                                startContent={
                                    <Image
                                        src={
                                            stickers.find(
                                                (sticker) => sticker.name === list.sticker
                                            )?.path || ""
                                        }
                                        alt="Sticker"
                                        className={clsx("absolute -bottom-2 right-10", { "hidden": isNewItemIndex === index })}
                                        width={60}
                                        height={60}
                                    />
                                }
                                classNames={{
                                    title: "pl-3 text-primary text-base font-bold",
                                    content: "flex gap-1 flex-wrap pt-0 p-3",
                                    trigger: "py-2 pr-3",
                                    base: "relative bg-white py-2 rounded-xl"
                                }}>
                                {/* Sticker */}
                                <Image
                                    src={
                                        stickers.find(
                                            (sticker) => sticker.name === list.sticker
                                        )?.path || ""
                                    }
                                    alt="Sticker"
                                    className="absolute -bottom-2 right-10"
                                    width={60}
                                    height={60}
                                />
                                {/* Remove List / Add Grocery / Indicator */}
                                {isNewItemIndex !== index &&
                                    <div className="w-auto h-6 flex items-center absolute top-0 my-4 right-8 ">
                                        {/* Remove List */}
                                        <Button
                                            isIconOnly
                                            className="h-fit bg-transparent size-4 "
                                            radius="full"
                                            size="sm"
                                            onPress={() => { handleRemoveList(list) }}>
                                            <svg className="size-4 text-default-400" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>
                                        </Button>
                                        {/* Add Grocery */}
                                        <Button
                                            isIconOnly
                                            className="h-fit bg-transparent size-4 "
                                            radius="full"
                                            size="sm"
                                            onPress={() => { setIsNewItemIndex(index) }}>
                                            <svg
                                                fill="currentColor"
                                                className="size-4 text-default-400"
                                                viewBox="0 0 16 16">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                                                />
                                            </svg>
                                        </Button>
                                    </div>
                                }
                                {/* Add Item Form */}
                                {isNewItemIndex === index && (
                                    <div className="w-full h-auto rounded-2xl p-4 flex  border-primary border-2 items-center gap-2 mb-2 relative">
                                        <input
                                            type="text"
                                            className=" border-none outline-none text-base text-primary font-bold"
                                            onChange={(e) => setItemName(e.target.value)}
                                            placeholder="New item..."
                                        />
                                        <div className="flex gap-2 items-center absolute right-2">
                                            <Button
                                                onPress={() => {
                                                    setIsNewItemIndex(null);
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
                                            <Button
                                                isIconOnly
                                                className="bg-primary rounded-full w-fit"
                                                size="sm"
                                                onPress={() => { handleAddItem(list) }}>
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
                                )}
                                {list.items.map((item, index) => (
                                    <Chip
                                        key={index}
                                        classNames={{
                                            base: "py-4 gap-1",
                                            closeButton: "text-zinc-500"
                                        }}
                                        onClose={() => handleClose(list, item)}
                                        variant="flat">
                                        {item}
                                    </Chip>
                                ))}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            {/* <div className="w-full h-2/5 absolute bottom-0 bg-gradient-to-t from-white rounded-b-3xl pointer-events-none "></div> */}
        </aside>
    );
}
