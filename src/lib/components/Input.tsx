import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  inputSize?: "small" | "medium" | "large";
  containerClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  id,
  label,
  description,
  error,
  startAdornment,
  endAdornment,
  inputSize = "medium",
  containerClassName = "",
  className = "",
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`dk-field ${containerClassName}`.trim()}>
      {label && <label className="dk-field__label" htmlFor={inputId}>{label}</label>}
      <span className="dk-input-wrap" data-size={inputSize} data-invalid={Boolean(error) || undefined}>
        {startAdornment && <span className="dk-input__adornment" aria-hidden="true">{startAdornment}</span>}
        <input
          {...props}
          ref={ref}
          id={inputId}
          className={`dk-input ${className}`.trim()}
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        />
        {endAdornment && <span className="dk-input__adornment" aria-hidden="true">{endAdornment}</span>}
      </span>
      {description && <small className="dk-field__description" id={descriptionId}>{description}</small>}
      {error && <small className="dk-field__error" id={errorId}>{error}</small>}
    </div>
  );
});
