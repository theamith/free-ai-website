import { ml, ta } from "@/lib/lesson-i18n";
import type { Lang } from "@/lib/ui";

export type Choice = { id: "grok" | "chatgpt"; tag: string; title: string; body: string };

export type Lesson = {
  id: string;
  video: string;
  part: string;
  title: string;
  goal: string;
  steps: string[];
  see: string;
  note?: string;
  copy?: { label: string; text: string };
  choices?: Choice[];
  pickUrl?: boolean;
};

type Fields = {
  part: string;
  title: string;
  goal: string;
  steps: string[];
  see: string;
  note?: string;
  copyLabel?: string;
  choices?: Choice[];
  pickUrl?: boolean;
};

const prompt = `You are helping a beginner. Do the work yourself. Do not ask me to use a terminal.

=== REPLACE THESE THREE LINES. Leave the labels. Change only the words after the colon. ===
Website name: North Market
Town: your town
Phone, country code then number, digits only: 15555550100
=== END REPLACE ===

The website in this class is a small shop. Build that shop as a static website. No database, no login, no credit card form.

Pages:
1. Home. The website name, one sentence, and a list of products with price, what is in it, and a short honest note. A search box. If the search finds nothing, show a line that says to send Hi on WhatsApp or to call. Buttons for offers. A reviews row that says the reviews are samples until the owner replaces them. A cart. Adding an item changes the button to "Go to cart". The cart has a Close button. Sending the order shows the message, then a button that opens WhatsApp with that message already written, and a button that calls the phone. After that, the cart is empty.
2. Business details. Website name, town, phone, and a note that this page does not take payment.

=== REPLACE THESE PRODUCTS. Keep three lines. Use your own names and prices. ===
1. Ceramic mug — $18 — stoneware mug — holds about 300 ml
2. Linen towel — $24 — washed linen — one towel
3. Candle — $16 — soy wax — unscented
=== END REPLACE ===

Every page needs its own title and meta description. Do not add a noindex tag.
Add robots.txt that allows these pages. Add sitemap.xml that lists them.
Also create README.md. Put the website name and the town in it.
Also create .gitignore with these lines:
node_modules
dist
.DS_Store
Thumbs.db

Also create the Cloudflare files below. The AI does this. You do not edit Cloudflare settings by hand, except one box named later in the class.
package.json
{
  "name": "SITE-NAME",
  "private": true,
  "scripts": {
    "build": "node build.mjs"
  }
}
build.mjs creates a dist folder and copies index.html, styles.css, script.js, details.html, robots.txt, and sitemap.xml into dist. Use Node.js only. Do not add packages.
wrangler.jsonc
{
  "name": "SITE-NAME",
  "compatibility_date": "2026-11-05",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
SITE-NAME in package.json and wrangler.jsonc must stay exactly as written. Do not replace it with the shop display name.

The website files are: index.html, styles.css, script.js, details.html, robots.txt, sitemap.xml, README.md, .gitignore, package.json, build.mjs, wrangler.jsonc.
If you cannot push, give me every file except .gitignore to download. The GitHub website skips a name that starts with a dot.
Text first. Photos optional and small. Easy to read on a phone and on a slow connection.
Do not invent a license number, a Google badge, or fake customer names presented as real.
Orders go to WhatsApp (https://wa.me/ and then the phone digits) or a phone call. There is no checkout and no card form.

Save this website in my GitHub repository named SITE-NAME.
Create that repository if it does not exist. Make it Public.
Commit and push every file.
When the push is done, reply with the GitHub address and the words: Pushed to GitHub.
If you cannot push to GitHub, reply with the words: I cannot push.
Then give me those files to download. Do not include .gitignore. Do not pretend that you pushed.`;

