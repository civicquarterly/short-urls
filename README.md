short-urls
==========

used for redirecting cvq.me short links to full target urls

## how to add a URL
If you are a Civic Quarterly editor or contributor, you might want to add a URL to point to an article or some other source.
Edit the `urls.json` file. Add a property with the name of the URL slug you want, with a value of the target URL. For example, if you want `http://cvq.me/ocelots` to point to `https://en.wikipedia.org/wiki/Ocelot`, you would add a line like
```
,  "/ocelots": "https://en.wikipedia.org/wiki/Ocelot"
```

Note that style-wise, this file uses comma-first notation. This is to make it easier to add new lines without having to modify existing lines.
