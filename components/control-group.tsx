"use client";

type Option = { id: string; label: string };

function controlId(label: string, id: string) {
  return `${label.toLowerCase().replace(/\s+/g, "-")}-${id}`;
}

export function ControlGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly Option[];
  onChange: (id: string) => void;
}) {
  const index = Math.max(
    0,
    options.findIndex((option) => option.id === value),
  );

  function move(next: number) {
    const option = options[(next + options.length) % options.length];
    onChange(option.id);
    const node = document.getElementById(controlId(label, option.id));
    node?.focus();
  }

  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option, optionIndex) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            id={controlId(label, option.id)}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            className={`min-h-11 px-4 text-sm ${
              selected
                ? "bg-accent text-accent-ink"
                : "bg-transparent text-ink border border-line"
            }`}
            onClick={() => onChange(option.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                move(index + 1);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                move(index - 1);
              } else if (/^[1-9]$/.test(event.key)) {
                const picked = options[Number(event.key) - 1];
                if (picked) {
                  event.preventDefault();
                  onChange(picked.id);
                  document.getElementById(controlId(label, picked.id))?.focus();
                }
              }
            }}
          >
            {option.label}
            <span className="sr-only">, {optionIndex + 1} of {options.length}</span>
          </button>
        );
      })}
    </div>
  );
}
