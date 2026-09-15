import {
  DockerIcon,
  NodeJsIcon,
  OdinIcon,
  PostgreSQLIcon,
  RustIcon,
  TypeScriptIcon,
} from "@/components/icons";
import { STACK, type StackId } from "@/lib/stack";

const STACK_ICONS: Record<StackId, (props: { className?: string }) => React.ReactElement> = {
  nodejs: NodeJsIcon,
  typescript: TypeScriptIcon,
  postgresql: PostgreSQLIcon,
  docker: DockerIcon,
  odin: OdinIcon,
  rust: RustIcon,
};

export function StackBadge({ id }: { id: StackId }) {
  const meta = STACK[id];
  const Icon = STACK_ICONS[id];
  if (!meta || !Icon) return null;

  return (
    <span className="focus-item group inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground">
      <span style={{ color: meta.color }}>
        <Icon className="size-3.5" />
      </span>
      {meta.label}
    </span>
  );
}
