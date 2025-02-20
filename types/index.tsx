export type Task = {
    _id?: string | undefined;
    name: string;
    state: string;
    sticker: string;
    order: number;
};

export type Event = {
    _id?: string | undefined;
    name: string;
    date: Date;
    sticker: string;
};

export type State = {
    name: string;
    description: string;
};

export type Dialogue = {
    text: string;
    image: string;
    audio: string[];
};

export type Interaction = {
    _id?: string | undefined;
    name: string;
    dialogues: Dialogue[];
    currentDialogueIndex: number;
    isFinished: boolean;
};

export type List = {
    _id?: string | undefined;
    name: string;
    items: string[];
    sticker: string;
};
