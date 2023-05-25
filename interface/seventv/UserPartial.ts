export default interface UserPartial {
  id: string;
  type: string;
  username: string;
  display_name: string;
  created_at: Date;
  avatar_url: string;
  biography: string;
  // implement as needed
  style?: any;
  roles?: any;
  connections?: any;
  emote_sets?: any;
}