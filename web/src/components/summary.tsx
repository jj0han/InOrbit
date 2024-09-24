import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { SheetTrigger } from "./ui/sheet";
import { inOrbitIcon } from "@/assets";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-BR";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "@/http/get-summary";
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBR);

export function Summary() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  if (!data) return null;

  const firstDayOfWeek = dayjs().startOf("week").format("D [de] MMM");
  const lastDayOfWeek = dayjs().endOf("week").format("D [de] MMM");
  const completedPercentage = Math.round((data?.completed * 100) / data?.total);

  return (
    <div className="py-10 max-w-lg px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={inOrbitIcon} alt="Icone" className="size-6" />
          <span className="text-lg font-semibold">
            {lastDayOfWeek} - {firstDayOfWeek}
          </span>
        </div>
        <SheetTrigger asChild>
          <Button
            type="button"
            size={"sm"}
            className="text-violet-50 gap-2 flex items-center text-sm font-medium tracking-tight"
          >
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </SheetTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={completedPercentage} />
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>
          Você completou{" "}
          <span className="text-zinc-100">{data?.completed}</span> de{" "}
          <span className="text-zinc-100">{data?.total}</span> metas nessa
          semana.
        </span>
        <span>{completedPercentage}%</span>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        {data.goalsPerDay && (
          <>
            <h2 className="text-xl font-medium">Sua Semana</h2>
            {Object.entries(data.goalsPerDay).map(([date, goals]) => (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  {dayjs(date).format("dddd")}{" "}
                  <span className="text-zinc-400 text-xs">
                    ({dayjs(date).format("DD [de] MMMM")})
                  </span>
                </h3>
                <ul className="flex flex-col gap-3">
                  {goals?.map((goal) => (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{" "}
                        <span className="text-zinc-100">
                          {dayjs(goal.completedAt).format("HH:mm")}h
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
