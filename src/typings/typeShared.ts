export type Player = {
    id: string,
    imageURL: string,
    name: string,
};

export type Deck = {
    id: string,
    name: string,
    commander: string,
    level: number,
    imageURL: string
    player: {
        ref: any,
        ts: number,
        data: Player
    },
}

