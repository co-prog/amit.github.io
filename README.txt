AMIT KUMAR PORTFOLIO  -  100% static (no PHP, no Apache, no Node, no database)
==============================================================================
Everything is plain HTML / CSS / JS files. The admin panel saves into REAL files:

  data/site-data.js        <- all your content (projects, blog, site text, custom HTML/CSS)
  data/users.js            <- admin users (passwords are salted + hashed)
  uploads/videos/          <- uploaded videos
  uploads/images/          <- uploaded images
  uploads/documents/       <- uploaded PDF / Word / Excel / PowerPoint files

HOW TO USE
  1. Open index.html (double-click, or host the folder anywhere that serves static files).
  2. Open setup.html (first time only). It asks WHERE to save, once:
       - Folder on this computer (Chrome / Edge): choose this portfolio folder. Saves go straight into
         data/ and uploads/. The choice is remembered; later you may just click "Reconnect".
       - GitHub (publish online): enter owner/repo, branch and an access token
         (fine-grained token with "Contents: Read and write"). Saves become commits in your repo,
         and GitHub Pages serves the site. No manual upload ever.
     Then create your admin username + password and keep the recovery code.
  3. Next time: login.html -> admin.html.

ADMIN
  Work (category, prototype link, video, cover image, document, HTML), Blog (HTML), Site content,
  Pages & CSS, Media library, Users (Admin / Editor roles, password changes).
  "Storage" in the admin header lets you change where the site is saved.

GOOD TO KNOW
  - GitHub mode: each file must be under ~50 MB (compress videos). Pages takes about a minute to update.
  - Folder mode needs Chrome or Edge. Firefox / Safari can use GitHub mode.
  - The login is a convenience gate: on a static site the hashed passwords sit in data/users.js,
    which is publicly readable once hosted. For real protection use your host's password protection on admin.html.
