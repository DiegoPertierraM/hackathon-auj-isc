import React from 'react';
import { FieldError } from 'react-hook-form';
import { IoWarningOutline } from 'react-icons/io5';

type TextAreaFormProps = React.ComponentProps<'textarea'> & {
  label: string;
  error: FieldError | undefined;
};

export const TextAreaForm = React.forwardRef(
  ({ label, error, ...inputProps }: TextAreaFormProps, ref: React.Ref<HTMLTextAreaElement>) => {
    const rowError = error && 'row__error';
    return (
      <div className="row">
        <label className={`row__label`} htmlFor={inputProps.id}>
          {label}
        </label>
        <div className={`row__container ${rowError}`}>
          <textarea ref={ref} className="row__input" autoComplete="off" {...inputProps} />

          {error && <IoWarningOutline size={22} className="row__icon" />}
        </div>
        <span className="row__message">{error?.message} </span>
      </div>
    );
  }
);
