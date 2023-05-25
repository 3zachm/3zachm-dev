export default interface TwitchEmote {
  emote_set_id: string;
  emote_type: string;
  foramt: string[];
  id: string;
  images: {
    url_1x: string;
    url_2x: string;
    url_4x: string;
  };
  name: string;
  scale: string[];
  theme_mode: string[];
  tier: string;
}