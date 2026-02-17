import FlashcardCarousel from '@/components/flashcards/flashcard-carousel';
import { placeholderFlashcards } from '@/lib/data';

export default function FlashcardsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Flashcards</h1>
      </div>
      {placeholderFlashcards.length > 0 ? (
        <FlashcardCarousel flashcards={placeholderFlashcards} />
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">No Flashcards Yet</h2>
            <p className="text-muted-foreground mt-2">Create notes and generate flashcards to start studying.</p>
        </div>
      )}
    </div>
  );
}
