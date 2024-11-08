"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const ClassNamesFn_1 = require("~utils/ClassNamesFn");
const InputField_module_scss_1 = __importDefault(require("./InputField.module.scss"));
const _svg_1 = require("~svg");
const InputField = ({ onFocus, onBlur, onChange, onEnterPress, value = "", inputLeftIcon, placeholder = "", className = "", style, isClearable = false, type = "text", id, labelText = "", ariaLabel = "", }) => {
    const [focused, setFocused] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)("div", { "data-testid": "InputField_MAIN", className: (0, ClassNamesFn_1.ClassNamesFn)(InputField_module_scss_1.default[labelText.length ? "inputContainerLabeled" : "inputContainer"], className, focused ? InputField_module_scss_1.default[`input--onfocus`] : undefined, InputField_module_scss_1.default[`input-${type === null || type === void 0 ? void 0 : type.toLocaleLowerCase()}`]), style: style, children: [labelText.length > 0 && ((0, jsx_runtime_1.jsx)("label", { htmlFor: id, "data-testid": "InputField_LABEL", children: labelText })), inputLeftIcon, (0, jsx_runtime_1.jsx)("input", { "data-testid": "InputField_INPUT", "aria-label": ariaLabel, id: id, type: type, className: InputField_module_scss_1.default.input, placeholder: placeholder, "aria-placeholder": placeholder, onFocus: () => {
                    setFocused(true);
                    if (onFocus) {
                        onFocus();
                    }
                }, onBlur: () => {
                    setFocused(false);
                    if (onBlur) {
                        onBlur();
                    }
                }, onChange: onChange, onKeyDown: (event) => {
                    if (onEnterPress && event.key === "Enter") {
                        onEnterPress(event);
                    }
                }, value: value, readOnly: !onChange }), isClearable && value && ((0, jsx_runtime_1.jsx)(_svg_1.ClearIcon, { fill: "red", pathFill: "#758393", className: InputField_module_scss_1.default.clearIcon, onClick: () => {
                    if (onChange) {
                        onChange({
                            target: { value: "" },
                        });
                    }
                } }))] }));
};
exports.InputField = InputField;
