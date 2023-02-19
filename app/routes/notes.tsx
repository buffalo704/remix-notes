import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  CatchBoundaryComponent,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import type { Note } from "~/data/notes";
import { getStoredNotes, storeNotes } from "~/data/notes";
import NoteList, { links as noteListLinks } from "~/components/NoteList";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export const loader = async (): Promise<Note[]> => {
  const notes = await getStoredNotes();
  
  // if (!notes || notes.length === 0) {
  //   throw json(
  //     { message: "Could not find any notes." },
  //     {
  //       status: 404,
  //       statusText: "Not Found",
  //     }
  //   );
  // }

  return notes;
};

export const action: ({
  request,
}: ActionArgs) => Promise<Response | { message: string }> = async ({
  request,
}: ActionArgs) => {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData) as unknown as Note;

  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long." };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = [...existingNotes, noteData as unknown as Note];

  await storeNotes(updatedNotes);

  return redirect("/notes");
};

export const links = () => [...newNoteLinks(), ...noteListLinks()];

export const meta: MetaFunction = () => ({
  title: "All Notes",
  description: "Manage your notes with ease.",
});


export const CatchBoundary: CatchBoundaryComponent = () => {
  const caughtResponse = useCatch();

  const message = caughtResponse.data?.message || "Data not found.";
  return (
    <main>
      <p className='info-message'>{message}</p>
    </main>
  );
};
