export type Lang = "en" | "ta" | "ml";

export const langs: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "ta", label: "தமிழ்" },
  { id: "ml", label: "മലയാളം" },
];

type Ui = {
  brand: string;
  doneOf: (done: number, total: number) => string;
  finished: string;
  restart: string;
  clear: string;
  keep: string;
  jump: string;
  lessons: string;
  watch: string;
  youShouldSee: string;
  mark: string;
  marked: string;
  previous: string;
  next: string;
  copied: string;
  themeLight: string;
  themeDark: string;
  donePrefix: string;
  pick: string;
  picked: string;
};

export const ui: Record<Lang, Ui> = {
  en: {
    brand: "Free Website Builder Using AI",
    doneOf: (done, total) => `${done} of ${total} done`,
    finished: "finished",
    restart: "Restart",
    clear: "Clear progress",
    keep: "Keep going",
    jump: "Jump to any lesson",
    lessons: "Lessons",
    watch: "Watch, then do the steps",
    youShouldSee: "You should see",
    mark: "Mark done",
    marked: "Marked done",
    previous: "Previous",
    next: "Next",
    copied: "Copied",
    themeLight: "Light theme",
    themeDark: "Dark theme",
    donePrefix: "Done · ",
    pick: "Use this",
    picked: "Using this",
  },
  ta: {
    brand: "AI மூலம் இலவச இணையதளம்",
    doneOf: (done, total) => `${total} இல் ${done} முடிந்தது`,
    finished: "எல்லாம் முடிந்தது",
    restart: "மறுதொடக்கம்",
    clear: "முன்னேற்றத்தை அழி",
    keep: "தொடர்",
    jump: "எந்த பாடத்துக்கும் செல்",
    lessons: "பாடங்கள்",
    watch: "பார்த்துவிட்டு படிகளை செய்",
    youShouldSee: "நீங்கள் பார்க்க வேண்டியது",
    mark: "முடிந்தது என குறி",
    marked: "முடிந்தது என குறித்தது",
    previous: "முந்தையது",
    next: "அடுத்து",
    copied: "நகலானது",
    themeLight: "வெளிச்ச தீம்",
    themeDark: "இருள் தீம்",
    donePrefix: "முடிந்தது · ",
    pick: "இதை பயன்படுத்து",
    picked: "இதை பயன்படுத்துகிறீர்கள்",
  },
  ml: {
    brand: "AI ഉപയോഗിച്ച് സൗജന്യ വെബ്സൈറ്റ്",
    doneOf: (done, total) => `${total} ൽ ${done} കഴിഞ്ഞു`,
    finished: "എല്ലാം കഴിഞ്ഞു",
    restart: "തുടക്കത്തിലേക്ക്",
    clear: "പുരോഗതി മായ്ക്കുക",
    keep: "തുടരുക",
    jump: "ഏത് പാഠത്തിലേക്കും പോകുക",
    lessons: "പാഠങ്ങൾ",
    watch: "കണ്ടിട്ട് ഘട്ടങ്ങൾ ചെയ്യുക",
    youShouldSee: "നിങ്ങൾ കാണേണ്ടത്",
    mark: "കഴിഞ്ഞു എന്ന് അടയാളപ്പെടുത്തുക",
    marked: "കഴിഞ്ഞു എന്ന് അടയാളപ്പെടുത്തി",
    previous: "മുമ്പത്തേത്",
    next: "അടുത്തത്",
    copied: "പകർത്തി",
    themeLight: "വെളിച്ച തീം",
    themeDark: "ഇരുട്ട് തീം",
    donePrefix: "കഴിഞ്ഞു · ",
    pick: "ഇത് ഉപയോഗിക്കുക",
    picked: "ഇത് ഉപയോഗിക്കുന്നു",
  },
};
