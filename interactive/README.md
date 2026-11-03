# Interactive diagrams and results

## Explore locally

Download this folder (or download the repository ZIP and extract it). Open `index.html` for the saved results explorer, or `branching.html` for the experimental-design diagram. The pages use local bundled data and make no model/API calls. For a local server, run `python3 -m http.server 8765` from this folder, then open http://localhost:8765.

GitHub displays HTML source; it does not run these pages in the repository view. This repository is private and no public site has been deployed.

## Included

- `branching.html`: vary briefing, illustrative initial severity, pressure type and follow-up turn. This explains the protocol; it does not predict model behavior or show saved transcripts.
- `index.html`: inspect action outcomes, model comparisons, Qwen/Gemini classification distributions and judge agreement.
- `results.json` / `results.js`: saved aggregate study outcomes.
- `comparisons.json` / `comparisons.js`: exploratory model comparisons with conditional uncertainty intervals.
- `provenance.json`: source hashes and selection rules.
- `figures/`: supporting results figures, with original study interpretation limits.

Human validation of judge labels remains pending. Missing outcomes are excluded, not treated as no change. Conditional bootstrap uncertainty is specific to the selected models and materials. No raw conversations or credentials are included.
