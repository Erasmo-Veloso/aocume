"use client";

import { cn } from "@/lib/utils";

/** Checkbox com etiqueta, controlado. */
export function CheckboxField({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={cn(
          "mt-0.5 size-5 shrink-0 cursor-pointer rounded border-input accent-gold"
        )}
      />
      <span className="flex flex-col">
        <span className="text-sm font-medium text-ink">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </span>
    </label>
  );
}
