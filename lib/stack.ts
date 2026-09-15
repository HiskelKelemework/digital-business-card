export type StackId = "nodejs" | "typescript" | "postgresql" | "docker" | "odin" | "rust";

export const STACK: Record<StackId, { label: string; color: string }> = {
  nodejs: { label: "Node.js", color: "#5fa04e" },
  typescript: { label: "TypeScript", color: "#3178c6" },
  postgresql: { label: "PostgreSQL", color: "#4169e1" },
  docker: { label: "Docker", color: "#2496ed" },
  odin: { label: "Odin", color: "#3882d2" },
  rust: { label: "Rust", color: "#ce6b32" },
};
