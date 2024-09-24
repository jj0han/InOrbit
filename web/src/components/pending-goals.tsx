import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingGoals } from "@/http/get-pending-goals";
import { createGoalCompletion } from "@/http/create-goal-completion";

export function PendingGoals() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
  });

  if (!data) return null;

  async function onCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {data?.map((value) => (
        <Button
          key={value.id}
          variant={"outline"}
          disabled={value.completionCount >= value.desiredWeeklyFrequency}
          onClick={() => {
            onCompleteGoal(value.id);
          }}
          className="gap-1 text-zinc-200"
        >
          <Plus className="size-4 text-zinc-500" />
          {value.title}
        </Button>
      ))}
    </div>
  );
}
