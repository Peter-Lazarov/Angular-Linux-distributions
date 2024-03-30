import { Commentary } from "./commentary";
import { DesktopEnvironment } from "./desktop-environment";
import { Distribution } from "./distribution";

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
    publisher: string
}
