import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  side?: "left" | "right" | "bottom";
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  closeLabel?: string;
  className?: string;
  panelClassName?: string;
  portalContainer?: Element | DocumentFragment | null;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  side = "right",
  footer,
  closeOnOverlayClick = true,
  closeLabel = "Close drawer",
  className = "",
  panelClassName = "",
  portalContainer,
}: DrawerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusableElements = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusableElements.length) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onOpenChange, open]);

  if (!open || typeof document === "undefined") return null;
  const target = portalContainer ?? document.body;
  if (!target) return null;

  return createPortal(
    <div className={`dk-drawer ${className}`.trim()} data-side={side}>
      <button
        className="dk-drawer__backdrop"
        type="button"
        aria-label={closeLabel}
        onClick={() => closeOnOverlayClick && onOpenChange(false)}
      />
      <section
        ref={panelRef}
        className={`dk-drawer__panel ${panelClassName}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
      >
        <header className="dk-drawer__header">
          <div>
            <h2 id={titleId}>{title}</h2>
            {description && <p id={descriptionId}>{description}</p>}
          </div>
          <button ref={closeButtonRef} type="button" aria-label={closeLabel} onClick={() => onOpenChange(false)}>
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="dk-drawer__body">{children}</div>
        {footer && <footer className="dk-drawer__footer">{footer}</footer>}
      </section>
    </div>,
    target,
  );
}
