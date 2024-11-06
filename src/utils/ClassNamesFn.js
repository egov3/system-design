"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassNamesFn = void 0;
const ClassNamesFn = (...args) => args.filter((item) => !!item).join(" ");
exports.ClassNamesFn = ClassNamesFn;