const copies: Record<string, string> = {
  "prompt-parts":
    "Website name: North Market\nTown: your town\nPhone, country code then number, digits only: 15555550100\n\n1. Ceramic mug — $18 — stoneware mug — holds about 300 ml\n2. Linen towel — $24 — washed linen — one towel\n3. Candle — $16 — soy wax — unscented",
  "copy-prompt": prompt,
  "connect-ai":
    "Create the GitHub repository SITE-NAME if it does not exist. Push the website files into it. If you cannot push, reply with the words I cannot push.",
  "link-fix":
    "Cloudflare is already connected to the GitHub repository SITE-NAME. Do not create a new repository. wrangler.jsonc and package.json are already in the project. Do not ask me to change the Cloudflare deploy command. If the build failed, the error text is below. Tell me the one change to make, then commit and push. Reply Pushed to GitHub, or I cannot push. Do not ask for a Cloudflare password or API key.\n\nError:\nPASTE THE RED ERROR HERE",
  deploy:
    "My website address is: PASTE THE workers.dev ADDRESS. Stay in this same chat. When you push, Cloudflare builds a new version by itself. Tell me to wait for Success, then refresh this address. You cannot see Cloudflare.",
  update:
    "In this same chat: change only the mug price to $20. Commit and push to the GitHub repository SITE-NAME. Reply Pushed to GitHub, or I cannot push. Do not say Cloudflare is finished.",
  titles:
    "Give the home page a title and a meta description that use my website name and town. Give the business details page a different title and description. Do not add noindex. Commit and push to SITE-NAME. Reply Pushed to GitHub, or I cannot push.",
  noindex:
    "Remove every noindex tag. I want search engines to list this website. Commit and push to SITE-NAME. Reply Pushed to GitHub, or I cannot push.",
  analytics:
    "Add this Google Analytics 4 measurement id to every page, in the head: G-XXXXXXXX. Do not add noindex. Commit and push to SITE-NAME. Reply Pushed to GitHub, or I cannot push.",
};

const order = [
  "welcome",
  "scope",
  "github-account",
  "site-name",
  "choose-ai",
  "where-to-type",
  "pin-chat",
  "connect-ai",
  "prompt-parts",
  "copy-prompt",
  "github-repo",
  "upload",
  "cloudflare-account",
  "connect",
  "link-fix",
  "deploy",
  "the-order",
  "update",
  "titles",
  "robots",
  "noindex",
  "gsc",
  "analytics",
  "bing",
  "score",
  "business",
  "domain",
  "product-hunt",
] as const;

const videos: Record<string, string> = {
  welcome: "/tutorials/welcome.mp4",
  scope: "/tutorials/scope.mp4",
  "github-account": "/tutorials/github-account.mp4",
  "site-name": "/tutorials/site-name.mp4",
  "cloudflare-account": "/tutorials/cloudflare-account.mp4",
  "choose-ai": "/tutorials/choose-ai.mp4",
  "where-to-type": "/tutorials/where-to-type.mp4",
  "pin-chat": "/tutorials/pin-chat.mp4",
  "connect-ai": "/tutorials/connect-ai.mp4",
  "prompt-parts": "/tutorials/prompt.mp4",
  "copy-prompt": "/tutorials/prompt.mp4",
  "github-repo": "/tutorials/github-repo.mp4",
  upload: "/tutorials/upload.mp4",
  connect: "/tutorials/connect.mp4",
  "link-fix": "/tutorials/link-fix.mp4",
  deploy: "/tutorials/deploy.mp4",
  "the-order": "/tutorials/the-order.mp4",
  update: "/tutorials/update.mp4",
  titles: "/tutorials/scope.mp4",
  robots: "/tutorials/robots.mp4",
  noindex: "/tutorials/noindex.mp4",
  gsc: "/tutorials/gsc.mp4",
  analytics: "/tutorials/analytics.mp4",
  bing: "/tutorials/bing.mp4",
  score: "/tutorials/score.mp4",
  business: "/tutorials/business.mp4",
  domain: "/tutorials/domain.mp4",
  "product-hunt": "/tutorials/product-hunt.mp4",
};

