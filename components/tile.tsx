import { cn } from "@/lib/cn";

const tones = {
  paper:
    "bg-card text-card-foreground shadow-[0_1px_0_rgb(20_20_20/0.04),0_12px_32px_-20px_rgb(20_20_20/0.35)]",
  ink: "bg-ink text-white shadow-[0_18px_40px_-24px_rgb(0_0_0/0.55)]",
  oxide: "bg-oxide text-white shadow-[0_18px_40px_-24px_rgb(29_78_216/0.55)]",
  you: "bg-you text-white shadow-[0_18px_40px_-24px_rgb(11_18_32/0.55)]",
  mist: "bg-[#eef2f9] text-ink shadow-[0_12px_32px_-20px_rgb(20_20_20/0.28)] dark:bg-muted dark:text-card-foreground",
} as const;

export function Tile({
  children,
  className,
  id,
  tone = "paper",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: keyof typeof tones;
  delay?: number;
}) {
  return (
    <section
      id={id}
      className={cn("card-rise tile-hover rounded-[1.75rem] p-5", tones[tone], className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

export function TileLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-medium uppercase tracking-[0.18em] opacity-70", className)}>{children}</p>
  );
}
