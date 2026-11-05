# Free Website Builder Using AI

This is the class website. Students open it in a browser. Progress stays in that browser. There is no login and no database.

## Run it on your computer

You need Node.js 20 or newer. In this folder:

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5173

To check the built site, do not double-click `dist/index.html`. That page looks empty. Use:

```bash
npm run build
npm run preview
```

Then open http://127.0.0.1:4173

If an older copy said `tsc: command not found`, delete the `node_modules` folder, download this copy again, then run `npm install` and `npm run build`. Do not install TypeScript yourself.

## Publish on Cloudflare Pages

This class site is a React app, so Cloudflare must build it. It will not guess the command.

On the build settings screen, type these yourself:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |

Do not leave the build command empty. That setting is only for the plain HTML practice site inside the lessons.

Connect only this GitHub repository. Do not grant access to all repositories.

Do not commit `node_modules` or `dist`. The `.gitignore` file already skips them.
