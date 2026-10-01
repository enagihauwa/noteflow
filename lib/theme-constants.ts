// Light/dark theme storage. The key and the bootstrap script live here so the
// inline script in the root layout and the toggle in components/ThemeToggle.tsx
// cannot drift apart — they must agree on the key or the toggle would write a
// value the pre-paint script never reads.
export const THEME_STORAGE_KEY = "noteflow-theme";

export type Theme = "light" | "dark";

// The server cannot know the visitor's theme, so the first paint would always be
// light and then flash. This runs parser-early in <head>, before the body
// renders: it applies the stored choice, or the OS preference when nothing is
// stored, by adding .dark to <html>. globals.css keys the dark palette off that
// class, so there is no second render and no flash.
export function themeBootstrapScript(): string {
  return `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
}
