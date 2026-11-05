import { useEffect, useMemo, useState } from "react";
import { Check, Moon, RotateCcw, Sun } from "lucide-react";
import { lessonsFor, partsFor } from "@/lib/lessons";
import { langs, ui, type Lang } from "@/lib/ui";

const STORAGE_KEY = "fwb-progress.v2";
const TOOL_KEY = "fwb-ai";

type Saved = { done: string[]; current: string };
type Theme = "light" | "dark";
type Tool = "grok" | "chatgpt";

function readSaved(valid: Set<string>): Saved | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Saved;
    const current = valid.has(parsed.current) ? parsed.current : "";
    const done = Array.isArray(parsed.done) ? parsed.done.filter((id) => valid.has(id)) : [];
    return { done, current };
  } catch {
    return null;
  }
}

export function ClassApp() {
  const [hydrated, setHydrated] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  const [current, setCurrent] = useState("welcome");
  const [copied, setCopied] = useState(false);
  const [askRestart, setAskRestart] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [tool, setTool] = useState<Tool | "">("");

  const lessons = useMemo(() => lessonsFor(lang), [lang]);
  const parts = useMemo(() => partsFor(lessons), [lessons]);
  const copy = ui[lang];

  useEffect(() => {
    const storedLang = localStorage.getItem("fwb-lang");
    const storedTheme = localStorage.getItem("fwb-theme");
    const nextLang: Lang = storedLang === "ta" || storedLang === "ml" ? storedLang : "en";
    const nextTheme: Theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setLang(nextLang);
    setTheme(nextTheme);
    const list = lessonsFor(nextLang);
    const saved = readSaved(new Set(list.map((lesson) => lesson.id)));
    if (saved?.current) setCurrent(saved.current);
    if (saved) setDone(saved.done);
    const storedTool = localStorage.getItem(TOOL_KEY);
    if (storedTool === "grok" || storedTool === "chatgpt") setTool(storedTool);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ done, current }));
  }, [done, current, hydrated]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("fwb-lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fwb-theme", theme);
  }, [theme]);

  const lesson = lessons.find((item) => item.id === current) ?? lessons[0];
  const index = Math.max(0, lessons.findIndex((item) => item.id === lesson.id));
  const finished = done.length === lessons.length;
  const grouped = parts.map((part) => ({ part, items: lessons.filter((item) => item.part === part) }));

  function openLesson(id: string) {
    setCurrent(id);
    setCopied(false);
    setAskRestart(false);
    setMenuOpen(false);
    document.getElementById("lesson")?.scrollIntoView({ block: "start" });
  }

  function toggleDone() {
    setDone((list) => (list.includes(lesson.id) ? list.filter((id) => id !== lesson.id) : [...list, lesson.id]));
  }

  function restart() {
    localStorage.removeItem(STORAGE_KEY);
    setDone([]);
    setCurrent(lessons[0].id);
    setCopied(false);
    setAskRestart(false);
  }

  function pickTool(id: Tool) {
    setTool(id);
    localStorage.setItem(TOOL_KEY, id);
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
          <div className="min-w-0 sm:flex-1">
            <p className="text-sm font-semibold text-copper">{copy.brand}</p>
            <p className="text-sm text-muted">
              {copy.doneOf(done.length, lessons.length)}
              {finished ? ` · ${copy.finished}` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-full border border-line p-1" role="group" aria-label={copy.jump}>
              {langs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLang(item.id)}
                  className={item.id === lang ? "h-10 rounded-full bg-ink px-3 text-sm font-semibold text-on-ink" : "h-10 rounded-full px-3 text-sm font-semibold"}
                  aria-pressed={item.id === lang}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line"
              aria-label={theme === "dark" ? copy.themeLight : copy.themeDark}
            >
              {theme === "dark" ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
            </button>
            {askRestart ? (
              <>
                <button type="button" onClick={restart} className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-semibold text-on-ink">
                  {copy.clear}
                </button>
                <button type="button" onClick={() => setAskRestart(false)} className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-semibold">
                  {copy.keep}
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setAskRestart(true)} className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold">
                <RotateCcw className="size-4" aria-hidden="true" />
                {copy.restart}
              </button>
            )}
          </div>
        </div>
        <div className="h-1 bg-line">
          <div className="h-1 bg-copper" style={{ width: `${(done.length / lessons.length) * 100}%` }} />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between gap-3 lg:block">
            <label htmlFor="jump" className="text-sm font-semibold">
              {copy.jump}
            </label>
            <button type="button" className="h-11 rounded-full border border-line px-4 text-sm font-semibold lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen}>
              {copy.lessons}
            </button>
          </div>
          <select
            id="jump"
            value={lesson.id}
            onChange={(event) => openLesson(event.target.value)}
            className="mt-2 h-12 w-full rounded-card border border-line bg-card px-3 text-base text-ink"
          >
            {grouped.map((group) => (
              <optgroup key={group.part} label={group.part}>
                {group.items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {done.includes(item.id) ? copy.donePrefix : ""}
                    {item.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <nav aria-label={copy.lessons} className={menuOpen ? "mt-4" : "mt-4 hidden lg:block"}>
            {grouped.map((group) => (
              <div key={group.part} className="mt-4">
                <p className="text-sm font-semibold text-muted">{group.part}</p>
                <ul className="mt-1">
                  {group.items.map((item) => {
                    const active = item.id === lesson.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => openLesson(item.id)}
                          className={
                            active
                              ? "flex min-h-11 w-full items-start gap-2 rounded-card bg-ink px-3 py-2 text-left text-sm text-on-ink"
                              : "flex min-h-11 w-full items-start gap-2 rounded-card px-3 py-2 text-left text-sm"
                          }
                        >
                          {done.includes(item.id) ? (
                            <Check className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                          ) : (
                            <span className="mt-1 size-3.5 shrink-0 rounded-full border border-line" aria-hidden="true" />
                          )}
                          <span>{item.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main id="lesson" className="min-w-0 scroll-mt-24">
          <p className="text-sm font-semibold text-copper">
            {lesson.part} · {index + 1} / {lessons.length}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl">{lesson.title}</h1>
          <p className="mt-3 max-w-2xl text-lg">{lesson.goal}</p>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {parts.map((part) => (
              <span
                key={part}
                className={
                  part === lesson.part
                    ? "shrink-0 rounded-full bg-ink px-3 py-1 text-sm font-semibold text-on-ink"
                    : "shrink-0 rounded-full border border-line px-3 py-1 text-sm text-muted"
                }
              >
                {part}
              </span>
            ))}
          </div>
          {lesson.note ? (
            <p className="mt-4 rounded-card border border-line border-l-4 border-l-copper bg-card px-4 py-3">{lesson.note}</p>
          ) : null}

          {lesson.choices ? (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {lesson.choices.map((choice) => {
                const selected = tool === choice.id;
                return (
                  <article
                    key={choice.id}
                    className={
                      selected
                        ? "rounded-card border-2 border-copper bg-card p-5"
                        : "rounded-card border border-line bg-card p-5"
                    }
                  >
                    <p className="text-sm font-semibold text-copper">{choice.tag}</p>
                    <h2 className="mt-2 text-2xl">{choice.title}</h2>
                    <p className="mt-2 text-muted">{choice.body}</p>
                    <button
                      type="button"
                      onClick={() => pickTool(choice.id)}
                      className={
                        selected
                          ? "mt-4 inline-flex h-11 items-center rounded-full bg-copper px-4 text-sm font-semibold text-on-copper"
                          : "mt-4 inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-semibold"
                      }
                      aria-pressed={selected}
                    >
                      {selected ? copy.picked : copy.pick}
                    </button>
                  </article>
                );
              })}
            </div>
          ) : null}

          <div className="mt-6">
            <h2 className="text-lg">{copy.watch}</h2>
            <video key={lesson.video + lang} controls playsInline preload="metadata" className="mt-3 aspect-video w-full rounded-card border border-line bg-ink" src={lesson.video} />
          </div>

          <ol className="mt-6 grid gap-3">
            {lesson.steps.map((step, stepIndex) => (
              <li key={step} className="flex gap-3 rounded-card border border-line bg-card p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-on-ink">{stepIndex + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>

          {lesson.copy ? (
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg">{lesson.copy.label}</h2>
                <button type="button" onClick={() => copyText(lesson.copy?.text ?? "")} className="inline-flex h-11 items-center rounded-full bg-copper px-4 text-sm font-semibold text-on-copper">
                  {copied ? copy.copied : lesson.copy.label}
                </button>
              </div>
              <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded-card bg-ink p-4 text-sm leading-relaxed text-on-ink">{lesson.copy.text}</pre>
            </div>
          ) : null}

          <div className="mt-6 rounded-card border border-line bg-card p-4">
            <h2 className="text-lg">{copy.youShouldSee}</h2>
            <p className="mt-2 text-muted">{lesson.see}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 pb-8">
            <button type="button" onClick={toggleDone} className="inline-flex h-12 items-center rounded-full bg-ink px-5 text-sm font-semibold text-on-ink">
              {done.includes(lesson.id) ? copy.marked : copy.mark}
            </button>
            {index > 0 ? (
              <button type="button" onClick={() => openLesson(lessons[index - 1].id)} className="inline-flex h-12 items-center rounded-full border border-line px-5 text-sm font-semibold">
                {copy.previous}
              </button>
            ) : null}
            {index < lessons.length - 1 ? (
              <button type="button" onClick={() => openLesson(lessons[index + 1].id)} className="inline-flex h-12 items-center rounded-full border border-line px-5 text-sm font-semibold">
                {copy.next}
              </button>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
