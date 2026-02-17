import GoalList from '@/components/planner/goal-list';
import CreateGoalDialog from '@/components/planner/create-goal-dialog';
import { placeholderGoals } from '@/lib/data';
import { Progress } from '@/components/ui/progress';

export default function PlannerPage() {
  const completedGoals = placeholderGoals.filter(g => g.isCompleted).length;
  const totalGoals = placeholderGoals.length;
  const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Study Planner</h1>
        <CreateGoalDialog />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">Your Progress</h2>
            <span className="text-sm font-semibold">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <GoalList goals={placeholderGoals} />
    </div>
  );
}
