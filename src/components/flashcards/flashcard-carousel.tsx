'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flashcard } from '@/lib/definitions';
import { Check, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type FlashcardCarouselProps = {
  flashcards: Flashcard[];
};

export default function FlashcardCarousel({ flashcards: initialFlashcards }: FlashcardCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [flipped, setFlipped] = React.useState<boolean[]>(Array(initialFlashcards.length).fill(false));
  const [localFlashcards, setLocalFlashcards] = React.useState(initialFlashcards);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleFlip = (index: number) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };
  
  const handleMasteredToggle = (index: number) => {
    const newFlashcards = [...localFlashcards];
    const isMastered = !newFlashcards[index].isMastered;
    newFlashcards[index].isMastered = isMastered;
    setLocalFlashcards(newFlashcards);

    toast({
        title: isMastered ? 'Card Mastered!' : 'Marked for Review',
        description: `The flashcard has been updated.`,
    })
  };

  return (
    <div>
      <Carousel setApi={setApi} className="w-full max-w-2xl mx-auto">
        <CarouselContent>
          {localFlashcards.map((flashcard, index) => (
            <CarouselItem key={flashcard.id}>
              <div className="p-1">
                <Card
                  className={cn(
                    'aspect-[3/2] transition-transform duration-500 [transform-style:preserve-3d]',
                    flipped[index] ? '[transform:rotateY(180deg)]' : ''
                  )}
                  onClick={() => handleFlip(index)}
                >
                  <div className="relative w-full h-full">
                    {/* Front of card */}
                    <div className="absolute w-full h-full [backface-visibility:hidden]">
                      <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <p className="text-xl md:text-2xl font-semibold">{flashcard.question}</p>
                      </CardContent>
                    </div>
                    {/* Back of card */}
                    <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <p className="text-lg md:text-xl text-muted-foreground">{flashcard.answer}</p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
                <div className="flex justify-center mt-4">
                    <Button onClick={() => handleMasteredToggle(index)} variant={flashcard.isMastered ? "secondary" : "default"}>
                        {flashcard.isMastered ? <Repeat className="mr-2 h-4 w-4" /> : <Check className="mr-2 h-4 w-4" />}
                        {flashcard.isMastered ? 'Mark for Review' : 'Mark as Mastered'}
                    </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Flashcard {current} of {localFlashcards.length}
      </div>
    </div>
  );
}
