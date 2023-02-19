import { ActionArgs, json, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes, Note } from "~/data/notes";

import styles from "~/styles/note-details.css";

export default function NoteDetailsPage() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export const loader = async ({
  params,
}: ActionArgs): Promise<Note | undefined> => {
  const notes = await getStoredNotes();
  const selectedNote = notes.find((note) => note.id === params.noteId);

  if (!selectedNote) {
    throw json(
      { message: `Could not find any note for id ${params.noteId}` },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  return selectedNote;
};

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const meta: MetaFunction = ({ data }) => ({
  title: data?.title,
  description: "Manage your notes with ease.",
});
