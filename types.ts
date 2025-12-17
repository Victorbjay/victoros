
export enum AppID {
  FINDER = 'finder',
  TERMINAL = 'terminal',
  SAFARI = 'safari',
  MUSIC = 'music',
  SETTINGS = 'settings',
  TIPS = 'tips'
}

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'ai';
  content: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  url: string;
}
