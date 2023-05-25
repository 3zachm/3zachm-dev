import ImageFormat from "./ImageFormat";

export default interface Image {
  name: string;
  format: ImageFormat
  width: number;
  height: number;
  frame_count: number;
  size: number;
}