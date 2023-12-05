"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import React from "react";
import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

const ThemeSwitch = (props) => {
    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps,
    } = useSwitch(props);

    const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input
            {...getInputProps()}
            className="focus:outline-none"
          />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-transparent hover:bg-default-100",
            ],
          })}
        >
          {isSelected ? (
            <MoonIcon setTheme={setTheme} />
          ) : (
            <SunIcon setTheme={setTheme} />
          )}
        </div>
      </Component>
    </div>
  );
};

export default function ThemeSwitcher() {
  return <ThemeSwitch />;
}

