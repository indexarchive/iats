# iats

**Internet Archive JavaScript Client which supports reading and writing data in NodeJS and the Browser**

The Internet Archive is a non-profit open platform for archiving the world's free websites, books, movies, software, music, and more.

This JavaScript library enables reading and writing to the Internet Archive APIs in NodeJS **and** in the browser. To learn more about the Internet Archive visit <https://archive.org/about/>.

It's lightweight with very few dependencies (only `xmldom`).

The major APIs are documented here <https://archive.org/services/docs/api/index.html>, but this library supports additional APIs to enable more functionality. It does not abstract much from the APIs, but rather aggregates access to them all in a single multi-purpose library.

This library contains enough functionality to create powerful experiments and new experiences using the Internet Archive's platform and data.

## Installation

Through npm
```
npm i git+https://github.com/shayypy/iats.git
```

~~Load from CDN in browser~~
This package is not currently published on NPM! The outdated browser examples below will load the iajs package from which this is forked.
```
<script src="https://unpkg.com/iajs/dist/ia.browser.js"></script>
```

## Live demos

<https://rchrd2.github.io/iajs/examples/web/01.html>


## Usage Examples

```
<script src="https://unpkg.com/iajs/dist/ia.browser.js"></script>
<script>
ia.GifcitiesAPI.search("snowglobe").then(console.log);

ia.MetadataAPI.get({
  identifier: "mma_the_sphynx_and_great_pyramid_geezeh_271101",
}).then(console.log);

ia.SearchAPI.get({
  q: {collection: "metropolitanmuseumofart-gallery"},
  fields: ["identifier", "title"]
}).then(console.log);
</script>
```

## Running NodeJS examples

```
npm i
node examples/node/01-hello.js

# this will ask you to sign in and create a login config file for other examples
node examples/node/02-login.js

node examples/node/03-reviews.js

# and so on...
```

## Features

This is a fork of [rchrd2/iajs](https://github.com/rchrd2/iajs)! In the **iajs** list are features from the original project, and in the **iats** list are changes made since forking.

**iajs**
- Read item metadata and list of files (Metadata API)
- Update item metadata (Metadata API)
- Search (Search API)
- Search gifcities.org (GifCities API)
- Query related item API (Related Items API)
- Sign in with user/pass (Xauthn API)
- Sign in with s3 tokens
- Sign in from archive.org session cookies
- Add reviews (Reviews API)
- Add page to Wayback (Save Page Now API)
- Query the Wayback Machine (CDX and Available APIs)
- Add/remove/list favorites (bookmarks.php API)
- Create items (S3 API)
- Upload item files (S3 API)

**iats**
- TypeScript
  - Most functions should have acceptably typed signatures. Below is the status of implementing return types for the various APIs.
  - [x] Auth
  - [ ] ~~BookReaderAPI~~ N/A, no content
  - [ ] FavoritesAPI
  - [ ] GifcitiesAPI
  - [x] MetadataAPI
  - [ ] RelatedAPI
  - [ ] ReviewsAPI
  - [ ] S3API
  - [x] SearchAPI
  - [ ] ~~SearchTextAPI~~ N/A, no content
  - [x] ServicesAPI
  - [ ] ViewsAPI
  - [ ] WaybackAPI
  - [ ] ZipFileAPI
- Dropped `node-fetch` and `fetch-jsonp` dependencies (now uses global `fetch`), dropped `prettier` for `@biomejs/biome`
- Allow unquoted wildcard searches & keyless (any field) searches ([iajs#5](https://github.com/rchrd2/iajs/issues/5))
- Renamed default export to `ia` to match examples
- Introduced new `ServicesAPI` for `/services` routes
  - This API currently works a little differently than the rest. When a bad response is encountered, instead of returning the data, it will throw an `ArchiveError`. The error has `status` and `message` props, and you can access the unprocessed response body (parsed if JSON) in `error.data`.
  - As a result, returned data from `ServiceAPI` functions can be handled more cleanly with less boilerplate as long as you have a reliable error handler.

**Planned**
- OpenLibrary.org APIs

## Contribute

PRs welcome! Before opening your request, just run `yarn build` to make sure your code can be rolled up for all supported platforms.

## Misc

See Also:

- Official Internet Archive Python Client - https://github.com/jjjake/internetarchive

---

Screenshot of web usage example

![screenshot](./documentation/img/examples-ss-1.png)
