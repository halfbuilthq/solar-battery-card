# Contributing

## Commit messages

Use Conventional Commits so GitHub release notes stay readable and version
changes are predictable:

- `fix(scope): summary` for backwards-compatible bug fixes
- `feat(scope): summary` for backwards-compatible features
- `docs: summary`, `test: summary`, or `chore: summary` for maintenance
- Add `!` and a `BREAKING CHANGE:` footer for incompatible changes

Keep the summary imperative, concise, and specific. Examples:

```text
fix(chart): keep the tooltip beside the pointer
feat(editor): add configurable history duration
chore(release): prepare v0.2.0
```

## Versioning and releases

Releases follow Semantic Versioning and use tags in the form `vX.Y.Z`:

- Patch: backwards-compatible fixes
- Minor: backwards-compatible features
- Major: breaking configuration or behavior changes

Before tagging a release:

1. Update `package.json` and `package-lock.json` to the release version.
2. Run `npm run check`.
3. Commit with `chore(release): prepare vX.Y.Z`.
4. Create and push the matching `vX.Y.Z` tag.

The release workflow publishes the built card and GitHub release notes. HACS
then uses that GitHub release version for Home Assistant update entities.
