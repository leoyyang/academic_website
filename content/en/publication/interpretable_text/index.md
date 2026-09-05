---
title: "Interpretable Discriminative Text Representations via Agreement and Label Disentanglement"

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here 
# and it will be replaced with their full name and linked to their profile.
authors:
- Tong Wang
- Yiqing Xu
- Leo Yang

# Author notes (optional)
author_notes:
# - "Equal contribution"
- ""

date: "2026-05-20T00:00:00Z"
doi: "10.48550/arXiv.2605.20693"

# Schedule page publish date (NOT publication's date).
publishDate: "2026-05-20T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["3"]

# Publication name and optional abbreviated publication name.
# publication: Working Paper
# publication_short: Working Paper

abstract: "Interpretable text representations should expose coordinates that are not only predictive, but also meaningful enough for independent auditors to apply. Existing discriminative representations often use anonymous embedding directions, while concept-bottleneck and LLM-assisted methods attach natural-language names to features without ensuring that those definitions are reproducible or distinct from the target label. We propose an operational criterion for interpretable discriminative text representations: each coordinate should satisfy conceptual clarity, measured by chance-adjusted agreement between independent annotators applying the feature definition, and label disentanglement, meaning the feature should not merely paraphrase the prediction target. We instantiate this criterion in LLM-assisted Feature Discovery (LFD), an iterative method that proposes lexical and semantic features from contrastive outcome-opposed text pairs, screens candidates using cross-LLM Cohen's κ, and selects features by residual held-out predictive gain. A stylized analysis connects the κ screen to a per-feature annotation-noise bound, formalizing agreement as a reliability check. Across ten text-classification tasks spanning seven corpora, LFD matches the predictive performance of a strong text bottleneck baseline while producing substantially clearer and less label-entangled features. Human audits with 232 raters show that LFD features achieve higher human--human and human--LLM agreement than baseline concepts, and raters consistently judge them as less label-leaking. These results suggest that agreement-tested, label-disentangled coordinates provide a practical auditability standard for interpretable text classification."

# Summary. An optional shortened abstract.
summary: We develop a method for discovering text features that independent readers can consistently identify and that do not simply restate the prediction target. Across ten classification tasks, agreement-tested features combine predictive performance with clearer, more auditable definitions.

tags: ["GenAI"]

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
links:
- name: "arXiv"
  url: "https://arxiv.org/abs/2605.20693"
  icon_pack: "ai"
  icon: "arxiv"

url_pdf: ''
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: ''
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
- []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---
