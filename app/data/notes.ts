import fs from 'fs/promises';

export interface Note {
    id: string
    title: string;
    content: string;
}

export const getStoredNotes: () => Promise<Note[]> = async () => {
  const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export const storeNotes:(notes: Note[]) => Promise<void> = (notes) => {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }));
}