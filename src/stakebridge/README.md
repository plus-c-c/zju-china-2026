# StakeBridge in the wiki

This directory contains the complete StakeBridge application, adapted from
[gulan0918/Stakebridge](https://github.com/gulan0918/Stakebridge) at commit
`10a3cd2d1e2ce2bfb90bb87400c402cbd8617834`.

`stakebridge/index.html` is a second Vite entry. It is embedded beneath the
existing StakeBridge introduction in **Human Practices → Stakeholder Engagement**.
The application and wiki have separate documents, styles and hash navigation,
and are published together by the existing iGEM Pages build. The embedded and
separately opened views use the same browser origin and IndexedDB workspace.

The reviewed registry snapshot is `data/entries.json`. It is bundled into the
application; no GitHub-hosted application, external runtime API or third-party
CDN is required. Fonts and source photographs use the team's iGEM static host.
Links to public evidence, professional contact pages and GitHub contribution
forms remain available to users.

Accepted registry contributions are maintained in the upstream repository's
`public/registry/entries.json`. To publish an updated snapshot in the wiki,
copy the reviewed file into `data/entries.json`, verify its source and contact
permission fields, and rebuild the wiki. Personal interviews and attachments
are stored in the user's browser and are never added to the published registry.

The source is licensed under [MIT](LICENSE). Registry accounts are covered by
[CC BY 4.0](LICENSE-DATA.md), with provenance attached to individual records.
The Outfit font license is retained in `data/outfit-OFL.txt` and linked from
the Handbook.
