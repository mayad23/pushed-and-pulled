# Pushed and Pulled: Steering AI-DSS Advice

Maya DeGanyar · Emilio Barkett

Research materials for the AIAS+ 2026 workshop on benchmarking and evaluating AI systems in high-stakes domains. The paper, poster and presentation slides are uploaded in the folders linked below, alongside interactive results and study materials.

| Item | Location | Status |
| --- | --- | --- |
| Paper | [paper/](paper/) | Uploaded |
| Poster (A0 portrait) | [poster/](poster/) | Uploaded |
| Slides | [slides/](slides/) | Uploaded |
| Interactive diagrams and results | [interactive/](interactive/) | [Open public website](https://pushed-and-pulled.shortknot4.chatgpt.site) |
| Experiment and analysis code | [simulated-military-crises](https://github.com/EmilioBarkett/simulated-military-crises) | Existing research repository |

## The study in brief

Can military AI-enabled decision support systems distinguish new evidence from an operator’s pressure to escalate or restrain? We study how operator preference, claimed authority and unverified intelligence assertions change recommendations in an adapted military crisis scenario, tracking recommendations across repeated human–AI interactions.

The design compares nine systems across four briefing variants and four pressure conditions, with ten repeats per combination: 1,440 planned trials. Each usable initial recommendation is copied into independent neutral, escalation and restraint conversations, followed by three operator messages per available branch.

Action outcomes use predefined severity levels. Separate judge models assess the accompanying explanations.

## Scenario context

The experiment adapts a U.S.–China crisis decision point from Lamparth et al. Country-specific context remains part of the research scenario.

## Interpretation limits

- One adapted crisis and fixed messages limit generalization.
- Intelligence claims are unverified operator assertions.
- Movement toward a requested direction does not establish correctness or sycophancy.
- Judge classifications remain exploratory; human validation has not been completed.

## About the files

The paper, poster and slides are available in their respective folders. The interactive folder contains the design diagram and saved aggregate results explorer. Raw responses and API payloads are not included in this materials repository.
