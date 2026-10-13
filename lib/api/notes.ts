import type { FetchNotesParams, Note, NotesResponse } from '@/types/note';
import { api } from './api';

export async function fetchNotes(
  params: FetchNotesParams = {},
): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>('/notes', { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${encodeURIComponent(id)}`);
  return data;
}

export async function createNote(
  note: Omit<Note, 'id' | 'createdAt'>,
): Promise<Note> {
  const { data } = await api.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${encodeURIComponent(id)}`);
}
