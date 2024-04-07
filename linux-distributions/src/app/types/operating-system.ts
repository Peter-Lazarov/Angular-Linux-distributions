import { Commentary } from "./commentary";
import { DesktopEnvironment } from "./desktop-environment";
import { Distribution } from "./distribution";
import { User, UserAsPublisher } from "./user";

export interface OperatingSystem {
    _id: string,
    name: string,
    environment: DesktopEnvironment,
    distribution: Distribution
}

export interface OperatingSystemWithCommentariesAndPublisher {
    _id: string,
    name: string,
    environment: DesktopEnvironment,
    distribution: Distribution,
    commentaries: Commentary[],
    publisher: UserAsPublisher,
    createdAt: Date,
    isPublisher?: boolean
}

export interface OperatingSystemAsString {
    _id: string,
    name: string,
    environment: string,
    distribution: string,
    commentaries: string[],
    publisher: string
}
