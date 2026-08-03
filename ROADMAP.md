# Implementation Roadmap — react-native-fn-forms

Execution order. Complete, test, and release each phase before starting the next.
Marketing/distribution (Phase 5) runs in parallel with Phases 1–4, not after them.

---

## Phase 1 — Trust & Quality (v1.3)

**Objective:** Make the package look and behave like an actively maintained, correct library.

**Tasks:**
- [x] Release all pending local work (icon support, docs, snack-examples, phone test) — was already published to npm as 1.2.3/1.2.4 but never committed; git is now in sync
- [x] Fix `isValid` computation
- [x] Catch validator exceptions so they can't become unhandled promise rejections
- [x] Wire accessibility config through to real RN props (labels, hints, roles, error announcements)
- [x] Memoize `FormContext` value + memoize field components to stop full-form re-renders — partial: fixes re-renders from unrelated parent/sibling updates; per-keystroke full-form re-render still needs the Phase 4 architecture pass
- [x] Export missing public types (`CountryCode`, `StorageAdapter`, `DraftData`, `FormState`, real `SmartFormFieldProps`)
- [x] Add CI (lint, test, build on push/PR) — also had to fix `npm run lint`, which was completely broken (missing dependency + invalid config)
- [x] Add README badges (build, coverage, bundle size, npm version) — added CI + bundle size; skipped coverage (needs a third-party service like Codecov connected to the repo — your call) and skipped the demo GIF (needs an actual device/simulator recording)
- [ ] Resolve repo-name vs. package-name branding mismatch — manual step: rename the GitHub repo to `react-native-fn-forms`

**Exit Criteria:** v1.3 published; CI green on main; README shows live badges and a working demo; no known crash-risk or false-config bugs open.

---

## Phase 2 — Competitive Parity (v1.4)

**Objective:** Close the feature gaps that cause developers to pick a competitor instead.

**Tasks:**
- [ ] Ship a country picker component (flags, dial codes, search) for phone fields
- [ ] Add async support to `customValidation` (allow returning a `Promise`)
- [ ] Add Zod/Yup resolver adapters (thin wrapper once async validation lands)
- [ ] Add `forwardRef` to `SmartFormField` / `SmartOTPField`
- [ ] Expose a raw/E.164 phone value alongside the formatted display value
- [ ] Publish a runnable example app + linked Expo Snacks
- [ ] Add a comparison table (this library vs. Formik vs. react-hook-form) to the README

**Exit Criteria:** v1.4 published; country picker and async validation demoed in the example app; resolver adapters have at least one working example each.

---

## Phase 3 — TypeScript Excellence (v2.0, breaking)

**Objective:** Make "TypeScript support" a real, inference-driven claim.

**Tasks:**
- [ ] Design the generic signature for `useSmartForm<TFieldValues>()` (decide before/alongside Phase 2 resolver typings)
- [ ] Implement `Path<TFieldValues>`-based field-name typing across `setFieldValue`, `getFieldProps`, `validateField`, etc.
- [ ] Redesign `FormErrors` as structured objects (`{ type, message, suggestion }`) instead of plain strings
- [ ] Export remaining utility types needed for full inference
- [ ] Write a migration guide from v1.x

**Exit Criteria:** v2.0-beta published; a sample form gets full autocomplete on field names and typed values with no `any` in the public API; migration guide reviewed.

---

## Phase 4 — Architecture Cleanup (v2.0, continued)

**Objective:** Remove technical debt that a major version gives us permission to break.

**Tasks:**
- [ ] Decide fate of dead config (`platform`, no-op `keyboardHandling`, always-false `ValidationRule.validate`) — implement for real or delete
- [ ] Replace `setTimeout`-driven OTP focus handling with a ref/`InteractionManager`-based model
- [ ] Final pass on `FormContext` architecture given the new generic/typed API

**Exit Criteria:** v2.0 stable published; no config option exists that silently does nothing; OTP focus behavior verified across iOS/Android in the example app.

---

## Phase 5 — Marketing & Distribution (parallel, ongoing)

**Objective:** Get the improved package in front of developers — code quality alone won't move downloads.

**Tasks:**
- [ ] Professional README rewrite (already partly covered in Phase 1, extend here)
- [ ] Documentation site
- [ ] Comparison / launch blog post timed to Phase 2 or 3 release
- [ ] YouTube demo
- [ ] Posts: Reddit (r/reactnative), dev.to, Hashnode, LinkedIn, X
- [ ] Submit to Awesome React Native
- [ ] Product Hunt launch

**Exit Criteria:** At least one comparison article published, package listed on Awesome React Native, and a recurring (e.g. monthly) release/update cadence visibly maintained.

---

## Future / Postponed

Not scheduled — revisit only if users request them:

- Field arrays / dynamic field groups
- `Controller`-style API for arbitrary custom inputs
- Full keyboard management (beyond current no-op stub)
- Haptic feedback
- Platform-specific (`ios`/`android`) config
- Progressive phone formatting (format-as-you-type)
- Further OTP redesign beyond the Phase 4 focus-model fix
