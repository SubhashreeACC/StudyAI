'use client';

import * as React from 'react';
import { Goal } from '@/lib/definitions';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type GoalListProps = {
  goals: Goal[];
};

export default function GoalList({ goals: initialGoals }: GoalListProps) {
  const [goals, setGoals] = React.useState(initialGoals);
  const { toast } = useToast();

  const handleToggle = (id: string) => {
    setGoals(goals.map(g => (g.id === id ? { ...g, isCompleted: !g.isCompleted } : g)));
    const goal = goals.find(g => g.id === id);
    if (goal) {
        toast({
            title: !goal.isCompleted ? 'Goal Completed!' : 'Goal Unchecked',
            description: `"${goal.title}" has been updated.`
        });
    }
  };
  
  const sortedGoals = [...goals].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return a.isCompleted ? 1 : -1;
  });

  return (
    <div className="space-y-3">
      {sortedGoals.map(goal => (
        <Card key={goal.id} className={cn('transition-all', goal.isCompleted && 'bg-muted/50')}>
          <CardContent className="flex items-center p-4">
            <Checkbox
              id={`goal-${goal.id}`}
              checked={goal.isCompleted}
              onCheckedChange={() => handleToggle(goal.id)}
              className="mr-4"
            />
            <div className="flex-1">
              <label
                htmlFor={`goal-${goal.id}`}
                className={cn(
                  'font-medium cursor-pointer',
                  goal.isCompleted && 'line-through text-muted-foreground'
                )}
              >
                {goal.title}
              </label>
              <p className={cn('text-sm text-muted-foreground', goal.isCompleted && 'line-through')}>
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
