import { Sheet } from "./components/ui/sheet";
import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
import EmptyGoals from "./components/empty-goals";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";

export function App() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  return (
    <Sheet>
      {data && data.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Sheet>
  );
}
