# Changelog

All notable changes to Loophole are documented here.

## 1.1.0 — 2026-11-16

### New rules (50 → 61)

- **SSTI001** (high) — server-side template injection: user input used
  *as* the template in EJS/Pug/Nunjucks/Handlebars (JS), Jinja2
  `Template`/`render_template_string` (Python), `text/template` /
  `html/template` `.Parse` (Go), Twig `createTemplate` / `Blade::render`
  (PHP).
- **COOKIE001** (medium) — cookies set without `HttpOnly`, or the flag
  explicitly disabled (`httpOnly: false`, Django
  `SESSION_COOKIE_HTTPONLY = False`, …).
- **RAND004** (medium) — PHP `rand()`/`mt_rand()`/`uniqid()` and friends
  used for tokens, OTPs and other security-sensitive values.
- **TLS003** (high) — TLS validation disabled via `ssl.CERT_NONE`,
  `_create_unverified_context()`, `check_hostname = False`,
  `CURLOPT_SSL_VERIFYHOST 0`, or `NODE_TLS_REJECT_UNAUTHORIZED=0`.
- **CORS002** (high) — CORS that reflects any request `Origin`, or
  combines credentials with a wildcard origin (CORS001 covers the
  plain wildcard).
- **CRLF001** (medium) — HTTP header injection: user-influenced values
  written into response headers (response splitting).
- **CMP001** (medium) — secrets/tokens compared with `==`/`===`
  instead of a constant-time comparison (timing side channel; PHP
  type juggling).
- **REDIR002** (medium) — DOM open redirect: `location` assigned or
  navigated from user input in JS/TS (REDIR001 covers server-side).
- **XXE002** (high) — libxmljs entity expansion enabled
  (`noent: true`, `dtdload: true`, `nonet: false`).
- **XSS005** (high) — `insertAdjacentHTML` with dynamic content, Vue
  `v-html`, Angular `bypassSecurityTrust*`.
- **DESER002** (high) — `jsonpickle.decode` (Python) and
  `v8.deserialize` (JS) on dynamic data.

### New features

- **Config file** — `.loophole.json` in the scanned root (or
  `--config FILE`): `exclude` paths, `disable` rule ids, per-rule
  `severity` overrides.
- **Inline suppression alias** — `// loophole:ignore RULEID` (space or
  `=` form, or bare) now works alongside the existing
  `loophole: skip` comments.
- **Baseline** — `--write-baseline baseline.json` records current
  findings; `--baseline baseline.json` hides them so CI fails only on
  new issues.
- **HTML report** — `--html report.html` writes a single
  self-contained HTML report (inline CSS, no external assets) with
  findings grouped by severity.

### Changed

- `VERSION` in `loophole.py` synced with the release line (was stuck
  at `0.1.0`).

## 1.0.0

- First public release: 50 rules across JavaScript/TypeScript, Python,
  Go and PHP; taint tracking; terminal, JSON and SARIF output;
  `--fix-dry` patch suggestions; inline `loophole: skip` suppressions;
  GitHub Action with SARIF upload to code scanning.
