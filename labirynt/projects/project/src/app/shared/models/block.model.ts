import { Line } from './line.model';

export interface Block {
  name?: string;
  question?: string;
  answers?: Line[];
  link?: string;
  achLink?: string;
  answerConnect?: Line;
  start?: boolean;
  end?: boolean;
  relativeX?: number;
  relativeY?: number;
  id?: string;
}
