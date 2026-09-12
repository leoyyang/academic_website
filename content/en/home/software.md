---
# Software & Data widget.
widget: research-tools

# This file represents a page section.
headless: true

# Order that this section appears on the page.
weight: 82

title: "Software & Data"
subtitle: "Research software and data resources"

# Activate this widget? true/false
active: true

# The tools/datasets shown as cards.
tools:
  - name: ReproAI
    brief: "Prepare clearer replication packages with an AI assistant."
    preview_domain: "reproai.org"
    preview_animation: reproai-detail
    preview_image: reproai-detail.png
    preview_label: Workflow preview
    access: Open source
    related: ai_reproducibility
    logo: reproai
    tagline: AI plugin · Reproducibility
    desc: "An author-facing AI plugin that helps you build a cleaner, more reproducible replication package before submission — so a journal's data editor can reproduce your results with less friction. Works with Claude Code and OpenAI Codex."
    links:
      - name: Website
        url: "https://reproai.org/"
        icon_pack: fas
        icon: globe
      - name: GitHub
        url: "https://github.com/leoyyang/reproai"
        icon_pack: fab
        icon: github

  - name: China Gazetteer
    brief: "Search 3,000+ county gazetteers and turn historical records into research data."
    preview_domain: "cngazetteer.com"
    preview_image: gazetteer-detail.png
    preview_label: Database overview
    access: Online database
    logo: gazetteer
    tagline: Full-text data · China
    desc: "The China Modern Gazetteer Full-Text Database: 3,000+ county gazetteers compiled since 1949, with full-text search, digitised and verified tables, and AI-powered meta-research to generate structured data at scale."
    links:
      - name: Website
        url: "https://cngazetteer.com/"
        icon_pack: fas
        icon: globe

  - name: Chinese Job Market Tracker
    brief: "Explore recorded job-posting trends across Chinese recruitment platforms."
    preview_domain: "leoyang.org/job-tracker"
    preview_animation: tracker-detail
    preview_image: tracker-detail.png
    preview_label: Dashboard preview
    insight: ai-entry-level-work
    access: Public dashboard · Raw data on request
    related: job_ads_pulse
    logo: tracker
    tagline: Live dashboard · Labor market
    desc: "Daily observations of job postings across major Chinese recruitment platforms. Explore trends and check the latest available data."
    links:
      - name: Open tracker
        url: "/job-tracker/"
        icon_pack: fas
        icon: chart-line
---
