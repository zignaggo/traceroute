import { ThemeType } from "@/@types";
import { batch, effect, signal } from "@preact/signals-react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export const theme = signal<ThemeType>("dark");
export const isMaximized = signal<boolean>(false);
/**
 * Timeout in seconds
 */
export const timeout = signal<number>(1);
/**
 * Number of hops
 */
export const hops = signal<number>(15);

batch(() => {
  getCurrentWindow()
    .theme()
    .then((value) => {
      theme.value = value ?? "dark";
    });
  getCurrentWindow()
    .isMaximized()
    .then((value) => {
      isMaximized.value = value;
    });
});

export const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
};

effect(() => {
  document.body.classList.toggle("dark", theme.value === "dark");
});
