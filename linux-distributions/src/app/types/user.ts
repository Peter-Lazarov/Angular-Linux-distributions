export interface User {
    _id: string,
    email: string,
    password: string,
    name: string,
    publishedSystems: string[],
    publishedEnvironments: string[],
    publishedDistribution: string[],
    publishedCommentary: string[],
    updatedAt: string
}