const en: Record<string, Fields> = {
  welcome: {
    part: "Start",
    title: "What this class is",
    goal: "A free website. No bill, and no credit card, unless you choose the paid ChatGPT path.",
    steps: [
      "First make a free GitHub account. Then choose the web address. That name is the GitHub repository.",
      "Then send the prompt in that same chat and let the AI push the website to GitHub.",
      "Only after the push: make the free Cloudflare account, then connect that one GitHub repository.",
      "You do not use a terminal. You do not type a password into the chat. You do not paste a Cloudflare setup prompt.",
      "Your place in this class is saved in this browser. Restart clears it.",
    ],
    see: "You know the order: GitHub, then the AI, then the first push, then Cloudflare.",
  },
  scope: {
    part: "Start",
    title: "What the website is about",
    goal: "This class builds a website. The website used here is a shop.",
    steps: [
      "From this lesson on, the example is a shop. When a lesson means that example, it says shop. Every other lesson says website.",
      "The shop lists products with prices, what is in each one, and a short note.",
      "It has offers, search, sample reviews, and a cart with a Close button.",
      "If search finds nothing, the page says to send Hi on WhatsApp or to call.",
      "An order opens WhatsApp with the text already written, or starts a call. There is no card payment.",
    ],
    see: "You can say what this shop website must do. The video is that shop.",
  },
  "github-account": {
    part: "GitHub",
    title: "Create the GitHub account",
    goal: "Do this before you open the AI. Free. No card.",
    steps: [
      "Open github.com/signup.",
      "Enter your email, a password, and a username.",
      "Type the code from your email.",
      "If you see a paid Copilot offer, choose the free account. Do not add a card.",
    ],
    see: "You are signed in. Your username shows in the corner.",
    note: "The video is the real GitHub home page. Click Sign up. The form then asks for your email, a password, and a username. That form blocks a recording.",
  },
  "site-name": {
    part: "Address",
    title: "Choose the web address",
    goal: "The name you save here is the first part of the address, and the GitHub repository name.",
    steps: [
      "Type a short name in the box. Small letters, numbers, and hyphens only. Example: apple-orange.",
      "The line under the box is the address. apple-orange is the project name. your-name is the Cloudflare subdomain. workers.dev never changes.",
      "Save. Copying a prompt later fills this name in. You do not type it again.",
      "On Cloudflare, the pencil beside Subdomain changes only the middle part. The video shows that screen. It moves every site on the account.",
    ],
    see: "A valid name is saved, and the address line shows it.",
    note: "North Market is the name on the page. apple-orange is the address. They are not the same.",
    pickUrl: true,
  },
  "cloudflare-account": {
    part: "Cloudflare",
    title: "Create the Cloudflare account",
    goal: "Do this only after GitHub has the website. Free. No card.",
    steps: [
      "Open dash.cloudflare.com and choose Sign up.",
      "Continue with Google, Apple, or GitHub. Or type your email and a password.",
      "Tick Verify you are human. Click Sign up.",
      "Open the email from Cloudflare and confirm it.",
      "You should see Account home, with the words Ready when you are. If it asks for a card, do not enter one.",
      "Optional: open Workers & Pages. The pencil beside Subdomain changes the middle of the address. workers.dev stays. This moves every site on the account.",
    ],
    see: "You are on the Cloudflare home screen. No card was added.",
    note: "The video is the real sign-up screen, then the real home screen.",
  },
  "choose-ai": {
    part: "Connect the AI",
    title: "Pick Grok or ChatGPT",
    goal: "Two choices. Only one of them can push to GitHub on a free account.",
    steps: [
      "Read both cards. Pick one and stay with it.",
      "Grok is the free choice for this class.",
      "ChatGPT’s free website cannot push the files. Codex on the website needs a paid plan.",
      "Do not type either password into a chat.",
    ],
    see: "You have picked one tool, and you know whether it costs money.",
    choices: [
      {
        id: "grok",
        tag: "Free. This can do the job.",
        title: "Grok",
        body: "On grok.com, a free account can connect GitHub and push a small website. Free use is limited, so it may slow down or show an upgrade box. You do not have to pay to try. If it says it cannot push, or the only button left is a paid plan, stop. Do not enter a card. Use the manual upload lesson later.",
      },
      {
        id: "chatgpt",
        tag: "Needs a subscription for this job.",
        title: "ChatGPT Codex",
        body: "A free ChatGPT account includes a small Codex in the desktop app only, with tight limits. The free chatgpt.com chat cannot push this website to GitHub. Pushing from the ChatGPT website needs ChatGPT Plus, about $20 a month. If you will not pay, do not pick this. Pick Grok.",
      },
    ],
  },
  "where-to-type": {
    part: "Connect the AI",
    title: "Where the words go",
    goal: "One box, at the bottom of the chat you just opened.",
    steps: [
      "Grok: open grok.com and sign in. ChatGPT: open chatgpt.com and sign in. Use the tool you picked.",
      "Start one new chat. Do not start a second one later.",
      "The long box at the bottom is the only place you type. On Grok it says Ask Grok anything. On ChatGPT it may say Ask anything, Message, or How can I help.",
      "Click in that box. Paste with Ctrl+V, or Command+V on a Mac. On a phone, press and hold, then Paste.",
      "Send with the arrow on the right side of the same box. The reply appears above it.",
    ],
    see: "One chat is open, and you can point at the bottom box.",
    note: "Do not type the prompt into Google, email, or the GitHub website.",
  },
  "pin-chat": {
    part: "Connect the AI",
    title: "Pin this chat and stay in it",
    goal: "Every later fix is typed in this same chat. A new chat does not know your website.",
    steps: [
      "Look at the list of chats on the left. On a phone, open the menu first.",
      "On this chat, open its menu. It is often three dots. Choose Pin. The chat stays at the top.",
      "If you do not see Pin, remember the first words of the chat so you can find it again. Click that old chat. Do not click New chat.",
      "Tomorrow, next week, and for every new product: open this pinned chat and type in the same bottom box.",
    ],
    see: "The chat is pinned, or you can find it again without starting a new one.",
    note: "Grok and ChatGPT both keep old chats in a side list. The rule is the same. Same chat. Same box. Choose Pin. Do not choose Lock chat. Lock chat hides the chat behind a PIN. That is the wrong button.",
  },
  "connect-ai": {
    part: "Connect the AI",
    title: "Connect GitHub to the AI",
    goal: "The AI saves the website. You do not upload files if it can push.",
    steps: [
      "Grok: on grok.com open Connectors, or Settings, and choose GitHub, then Connect. Approve on GitHub. Come back to the pinned chat.",
      "ChatGPT, only if you are paying for Plus: profile picture, Settings, Apps, GitHub, Connect. Free ChatGPT will not finish the push. Switch to Grok instead.",
      "In the pinned chat, paste the question below and send it.",
      "Never type your GitHub password into the box.",
      "If the reply says I cannot push, use the two manual lessons after the prompt. Skip them if it really pushed.",
    ],
    see: "GitHub shows a repository with the name you saved, or the reply says I cannot push.",
    copyLabel: "Copy the question",
  },
  "prompt-parts": {
    part: "First push",
    title: "What you change in the prompt",
    goal: "Three lines, and the product list. The prompt stays in English.",
    steps: [
      "The blocks that say REPLACE are the only parts you change.",
      "Website name, town, and phone. The phone is country code plus number, digits only. Example: 15551234567.",
      "The product lines. Each line is name, price, what it is, and one honest note.",
      "Leave the GitHub lines and the file names as they are. The copy button fills your saved address name.",
    ],
    see: "Your name, town, phone, and products are in the prompt. The rest still matches.",
    note: "English is easier for Grok and ChatGPT to follow. You do not translate the prompt.",
    copyLabel: "Copy the lines you replace",
  },
  "copy-prompt": {
    part: "First push",
    title: "Send the prompt in the pinned chat",
    goal: "Paste it into the same bottom box. Do not open a new chat.",
    steps: [
      "Change the REPLACE lines. Copy the whole prompt.",
      "Open the pinned chat. Click the bottom box. Paste. Click the arrow.",
      "Wait. A good reply ends with Pushed to GitHub, or with I cannot push.",
      "If it offers a paid upgrade, and you picked Grok, ignore it unless the push is impossible.",
    ],
    see: "The reply is in the pinned chat. You did not use a terminal.",
    copyLabel: "Copy the prompt",
  },
  "github-repo": {
    part: "First push",
    title: "Create the repository only if asked",
    goal: "Skip this if the AI already created the repository with your saved name.",
    steps: [
      "On GitHub, click the + , then New repository.",
      "Name: the name you saved. Example: apple-orange. Choose Public.",
      "Do not tick Add a README or Add .gitignore. The AI creates those files. Ticking them here can block the first push.",
      "Click Create repository.",
    ],
    see: "The page says your username / your saved name, or you skipped this lesson.",
    note: "The video is GitHub's own picture of this screen. Your page has the same buttons: the +, New repository, Public, and Create repository.",
  },
  upload: {
    part: "First push",
    title: "Upload files only if the AI cannot push",
    goal: "A fallback. The GitHub website is clumsy with many files.",
    steps: [
      "Skip this if the reply said Pushed to GitHub.",
      "Ask in the same chat for a download of these files: index.html, styles.css, script.js, details.html, robots.txt, sitemap.xml, README.md, package.json, build.mjs, wrangler.jsonc.",
      "Do not wait for .gitignore. The GitHub website skips names that start with a dot. The website still works without that file.",
      "On the repository, click Add file, then Upload files. Drag those files. Commit changes.",
    ],
    see: "index.html is in the repository, and your website name is inside it.",
    note: "The video is GitHub's own picture of Add file, then Upload files.",
  },
  connect: {
    part: "Cloudflare",
    title: "Connect the one repository",
    goal: "You do this by hand, once. The AI does not log into Cloudflare.",
    steps: [
      "Do not paste a Cloudflare password, an API key, or the Cloudflare agent-setup prompt into the chat. That prompt is for a terminal. This class does not use it.",
      "On Account home, open Compute, then Workers & Pages.",
      "Click the blue Create application button.",
      "Click Connect GitHub. Do not click Hello World, a template, or Upload your static files.",
      "On GitHub, choose Only select repositories. Do not choose All repositories.",
      "Open Select repositories and pick only the repository with your saved name. Click Install & Authorize.",
      "On the next screen, the project name must match that repository. Cloudflare usually fills it. Fix it only if it does not match.",
      "Build command is the only box you type in. Type npm run build. Leave Deploy command as npx wrangler deploy. Leave Preview command as it is.",
      "Leave Enable Preview builds on. Leave Protect with Cloudflare Access off. Do not open Advanced. Click Deploy.",
      "Wait while it says Setting up your repository.",
    ],
    see: "A deployment starts for your repository. You did not change the deploy command.",
    note: "The video is the real Cloudflare screen: pick the repository, the project name, the build box, and Deploy.",
  },
  "link-fix": {
    part: "Cloudflare",
    title: "If GitHub linking fails",
    goal: "Skip this if Install & Authorize worked.",
    steps: [
      "On GitHub, open Settings, then Applications.",
      "Find the Cloudflare app. Uninstall it, or remove your repository and save.",
      "Go back to Cloudflare. Click Create application, then Connect GitHub again.",
      "Again choose Only select repositories, and only your saved repository. Click Install & Authorize.",
      "If a build still fails, paste the red error into the pinned chat with the note below.",
    ],
    see: "The repository is selected, or you skipped this because the link already worked.",
    copyLabel: "Copy the fix",
    note: "Do not give Cloudflare access to all repositories.",
  },
  deploy: {
    part: "Cloudflare",
    title: "Check the first publish",
    goal: "The website is on the internet. The address can take a few minutes to open.",
    steps: [
      "Wait until the log says Success. Build completed. The address is in that log. It looks like https://apple-orange.your-name.workers.dev.",
      "Wait a few minutes, then open that address on your computer and on your phone.",
      "If the browser says it cannot make a secure connection, wait and try the same address again. Do not click Advanced.",
      "If the website opens but looks wrong, go to the pinned chat and ask for a fix. After Pushed to GitHub, Cloudflare builds a new version by itself. You do not click Deploy again.",
      "When the new build says Success, refresh. Then paste the address into the pinned chat with the note below.",
    ],
    see: "The website loads. It is not a browser warning and not a Cloudflare error page.",
    copyLabel: "Copy what to tell the AI",
  },
  "the-order": {
    part: "Later changes",
    title: "The order after the first publish",
    goal: "Same chat. Then GitHub. Then you check Cloudflare.",
    steps: [
      "1. Open the pinned chat. Type in the same bottom box. Do not click New chat.",
      "2. Wait until the reply says Pushed to GitHub.",
      "3. Cloudflare builds a new version by itself. You do not click Deploy again, and you do not upload files to Cloudflare.",
      "The AI can confirm GitHub. It cannot see Cloudflare. You wait for Success, refresh the workers.dev address, then tell the chat if the website shows the change.",
    ],
    see: "You can say the three steps without looking them up.",
  },
  update: {
    part: "Later changes",
    title: "Publish one change and check it",
    goal: "Practice the order once, in the pinned chat.",
    steps: [
      "In the pinned chat, paste the message below.",
      "Wait for Pushed to GitHub. If it says I cannot push, use the upload lesson, then come back.",
      "Open Cloudflare. A new build starts on its own. Wait for Success. Build completed.",
      "Refresh the website. If the price is old, wait two minutes and refresh again.",
      "Reply in the same chat: it is live, or it is not live yet.",
    ],
    see: "The live website shows the new price.",
    copyLabel: "Copy the change",
  },
  titles: {
    part: "Be found",
    title: "Titles and descriptions",
    goal: "Each page has its own title.",
    steps: [
      "On the live website, the browser tab should be your website name, not index.html.",
      "If it is wrong, paste the fix into the pinned chat and wait for the GitHub push, then Cloudflare Success.",
    ],
    see: "The tab shows your website name.",
    copyLabel: "Copy the title fix",
  },
  robots: {
    part: "Be found",
    title: "robots.txt and the sitemap",
    goal: "Google is allowed to read the website.",
    steps: [
      "Open your workers.dev address with /robots.txt on the end. You should see Allow, not Disallow: /.",
      "Open the address with /sitemap.xml on the end. You should see both pages.",
      "If a file is missing, ask in the pinned chat, then wait for Cloudflare Success.",
    ],
    see: "Both links open.",
  },
  noindex: {
    part: "Be found",
    title: "Remove noindex",
    goal: "The website is not hiding from Google.",
    steps: [
      "On the live page, right-click and choose View page source.",
      "Search for noindex. It should not be there.",
      "If you find it, send the fix in the pinned chat.",
    ],
    see: "A search for noindex finds nothing.",
    copyLabel: "Copy the noindex fix",
  },
  gsc: {
    part: "Be found",
    title: "Google Search Console",
    goal: "Tell Google the website exists. Free.",
    steps: [
      "Open search.google.com/search-console. Add a property. Choose URL prefix. Paste your https workers.dev address.",
      "Google shows a tag. Paste that tag into the pinned chat and ask for a push.",
      "After Cloudflare says Success, click Verify. Then submit sitemap.xml.",
    ],
    see: "Search Console says the sitemap was received. That can take a day.",
  },
  analytics: {
    part: "Be found",
    title: "Google Analytics",
    goal: "See that one visit happened. Free.",
    steps: [
      "Open analytics.google.com. Create a free property for the website. Skip paid offers.",
      "Copy the id that looks like G-XXXXXXXX.",
      "Paste the message below into the pinned chat. Wait for Cloudflare Success.",
      "Open the website. In Analytics, open Realtime. You should see one visitor.",
    ],
    see: "Realtime shows a visitor.",
    copyLabel: "Copy the Analytics ask",
  },
  bing: {
    part: "Be found",
    title: "Bing Webmaster Tools",
    goal: "Submit the same website to Bing. Free.",
    steps: [
      "Open bing.com/webmasters and sign in.",
      "Choose Import from Google Search Console.",
      "Confirm sitemap.xml is listed.",
    ],
    see: "Bing lists the website.",
  },
  score: {
    part: "Be found",
    title: "A speed score, not a badge",
    goal: "Check that the website is light.",
    steps: [
      "Open pagespeed.web.dev. Paste your workers.dev address. Click Analyze.",
      "Read the mobile number. If it is low, ask in the pinned chat to remove large photos and push.",
      "Do not add a badge that says Google verified or Google recommended. There is no such badge.",
    ],
    see: "You have a PageSpeed number. The website has no fake seal.",
  },
  business: {
    part: "Optional",
    title: "Google Business Profile",
    goal: "Only if this website is a real shop.",
    steps: [
      "Skip this for a practice website.",
      "The owner opens business.google.com with the shop’s own Google account.",
      "Add the shop name, town, phone, hours, and the workers.dev address.",
      "Wait for Google’s postcard or video. Do not invent a code.",
    ],
    see: "The listing matches the website, or you skipped this.",
    note: "Only the owner of the real shop should do this.",
  },
  domain: {
    part: "Optional",
    title: "Your own website name",
    goal: "Only if you later buy a domain. This part costs money.",
    steps: [
      "Skip this if you are staying on workers.dev.",
      "On the worker, open Domains, then Add. Enter the name you bought.",
      "Send www.yourname.com to https://yourname.com with one redirect rule, status 301.",
    ],
    see: "The name without www opens the website. The www name jumps to it.",
    note: "You do not need this to finish the class.",
  },
  "product-hunt": {
    part: "Optional",
    title: "Product Hunt",
    goal: "Skip it for a local website.",
    steps: [
      "Product Hunt is for launching a tech product to strangers on the internet.",
      "Your customers will not look there.",
      "Skip it.",
    ],
    see: "You left Product Hunt unopened.",
  },
};

const packs: Record<Lang, Record<string, Fields>> = { en, ta, ml };

export function lessonsFor(lang: Lang): Lesson[] {
  const pack = packs[lang];
  return order.map((id) => {
    const fields = pack[id] ?? en[id];
    const text = copies[id];
    return {
      id,
      video: videos[id],
      part: fields.part,
      title: fields.title,
      goal: fields.goal,
      steps: fields.steps,
      see: fields.see,
      note: fields.note,
      choices: fields.choices,
      pickUrl: fields.pickUrl,
      copy: text ? { label: fields.copyLabel ?? en[id].copyLabel ?? "Copy", text } : undefined,
    };
  });
}

export function partsFor(lessons: Lesson[]): string[] {
  return [...new Set(lessons.map((lesson) => lesson.part))];
}
