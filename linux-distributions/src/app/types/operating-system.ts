import { Commentar } from "./commentar";
import { DesktopEnvironment } from "./desktop-environment";
import { Distribution } from "./distribution";

export interface OperatingSystem {
    _id: string,
    name: string,
    desktopEnvironment: DesktopEnvironment,
    distribution: Distribution,
    commentaries: Commentar[]
}