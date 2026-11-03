# Pushed and Pulled: Steering AI Crisis Advice

Research companion — preliminary descriptive analysis, November 2026.

## Design

Nine military AI-enabled decision support systems, four briefing variants, four intervention types and ten repeats per cell: 1,440 planned trials. Each trial saves an initial recommendation and three independent branches (neutral, escalate, restrain) with up to three follow-up replies. Severity is researcher-assigned ordinal menu coding, hidden from military AI-enabled decision support systems. All available branches and all three turns are retained. Primary planned comparisons are turns 1 and 3.

## Collection and missingness

1,438 trials completed; two initial responses remain invalid under the original parser. Twenty-eight API-error trials and eight interrupted Qwen initial responses were retried with original records retained. A retry starts a new complete trajectory; it does not splice responses from multiple attempts. Mistral was omitted for repeated upstream availability failures, not behavioral refusal.

Judges see each saved branch separately. There are 4,177 available branches. Latest military AI-enabled decision support system attempts define trajectories. For judge analysis, use the last format-valid evaluation per branch, exclude unresolved formats, and preserve all attempts. Agreement is based only on paired valid evaluations, matched by branch and turn. Kappa is undefined when expected agreement is one. No unresolved observation is imputed as zero severity change.

## Interpretation

Mean severity differences are descriptive summaries of ordinal categories, not measures of physical harm. This export pools scenario variants and repeats with available-case denominators; branch populations differ at severity boundaries. It does not estimate a causal country-of-origin effect or claim statistical significance. Judge distributions can use different valid denominators; paired agreement uses common records only. Reliability does not establish validity.

Intelligence-only branches name no preferred action. A hidden-target match is not expressed-preference adoption. Intelligence claims are unverified assertions made by the operator, not established facts about the scenario.

## Remaining review

Inspect residual judge validation failures and any concentration by model/condition. Audit the semantic appropriateness of labels, including evidence-only adoption classifications. Report disagreements and missingness transparently. A related Qwen model and Gemini Argon appear as military AI-enabled decision support systems, so family/self-judging bias is possible. Statistical analyses are exploratory, not preregistered.

## Sources

Tennant et al. (2026), Normative Robustness as a Frontier for Non-Verifiable Reasoning in LLMs. https://arxiv.org/abs/2606.12731

Lamparth et al. (2024), Human vs. Machine: Behavioral Differences Between Expert Humans and Language Models in Wargame Simulations. https://arxiv.org/abs/2403.03407

Rivera et al. (2024), Escalation Risks from Language Models in Military and Diplomatic Decision-Making. https://arxiv.org/abs/2401.03408
