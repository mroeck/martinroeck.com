# martinroeck.com

Personal academic website. Static Jekyll site, built and served by GitHub
Pages — nothing to install, nothing to compile on your machine.

---

## Putting it online

**1. Make a repository.** On github.com, click **New repository**.

- Name it `martinroeck.github.io` (replacing `martinroeck` with your GitHub
  username) if you want the plain address `https://<username>.github.io`.
- Or name it anything, e.g. `website`, and the address becomes
  `https://<username>.github.io/website/`.
- Set it to **Public**. GitHub Pages needs public on a free account.
- Do not tick "Add a README" — this folder already has one.

**2. Upload the files.** The simplest route, no command line:

- On the empty repository page, click **uploading an existing file**.
- Drag in the *contents* of this folder — `index.md`, `about.md`, `_config.yml`,
  the `_data`, `_includes`, `_layouts` and `assets` folders, and the rest.
  Drag the contents, not the folder itself.
- Write "Initial site" in the commit box and click **Commit changes**.

With git, from inside this folder:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

**3. Turn on Pages.** In the repository: **Settings** → **Pages** (left
sidebar) → under *Build and deployment*, set **Source** to "Deploy from a
branch", **Branch** to `main` and folder to `/ (root)`. Click **Save**.

**4. Wait a minute.** The **Actions** tab shows the build running. When it
goes green the site is live. First builds take one to two minutes; later ones
are quicker.

### Your own domain

`CNAME` in this folder contains `martinroeck.com`. For that to work, add these
records at whoever manages the domain:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<username>.github.io` |

Then in **Settings → Pages**, enter the domain under *Custom domain* and tick
**Enforce HTTPS** once the certificate appears (can take an hour).

Not using a custom domain? Delete `CNAME`, and in `_config.yml` set:

```yaml
url: "https://<username>.github.io"
baseurl: "/<repository>"     # leave as "" if the repo is <username>.github.io
```

### Changing something later

Edit the file on github.com — click the file, then the pencil icon, then
**Commit changes**. The site rebuilds itself within a minute. If a build
fails, GitHub emails you and the **Actions** tab says why.

---

## Adding a publication

Open `publications.md`, find the right heading, and add one line beginning
with `- `. That's it.

```
- Alaux N, Allacker K, Passer A, Röck M. Context-specific life cycle emissions
  pathways for EU buildings. *Nature Communications*, 2026. https://doi.org/10.1038/s41467-026-73433-1
```

Three things happen automatically:

- **Röck M** is bolded wherever it appears in the line
- any bare `https://` address becomes a clickable link
- `*text between asterisks*` renders italic — used here for journal names

Entries appear in the order you write them, so put new ones at the top of
their section. Nothing else needs touching.

To change the name that gets bolded, or the citation-metrics line under the
intro, edit `author_cite:` and `metrics:` in `_config.yml`.

## Adding a project

Open `projects.md` and add a line under **Current** or **Concluded**:

```
- **Project name** (Funder, 2024–2027). Partners. My role.
```

To make the name a link, write `[**Project name**](https://example.com)`.
To conclude a project, move its line down to the other heading.

## Adding a photo

Put the file in `assets/img/`, then add three lines to `_data/photos.yml`
under either `work:` or `outdoors:`:

```yaml
  - file: new-photo.jpg
    alt: "What the photo shows, for screen readers"
    caption: "Shown under the frame."
```

The carousels pick it up automatically. Resize large photos to about 1600px
on the long edge first, so pages stay quick to load.

## Everything else

```
_config.yml           title, tagline, links, navigation, metrics
index.md              Home          ← prose, edit freely
about.md              About         ← prose and the ten lessons
research.md           Research      ← prose
cv.md                 CV            ← prose
publications.md       Publications  ← one line per entry
projects.md           Projects      ← one line per entry
_data/photos.yml      the two carousels
_includes/            carousel markup; no need to touch
_layouts/default.html page frame: header, navigation, footer
assets/css/style.css  all styling
assets/js/carousel.js carousel behaviour
CNAME                 custom domain
```

## Previewing on your own machine (optional)

Only worth setting up if you edit often and want to see changes before they
go live.

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`. Requires Ruby.
