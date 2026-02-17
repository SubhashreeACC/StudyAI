'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { placeholderNotes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Sparkles, Loader2, Save } from 'lucide-react';
import { generateFlashcardsFromNotes } from '@/ai/flows/generate-flashcards-from-notes';
import { Flashcard } from '@/lib/definitions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function SingleNotePage() {
  const params = useParams();
  const { id } = params;
  const note = placeholderNotes.find(n => n.id === id);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFlashcards, setGeneratedFlashcards] = useState<Flashcard[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  if (!note) {
    notFound();
  }

  const handleGenerateFlashcards = async () => {
    setIsGenerating(true);
    try {
      const result = await generateFlashcardsFromNotes({ noteContent: note.content });
      setGeneratedFlashcards(result.flashcards.map((fc, i) => ({ ...fc, id: `gen-${i}` })));
    } catch (error) {
      console.error('Failed to generate flashcards:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate flashcards from this note. Please try again.',
      });
    }
    setIsGenerating(false);
  };
  
  const handleSaveFlashcards = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving flashcards:', generatedFlashcards);
    setIsSaving(false);
    setGeneratedFlashcards(null);
    toast({
        title: "Flashcards Saved!",
        description: "Your new flashcards are available in the 'Flashcards' section."
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/notes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notes
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{note.title}</CardTitle>
          <CardDescription>
            Created on {new Date(note.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
          <div className="mt-8 border-t pt-6">
            <Button onClick={handleGenerateFlashcards} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Flashcards
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={!!generatedFlashcards} onOpenChange={() => setGeneratedFlashcards(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generated Flashcards</DialogTitle>
            <DialogDescription>
              Review the flashcards generated from your note. You can save them to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto p-1 pr-4">
            <div className="space-y-4">
              {generatedFlashcards?.map((fc, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm">Q: {fc.question}</p>
                    <p className="text-sm text-muted-foreground mt-2">A: {fc.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGeneratedFlashcards(null)}>Cancel</Button>
            <Button onClick={handleSaveFlashcards} disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Flashcards
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
