import ImageHost from "./ImageHost";
import UserPartial from "./UserPartial";

export default interface SevenTVEmote {
  id: string;
  name: string;
  flags: number;
  data: {
    lifecycle: number;
    tags: string[];
    animated: boolean;
    created_at: Date;
    owner_id: string;
    owner: UserPartial;
    trending: number;
    host: ImageHost;
    listed: boolean;
    personal_use: boolean;
    // implement as needed
    channels: any;
    common_names: any;
    versions: any;
    activity: any;
    reports: any;
    state: any;
  }
}