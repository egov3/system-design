import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { DropDownMenu } from "../DropDownMenu";
import type { IDropDownMenuItem } from "../DropDownMenu";

import styles from "./DropDownMenuAction.module.css";

export interface IDropDownMenuActionProps {
  icon: ReactNode;
  items: IDropDownMenuItem[];
  disabled?: boolean;
  ariaLabel?: string;
}

export const DropDownMenuAction = ({
  icon,
  items,
  disabled = false,
  ariaLabel = "Действия",
}: IDropDownMenuActionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !wrapperRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const menuItems = items.map((item) => ({
    ...item,
    action: () => {
      setIsOpen(false);
      buttonRef.current?.focus();
      item.action();
    },
  }));

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      data-testid="DropDownMenuAction_WRAPPER"
    >
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen && !disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        data-testid="DropDownMenuAction_BUTTON"
      >
        {icon}
      </button>

      {isOpen && !disabled && (
        <div className={styles.dropdown}>
          <DropDownMenu items={menuItems} />
        </div>
      )}
    </div>
  );
};
