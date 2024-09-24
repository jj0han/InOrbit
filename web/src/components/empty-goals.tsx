import { letsStartIllustration, logoInOrbit } from "@/assets";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { SheetTrigger } from "./ui/sheet";

export default function EmptyGoals() {
  return (
    <div className="flex justify-center items-center gap-8 flex-col h-screen">
      <img src={logoInOrbit} alt="in.orbit" />
      <img src={letsStartIllustration} alt="in.orbit" />
      <p className="leading-relaxed max-w-80 text-center text-zinc-300">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
        mesmo?
      </p>
      <SheetTrigger asChild>
        <Button
          type="button"
          className="text-violet-50 gap-2 flex items-center text-sm font-medium tracking-tight"
        >
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </SheetTrigger>
    </div>
  );
}
