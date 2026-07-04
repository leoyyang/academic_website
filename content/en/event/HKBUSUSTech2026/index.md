---
title: Interpretable Discriminative Text Representations via Agreement and Label Disentanglement
event: HKBU-SUSTech Joint Summer Workshop on Information Systems 2026
event_url: https://www.paperfox.ai/conference/hkbusustech2026

location: Hong Kong Baptist University
address:
  street: 224 Waterloo Road
  city: Kowloon Tong
  region: Kowloon
  postcode: ""
  country: Hong Kong

summary: Invited talk at the HKBU-SUSTech Joint Summer Workshop on our LLM-assisted method for building interpretable, auditable text representations.
abstract: >-
  This talk introduces an operational criterion for interpretable discriminative text
  representations — conceptual clarity, measured by chance-adjusted agreement between
  independent annotators applying a feature definition, and label disentanglement, meaning a
  feature should not merely paraphrase the prediction target. We instantiate the criterion in
  LLM-assisted Feature Discovery (LFD), an iterative method that proposes lexical and semantic
  features from contrastive, outcome-opposed text pairs, screens candidates with cross-LLM
  agreement, and selects features by held-out predictive gain. Across ten text-classification
  tasks spanning seven corpora, LFD matches a strong text-bottleneck baseline while producing
  substantially clearer and less label-entangled features, corroborated by human audits with
  232 raters — pointing toward a practical auditability standard for AI-driven text analysis in
  business research.

date: "2026-07-13T00:00:00+08:00"
date_end: "2026-07-14T23:59:59+08:00"
all_day: true

publishDate: "2026-07-04T00:00:00+08:00"

authors:
  - Leo Y. Yang
tags:
  - workshop
  - GenAI
  - interpretability

featured: false

image:
  caption: "HKBU-SUSTech Joint Summer Workshop on Information Systems 2026"
  focal_point: Center

links: []
url_code: ""
url_pdf: ""
url_slides: ""
url_video: ""

slides: ""
projects: []
---

Invited to the **HKBU-SUSTech Joint Summer Workshop on Information Systems 2026** (theme:
*Future Forward: AI-Driven Business Research*), hosted at Hong Kong Baptist University, I will
present our accepted paper on interpretable, auditable text representations — joint work with
Tong Wang and Yiqing Xu.

## Talk overview

- **The problem.** Interpretable text features should expose coordinates that are not only
  predictive but meaningful enough for independent auditors to reapply. Existing methods either
  use anonymous embedding directions or attach names to features without guaranteeing those
  definitions are reproducible or distinct from the label being predicted.
- **The criterion.** We formalize interpretability as two testable properties: *conceptual
  clarity* (chance-adjusted agreement between independent annotators) and *label
  disentanglement* (a feature must add signal beyond paraphrasing the target).
- **The method.** LLM-assisted Feature Discovery (LFD) proposes candidate features from
  contrastive text pairs, screens them with cross-LLM agreement, and keeps only those with
  residual held-out predictive gain.
- **Evidence.** Across ten tasks and seven corpora, LFD matches a strong bottleneck baseline
  while yielding clearer, less label-leaking features, validated by human audits with 232 raters.

The session closes with a discussion of how agreement-tested, label-disentangled representations
can serve as an auditability standard for AI-driven measurement in information-systems and
business research.
