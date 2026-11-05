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

This screen has no output-directory box. Use two commands:

| Box | Type this |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Leave the preview command as Cloudflare filled it. Leave **Protect with Cloudflare Access** off.

`wrangler.jsonc` tells Cloudflare to publish the `dist` folder. The `"name"` inside that file must match the project name on the form.

Connect only this GitHub repository. Do not grant access to all repositories.

Do not commit `node_modules` or `dist`. The `.gitignore` file already skips them.
