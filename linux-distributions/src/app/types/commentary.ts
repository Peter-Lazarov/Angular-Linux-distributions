import { UserForCommentary } from "./user";

export interface Commentary {
    _id: string,
    content: string,
    systemId: string,
    userId: string
}

export interface CommentaryForShow {
    _id: string,
    content: string,
    systemId: string,
    userId: UserForCommentary
}
