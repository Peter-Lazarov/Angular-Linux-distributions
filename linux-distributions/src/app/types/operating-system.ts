import { Commentary } from "./commentary";
import { DesktopEnvironment } from "./desktop-environment";
import { Distribution } from "./distribution";

export interface OperatingSystem {
    _id: string,
    name: string,
    desktopEnvironment: DesktopEnvironment,
    distribution: Distribution,
    commentaries: Commentary[]
}