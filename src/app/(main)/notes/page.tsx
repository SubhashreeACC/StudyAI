import NoteList from '@/components/notes/note-list';
import { placeholderNotes } from '@/lib/data';
import CreateNoteDialog from '@/components/notes/create-note-dialog';

export default function NotesPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
        <CreateNoteDialog />
      </div>
      <NoteList notes={placeholderNotes} />
    </div>
  );
}
