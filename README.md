# V4

## Local dev

```
cp .env.local.example .env.local
```

Replace dummy config in `.env.local`

```
cd gatsby
netlify dev
```

## Repo structure

This repo contains directories for each component in our tech stack.

### Contentful

The contentful directory contains subdirectories for contentful apps, UI extension, and migrations.

#### Apps and UI Extensions

Since contentful requires external hosting for anything but the simplest of UI extensions, 
each of these directories has its own netlify site. App/extension source code is located in
the `src` directory, and the netlify sites are setup to run `build-apps.js` and `build-extensions.js`
respectively. The build scripts will create build directories under `contentful/apps` and
`contentful/ui-extensions` and copy the build artifacts there. These build directories are
what will be hosted on Netlify (URLs pending @todo update this) so, for example, an app
named talend-test-app will be hosted at contentful-apps.talend.com/talend-test-app (again, real URL pending).

#### Migrations

Migrations should be handled using the talend CLI tool (/utils/talend/talend.js). Talend
migration commands are an alias of [deluan/contentful-migrate](https://github.com/deluan/contentful-migrate)
and can be used as such -- e.g. `talend migrate up` is the equivalent of `contentful-migrate up`
and will have the same result. Wrapping these commands into our CLI was done to allow basic
configuration using dotenv environment variables, to limit the # of CLI tools we have to
remember, and to allow future customization as needed.

### Gatsby

Pretty standard gatsby installation at this point. This is the root of the main site on
netlify. One current oddity is that it appears that netlify functions are required to be
under the netlify base directory. Since we prefer to keep things separated there is currently
a symlink pointing `/gatsby/netlify-functions` to `/netlify/functions`.

### Netlify

As mentioned above, netlify functions live in `/netlify/functions` but are symlinked in the
gatsby directory due to netlify build requirements.

## CLI tools

To install `talend` commandline utility run `npm install -g` from the root of this project.

To install the contentful CLI run `npm install -g contentful-cli`

To install the netlify CLI `npm install -g netlify-cli`

## Notes

Useful docs:

- [Netlify Dev Documentation](https://github.com/netlify/cli/blob/master/docs/netlify-dev.md)
- [Netlify JavaScript Client Docs](https://github.com/netlify/js-client)
- [Netlify API Docs](https://open-api.netlify.com/)
- [Contentful Custom App Dev](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/)