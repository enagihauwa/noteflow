export interface SessionUser {
  id: string;
  name: string | null;
  email: string | null;
}

// Mirrors the Firestore notes document. Components rely on Date objects for the
// timestamps (toLocaleString etc.), so lib/notes converts Firestore Timestamps
// back to Date when reading.
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}