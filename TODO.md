# Progress Tracking Redesign and Color Brightening TODO

## Completed
- [x] Create TODO.md for tracking

## Pending
- [x] Update src/index.css: Brighten colors (increase saturation/lightness for primary, success, etc.; add chart accents)
- [x] Create src/components/ProgressTracking.tsx: Implement header, filter bar, stats row, overview section, charts (pie and bar)
- [x] Update src/pages/Index.tsx: Replace "progress" case with import and render of ProgressTracking
- [ ] Test: Run dev server, launch browser, verify layout/colors match image
- [ ] Update TODO.md with completions

## Color Theme Update to #42B40C Green and Black Text
### Completed
- [x] Update src/index.css: Set --primary, --success, --chart-green to 100 93% 35%; --foreground to 0 0% 0% in :root; update gradients (--gradient-healing) and --shadow-glow to use new HSL values.
- [x] Update src/App.css: Set .read-the-docs color to #000000.

### Pending
- [ ] Test: Run dev server (bun run dev), launch browser to http://localhost:5173, verify green colors and black text across site (light mode), close browser.
- [ ] Update TODO.md with completions.
