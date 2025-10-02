'use client';

import { ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';





type InputKind = 'text' | 'password' | 'email' | 'tel' | 'textarea' | 'select' | 'date';

interface InputProps<T extends string | number | Date | null = string> {
  id: string;
  name?: string;
  type?: InputKind;
  label: string;
  value: T;
  onChangeAction?: (value: T) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rightElement?: ReactNode;
  textarea?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export default function Input<T extends string | number | Date | null = string>({
  id,
  name,
  type = 'text',
  label,
  value,
  onChangeAction,
  error,
  disabled,
  required,
  rightElement,
  textarea = false,
  options,
}: InputProps<T>) {
  const isTextarea = textarea || type === 'textarea';
  const isSelect = type === 'select';
  const isDate = type === 'date';
  const hasValue = value !== '' && value !== null && value !== undefined;

  return (
    <div className="relative">
      {!isSelect && !isDate && (
        <>
          {isTextarea ? (
            <textarea
              id={id}
              name={name}
              value={value as string}
              onChange={e => onChangeAction?.(e.target.value as T)}
              disabled={disabled}
              required={required}
              placeholder=" "
              rows={3}
              className={`peer w-full px-4 pt-5 pb-2 border rounded-lg text-sm
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                placeholder-transparent ${error ? 'border-red-500' : 'border-gray-300'}
                resize-none`}
            />
          ) : (
            <input
              id={id}
              name={name}
              type={type}
              value={value as string | number}
              onChange={e => onChangeAction?.(e.target.value as T)}
              disabled={disabled}
              required={required}
              placeholder=" "
              className={`peer w-full px-4 pt-5 pb-2 border rounded-lg text-sm
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                placeholder-transparent ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
          )}
        </>
      )}

      {isSelect && (
        <select
          id={id}
          name={name}
          value={value as string}
          onChange={e => onChangeAction?.(e.target.value as T)}
          disabled={disabled}
          required={required}
          className={`peer w-full px-4 pt-5 pb-2 border rounded-lg text-sm
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="" disabled hidden />
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {isDate && (
        <DatePicker
          id={id}
          selected={value as Date | null}
          onChange={date => onChangeAction?.(date as T)}
          dateFormat="yyyy-MM-dd"
          placeholderText=" "
          disabled={disabled}
          className={`peer w-full px-4 pt-5 pb-2 border rounded-lg text-sm
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}`}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      )}

      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 text-sm
          ${hasValue ? 'top-2 text-xs text-blue-600' : 'top-1/2 -translate-y-1/2 text-gray-400 text-base'}
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600`}
      >
        {label}
      </label>

      {rightElement && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
