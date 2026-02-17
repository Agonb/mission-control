interface WidgetProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
  live?: boolean;
}

export default function Widget({ title, icon, children, className = "", live }: WidgetProps) {
  return (
    <div className={`card-glow bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 hover:bg-[var(--bg-card-hover)] transition-colors ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{icon}</span>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{title}</h3>
        {live && <span className="ml-auto w-2 h-2 rounded-full bg-[var(--success)] pulse-dot" title="Live" />}
      </div>
      {children}
    </div>
  );
}
