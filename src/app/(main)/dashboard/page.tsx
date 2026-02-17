import StatCard from '@/components/dashboard/stat-card';
import { BookOpen, CheckCircle, Sparkles, Flame } from 'lucide-react';
import { placeholderNotes, placeholderGoals, placeholderFlashcards } from '@/lib/data';

export default function DashboardPage() {
  const totalNotes = placeholderNotes.length;
  const completedGoals = placeholderGoals.filter(g => g.isCompleted).length;
  const masteredFlashcards = placeholderFlashcards.filter(f => f.isMastered).length;
  const streak = 5; // Placeholder value

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Notes"
          value={totalNotes}
          icon={<BookOpen className="h-6 w-6 text-muted-foreground" />}
          description="You've created a library of knowledge."
        />
        <StatCard
          title="Completed Goals"
          value={completedGoals}
          icon={<CheckCircle className="h-6 w-6 text-muted-foreground" />}
          description="Great job on hitting your targets."
        />
        <StatCard
          title="Mastered Flashcards"
          value={masteredFlashcards}
          icon={<Sparkles className="h-6 w-6 text-muted-foreground" />}
          description="Keep reviewing to lock in your learning."
        />
        <StatCard
          title="Study Streak"
          value={`${streak} days`}
          icon={<Flame className="h-6 w-6 text-muted-foreground" />}
          description="Keep the fire burning! Consistency is key."
        />
      </div>

      <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Welcome Back!</h2>
          <p className="text-muted-foreground">Here's a quick overview of your study progress. Keep up the great work!</p>
      </div>
    </div>
  );
}
