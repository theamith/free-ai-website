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
  nameLabel: string;
  nameSave: string;
  nameRule: string;
  nameLong: string;
  nameSaved: string;
  urlLooks: string;
  urlProject: string;
  urlSub: string;
  urlFixed: string;
  nameNeed: string;
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
    nameLabel: "Address name",
    nameSave: "Save this name",
    nameRule: "Use small letters, numbers, and hyphens. Do not start or end with a hyphen.",
    nameLong: "Use 63 characters or fewer.",
    nameSaved: "Saved",
    urlLooks: "The address will look like this",
    urlProject: "Project name. You choose it. Same as the GitHub repository.",
    urlSub: "Cloudflare subdomain. Change it later with the pencil. Example: your-name.",
    urlFixed: "workers.dev. This part cannot change.",
    nameNeed: "Save an address name in the address lesson first. The copy still contains SITE-NAME until you do.",
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
    nameLabel: "முகவரி பெயர்",
    nameSave: "இந்த பெயரை சேமி",
    nameRule: "சிறிய ஆங்கில எழுத்து, எண், இடைக்கோடு மட்டும். தொடக்கத்திலும் முடிவிலும் இடைக்கோடு வேண்டாம்.",
    nameLong: "63 எழுத்துகளுக்கு மேல் வேண்டாம்.",
    nameSaved: "சேமித்தது",
    urlLooks: "முகவரி இப்படி இருக்கும்",
    urlProject: "திட்டப் பெயர். நீங்கள் தேர்ந்தெடுப்பது. GitHub களஞ்சியப் பெயரும் இதுவே.",
    urlSub: "Cloudflare subdomain. பிறகு பென்சிலால் மாற்றலாம். உதாரணம்: your-name.",
    urlFixed: "workers.dev. இதை மாற்ற முடியாது.",
    nameNeed: "முதலில் முகவரி பாடத்தில் பெயரை சேமிக்கவும். அதுவரை நகலில் SITE-NAME இருக்கும்.",
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
    nameLabel: "വിലാസത്തിന്റെ പേര്",
    nameSave: "ഈ പേര് സൂക്ഷിക്കുക",
    nameRule: "ചെറിയ ഇംഗ്ലീഷ് അക്ഷരം, അക്കം, ഹൈഫൻ മാത്രം. തുടക്കത്തിലും അവസാനത്തിലും ഹൈഫൻ വേണ്ട.",
    nameLong: "63 അക്ഷരത്തിൽ കൂടരുത്.",
    nameSaved: "സൂക്ഷിച്ചു",
    urlLooks: "വിലാസം ഇങ്ങനെ ആയിരിക്കും",
    urlProject: "പ്രോജക്റ്റ് പേര്. നിങ്ങൾ തിരഞ്ഞെടുക്കുന്നത്. GitHub റിപ്പോസിറ്ററി പേരും ഇതാണ്.",
    urlSub: "Cloudflare subdomain. പിന്നീട് പെൻസിൽ കൊണ്ട് മാറ്റാം. ഉദാഹരണം: your-name.",
    urlFixed: "workers.dev. ഇത് മാറ്റാനാവില്ല.",
    nameNeed: "ആദ്യം വിലാസ പാഠത്തിൽ പേര് സൂക്ഷിക്കുക. അതുവരെ പകർപ്പിൽ SITE-NAME ഉണ്ടാകും.",
  },
};
