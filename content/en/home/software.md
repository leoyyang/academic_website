---
# Software & Data widget.
widget: software-data

# This file represents a page section.
headless: true

# Order that this section appears on the page.
weight: 82

title: Software & Data
subtitle: "Open tools and datasets I build for large-scale, AI-assisted research on China"

# Activate this widget? true/false
active: true

# The tools/datasets shown as cards.
tools:
  - name: ReproAI
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
    tagline: Full-text data · China
    desc: "The China Modern Gazetteer Full-Text Database: 3,000+ county gazetteers compiled since 1949, with full-text search, digitised and verified tables, and AI-powered meta-research to generate structured data at scale."
    links:
      - name: Website
        url: "https://cngazetteer.com/"
        icon_pack: fas
        icon: globe

  - name: Chinese Job Market Tracker
    tagline: Live dashboard · Labor market
    desc: "A self-built dashboard tracking daily job postings across the major Chinese recruitment platforms — a real-time view of labor-market dynamics for research."
    links:
      - name: Open tracker
        url: "/job-tracker/"
        icon_pack: fas
        icon: chart-line
---
