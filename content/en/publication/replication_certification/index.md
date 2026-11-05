---
title: "Replication Certification at Publication: Checkable by Anyone, Anywhere, in Seconds, Forever"
authors:
  - Gary King
  - Yiqing Xu
  - Leo Y. Yang
date: "2026-11-04T00:00:00Z"
publishDate: "2026-11-04T00:00:00Z"
publication_types: ["3"]
publication: "Working paper"
featured: true
tags: ["Metascience"]
research_topics: ["GenAI"] # Existing homepage filter label: AI & research methods.
summary: "We introduce replication certificates that connect deposited data and code to a recorded computational run. Signed, timestamped records let journals and future researchers check the evidence without repeating the full analysis each time."
abstract: >-
  Authors increasingly deposit replication datasets—the data and code behind publications—in archives, and journals increasingly require them to, under progressively onerous rules. But a deposit alone proves little, so authors keep paying: months for the journal’s reanalyses, years answering readers’ questions, and rancor as failed replications become accusations because no record establishes what actually ran. We introduce a replication certificate: a cryptographically signed record of the deposited files and logged output. It replaces the journal’s reanalyses with evidence anyone can check in seconds, which no one, including the archive, can backdate, and no one can fake without risking detection. Certification asks little of anyone and benefits everyone: The author deposits, then reruns the analysis once under a random seed the archive computes from the deposit’s hash and a blockchain block; the archive signs, timestamps (in that blockchain), and stores the record—confidential data included—without rerunning anything; the journal merely checks a website for the certificate; and anyone can check or replay any step decades later.
links:
  - name: Paper
    url: "https://gking.harvard.edu/certify/"
  - name: Certify (beta)
    url: "https://certify.iq.harvard.edu/"
url_pdf: "https://gking.harvard.edu/files/replication-certification.pdf"
url_project: "https://certify.iq.harvard.edu/"
---

[Read the paper (PDF)](https://gking.harvard.edu/files/replication-certification.pdf) · [Supplementary appendix (PDF)](https://gking.harvard.edu/files/replication-certification-supp.pdf) · [BibTeX citation](cite.bib)

Certify is currently available in beta. Certification makes the deposited computational record checkable; assessing the scientific conclusions remains a separate task.
