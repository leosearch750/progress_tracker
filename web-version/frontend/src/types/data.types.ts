/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AnnualGoal {
  id: string;
  userId: string;
  year: number;
  rdTotal: number;
  lbTotal: number;
  lcTotal: number;
  psTotal: number;
}

export interface DailyEntry {
  christianReading: any;
  bibleReading: any;
  id: string;
  userId: string;
  date: string;
  rdCompleted: number;
  rdTarget: number;
  psHours: number;
  psTarget: number;
}

export interface BibleReading {
  id?: string;
  entryId: string;
  chaptersCount: number;
  chaptersTarget: number;
  chaptersList: string[];
}

export interface ChristianReading {
  id?: string;
  entryId: string;
  pagesCount: number;
  bookName: string;
}

export interface Importunity {
  id: string;
  userId: string;
  date: string;
  subject: string;
  counter: number;
}
