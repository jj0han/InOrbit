import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { createGoal } from "@/http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const createGoalForm = z.object({
  title: z.string().min(1, "Informe a atividade que deseja realizar"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

export function CreateGoal() {
  const form = useForm({
    resolver: zodResolver(createGoalForm),
  });
  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof createGoalForm>) {
    await createGoal({ ...values });
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
    form.reset();
  }

  return (
    <SheetContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <SheetTitle>Cadastrar Meta</SheetTitle>
          </div>
          <SheetDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </SheetDescription>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              onSubmit(values as z.infer<typeof createGoalForm>)
            )}
            className="flex-1 flex-col flex justify-between"
          >
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual a Atividade?</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        placeholder="Praticar exercícios, meditar, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredWeeklyFrequency"
                render={({ field }) => (
                  <FormItem className="space-y-6">
                    <FormLabel>Quantas vezes na semana?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-6"
                      >
                        {radioGroupItems.map((value) => (
                          <FormItem
                            key={value.value}
                            className="flex items-center justify-between space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={value.value.toString()} />
                            </FormControl>
                            <FormLabel className="leading-none text-sm font-medium text-zinc-300">
                              {value.label}
                            </FormLabel>
                            <span className="leading-none text-lg">
                              {value.emoji}
                            </span>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-3">
              <SheetClose asChild>
                <Button type="button" variant={"secondary"} className="flex-1">
                  Fechar
                </Button>
              </SheetClose>
              <Button type="submit" className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
}

const radioGroupItems = [
  {
    value: 1,
    label: "1x na semana",
    emoji: "🥱",
  },
  {
    value: 2,
    label: "2x na semana",
    emoji: "😊",
  },
  {
    value: 3,
    label: "3x na semana",
    emoji: "😎",
  },
  {
    value: 4,
    label: "4x na semana",
    emoji: "😜",
  },
  {
    value: 5,
    label: "5x na semana",
    emoji: "😝",
  },
  {
    value: 6,
    label: "6x na semana",
    emoji: "🤩",
  },
  {
    value: 7,
    label: "Todos os dias na semana",
    emoji: "🔥",
  },
];
