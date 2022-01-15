import { Block } from './block.model';

export interface Game {
  name: string;
  date: string;
  blocks: Block[];
  id?: number;
}
