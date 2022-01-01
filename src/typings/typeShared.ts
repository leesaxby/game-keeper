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

export type Game = {
    id: string,
    first: boolean,
    turnOneSolRing: boolean,
    winMethod: 'COMBO' | 'COMBAT' | 'CONCEDE',
    losers: { id: string, name: string, player: string }[],
    winner: {
        data: {
            commander: string,
            imageURL: string,
            level: string,
            name: string,
        }
    }
};
