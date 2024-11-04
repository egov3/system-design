import React, { HTMLInputTypeAttribute } from "react";
export type TOtpType = "OTP" | "TEXT";
export interface IInputFieldProps {
    onFocus?: () => void;
    onBlur?: () => void;
    onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    isClearable?: boolean;
    inputLeftIcon?: JSX.Element;
    type?: HTMLInputTypeAttribute;
    id: string;
    labelText?: string;
    ariaLabel: string;
}
export declare const InputField: ({ onFocus, onBlur, onChange, onEnterPress, value, inputLeftIcon, placeholder, className, style, isClearable, type, id, labelText, ariaLabel, }: IInputFieldProps) => React.ReactNode;
