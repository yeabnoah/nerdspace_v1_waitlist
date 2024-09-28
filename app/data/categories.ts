import { IconType } from 'react-icons';
import { FaCode, FaGamepad, FaPaintBrush, FaRocket, FaRobot, FaBook, FaChess, FaMicrochip, FaMusic, FaFilm, FaHistory, FaGlobeAmericas, FaPalette, FaFlask, FaMountain, FaTheaterMasks } from 'react-icons/fa';

export interface Category {
  name: string;
  icon: IconType;
}

export const categories: Category[] = [
  { name: 'Programming', icon: FaCode },
  { name: 'Gaming', icon: FaGamepad },
  { name: 'Designing', icon: FaPaintBrush },
  { name: 'Rocketry', icon: FaRocket },
  { name: 'AI', icon: FaRobot },
  { name: 'Sci-Fi', icon: FaBook },
  { name: 'Board Games', icon: FaChess },
  { name: 'Electronics', icon: FaMicrochip },
  { name: 'Music', icon: FaMusic },
  { name: 'Movies', icon: FaFilm },
  { name: 'History', icon: FaHistory },
  { name: 'Astronomy', icon: FaGlobeAmericas },
  { name: 'Art', icon: FaPalette },
  { name: 'Science', icon: FaFlask },
  { name: 'Nature', icon: FaMountain },
  { name: 'Theater', icon: FaTheaterMasks },
];