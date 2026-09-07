---
title: "Fewer Entry-Level Jobs, More Work for Experienced Workers"
short_title: "Who does the work when entry-level jobs disappear?"
deck: "Chinese job ads reveal shrinking entry routes and broader task bundles for experienced workers in the age of AI."
summary: "An English adaptation of Qin Chen's essay on AI and China's labor market: exposed occupations are contracting, their tasks persist, and experienced workers face broader responsibilities."
date: "2026-08-30T11:21:37+08:00"
lastmod: "2026-09-07T00:00:00+08:00"
publishDate: "2026-09-07T00:00:00+08:00"
draft: false
featured: true
authors:
  - Qin Chen
tags:
  - Labor Market
  - Artificial Intelligence
categories:
  - Data Insights
projects: []
preview_stat:
  kicker: AI & the division of labor
  value: "740M"
  label: job ads in the original essay
  note: China · August 2026
preview_image: images/007.png
preview_alt: "Comparison of AI exposure and changes in demand measured by occupations and tasks"
image:
  caption: ""
  preview_only: true
---

*An English adaptation of [Qin Chen’s August 30, 2026 essay for 城市数据团 (City Data Group)](https://mp.weixin.qq.com/s/iL3lbLcqlOdEl1xcWQCiOA), based on the team’s joint research. Original figures are accompanied by English captions.*

For more than three years, the debate about large language models has revolved around what they *might* do to work. Will they create opportunities or eliminate jobs? Will they amplify expertise or make specialist skills available to everyone? Will younger workers benefit, or will experience become more valuable?

We can now ask a more concrete question: **what changes are already visible in employers' demand for workers?**

The analysis draws on roughly **740 million Chinese job advertisements**, with coverage described in the original essay as extending through August 2026. Its central observation is that occupational titles and the tasks beneath them tell different stories. Demand for some highly AI-exposed occupations has fallen, yet much of the work associated with those occupations continues to appear elsewhere.

That distinction matters most at the entrance to a career. Employers may recruit fewer people into narrowly defined junior roles while asking experienced workers to take on a wider combination of tasks.

**Reading the evidence.** These are observations of online recruitment demand, not a count of layoffs or a panel following individual workers. Experience requirements and advertised pay are not direct measures of workers' ages. Several charts measure shares of recruitment demand: a falling share is not necessarily a fall in the absolute number of postings. The accompanying [working paper](https://arxiv.org/html/2608.26924v1#S5.SS2) describes its exposure–demand relationships as descriptive rather than causal. We therefore use “associated with” where a chart alone cannot establish that AI caused a change.

## 1. The occupations AI can accelerate are losing demand

What does it mean for a job to be exposed to a language model?

Consider a role combining three tasks: writing code, planning a product, and communicating with clients. Suppose a model could increase the speed of those tasks by 100%, 60%, and 20%, respectively. Giving the three tasks equal weight would produce an illustrative average speed-up of 60%.

The intuition is to look inside the job description. Different tasks offer different scope for assistance, and their combination determines how exposed a role is. This example explains the idea; it is not a claim that every exposure score is a measured productivity gain or a prediction of job loss.

The analysis uses language models to identify and score the requirements and tasks described in recruitment ads, then aggregates those measures to compare occupations.

{{< figure src="images/001.png" caption="Figure 1. AI exposure varies across occupations. The original ranking contrasts highly exposed digital and technical work with less-exposed manual and service roles. Higher scores indicate greater scope for language-model assistance or absorption, not observed replacement rates." >}}

When baseline exposure is plotted against subsequent growth in occupational demand, the fitted relationship slopes downward. Occupations whose work is more amenable to language-model assistance tend to have weaker growth in advertised demand.

{{< figure src="images/002.png" caption="Figure 2. Baseline occupational AI exposure and subsequent demand growth. The horizontal axis is average exposure in 2023 Q4; the vertical axis is the log change in the occupation's share of demand through the 2026 comparison period used in the original figure. The downward-sloping line summarizes an association across occupations." >}}

There is substantial variation around that line. Exposure does not determine the fate of every occupation. But the average pattern is difficult to see if we discuss AI only in terms of what a model can do in a demonstration.

## 2. Entry routes face more pressure than well-paid roles

The same exposure measure is associated with very different demand patterns at different pay levels.

Among lower-paid positions, more exposed occupations tend to lose demand faster. Among higher-paid positions, the relationship can turn positive. A technology that makes an experienced worker more productive may simultaneously reduce the demand for a junior worker previously hired to perform part of that worker's workflow.

{{< figure src="images/003.png" caption="Figure 3. Contrasting demand gradients by advertised pay. The left panel covers jobs paying at most RMB 8,000 per month; the right covers jobs paying at least RMB 12,000. The exposure–demand slope is negative in the lower-paid group and positive in the higher-paid group." >}}

The analysis then compares the relationship across education, experience, and wage categories. After accounting for experience and pay, the differences across education groups are relatively small. The gradients across experience and wages are more pronounced.

The high-experience group still has a negative slope, but a much smaller one. For pay bands above roughly RMB 12,000 a month, the slope becomes positive. “More resilient” is therefore a better description than “immune”: the results do not imply that every experienced worker benefits.

{{< figure src="images/004.png" caption="Figure 4. Exposure–demand gradients by education, required experience, and advertised monthly pay. More negative values indicate a stronger negative association. The experience and wage panels show larger differences than the education panel." >}}

The concern for young workers is about the jobs through which they usually enter the labor market. If those entry routes narrow, becoming an experienced worker may itself become harder.

## 3. The job can disappear while the task survives

A fall in demand for an occupation does not necessarily mean that its work is no longer needed.

The first sign is that more exposed occupations are becoming less narrowly specialized in their task composition. A role once centered on writing code may now also involve product design, testing, and client communication. The job title can remain familiar even as the bundle of responsibilities expands.

{{< figure src="images/005.png" caption="Figure 5. Within-occupation task diversity. The positive relationship indicates that more AI-exposed occupations tend to show greater diversification of the tasks mentioned in their job ads." >}}

The second sign appears when we follow a task across occupations. Programming, for example, need not remain confined to programmers. It can appear in ads for analysts, product managers, or human-resources roles.

{{< figure src="images/006.png" caption="Figure 6. Tasks spreading across occupational boundaries. More exposed tasks tend to become less concentrated in a small set of occupations. The unit being followed here is the task, rather than the occupational title." >}}

These are two different movements: a job draws in more kinds of work, while a particular kind of work spreads across more jobs.

Comparing demand at the occupational and task levels brings the distinction into focus. Highly exposed occupations contract more sharply than the task content they carry. Some of that content persists in other roles.

{{< figure src="images/007.png" caption="Figure 7. Occupations contract more sharply than the tasks they contain. The red fit summarizes the occupational relationship; the blue fit summarizes the task relationship. Their different slopes illustrate why counting titles and counting task mentions produce different pictures of labor demand." >}}

The comparison is not a one-for-one accounting of displaced workers. Task mentions and job postings have different denominators. Its value is to show that the disappearance of a familiar job title can conceal the continued demand for its underlying work.

## 4. Experienced workers inherit broader responsibilities

Once tasks cross occupational boundaries, combinations that were previously unusual can become common. Work that once sat in two separate job descriptions can appear in a single role.

The emerging combinations include technical activities alongside administrative, coordination, and documentation responsibilities. A posting that asks for both programming and administration raises an obvious question: are programmers becoming administrators, are administrators beginning to program, or are both changes occurring?

{{< figure src="images/008.png" caption="Figure 8. Fast-emerging task combinations in the original analysis. The chart ranks combinations appearing together in job ads; a rapidly growing combination need not represent an entirely new task or occupation." >}}

The new combinations have a distinctive profile. Compared with established combinations, they score lower on direct language-model exposure but higher on on-site dependence, embodied manual skill, the consequences of mistakes, and routine codifiability.

{{< figure src="images/009.png" caption="Figure 9. Characteristics of emerging task bundles. The comparison covers on-site dependence, embodied skill, error consequences, routine codifiability, cognitive complexity, human complementarity, creative originality, mobility, LLM exposure, and public interaction. The pattern combines more physical presence and operational responsibility with lower direct LLM exposure." >}}

In plain English, more of these combinations involve **standardized work that someone must perform in a real physical setting, where mistakes can be costly**. Being codifiable as a procedure does not mean that a language model can execute the procedure in the world.

This changes the meaning of a broader job. The worker may gain an AI assistant for digital tasks while acquiring responsibilities that require presence, judgment, or accountability.

The analysis finds stronger emergence of these combinations in postings requiring more education and experience, offering middle-to-higher pay, and coming from medium-sized firms. It also reports differences across local labor markets, including thinner markets and places more exposed to industrial shocks.

{{< figure src="images/010.png" caption="Figure 10. Where emerging task bundles are concentrated. The panels compare industries, education requirements, experience requirements, wages, firm sizes, and local labor-market characteristics. They describe the distribution of advertised roles, not the outcomes of individual workers." >}}

Two other changes are consistent with a flatter staffing structure. Within the listed-company sample shown in the original essay, the share of postings for managerial roles falls from 25.6% in 2023 to 19.2% in 2026. The share of postings explicitly requiring team leadership or personnel management falls from 9.9% to 6.9%. The chart compares January–July observations in each year.

{{< figure src="images/011.png" caption="Figure 11. Two measures of management demand decline in the listed-company sample: the share of managerial job titles and the share of ads requiring team or personnel management. A falling share is a compositional change in recruitment; it does not directly measure how many management layers an employer removed." >}}

The essay's interpretation is that organizations are recruiting fewer junior workers while experienced employees use models to absorb some of the work those juniors would have done. The data patterns are consistent with that mechanism, although they do not directly observe the handover inside a firm.

{{< figure src="images/012.png" caption="Figure 12. The proposed mechanism, shown schematically: routine entry tasks are partly absorbed by language models and partly bundled into experienced workers' roles. This is an interpretation of the preceding patterns, not a separately estimated causal result." >}}

More demand for experienced workers is therefore not automatically good news for them. They may be expected to cover more functions and bear more responsibility for the result. Greater productivity and a heavier workload can arrive together.

## 5. From the pin factory to Robinson Crusoe

These changes raise a longer-standing question about the division of labor.

Adam Smith's pin factory illustrates the familiar logic. A person working alone, without training or machinery, can make very few pins. Divide production into specialized operations and coordinate a group of workers, and output per person rises dramatically. Smith's example describes ten workers producing more than 48,000 pins a day through this division and combination of work.

Specialization makes cooperation productive because each person does not need to learn every skill. One worker's expertise complements another's. Over time, jobs can become narrower, procedures more standardized, and organizations larger.

Chaplin's *Modern Times* supplies the other image: a worker whose world has shrunk to a nut and a wrench. Narrow specialization also creates a need for coordination. Someone must hold the broader picture, connect the stages, and take responsibility for the whole process.

Language models may alter that balance. If one person can move more easily between coding, writing, analysis, and routine administration, some of the benefits of splitting those activities among separate specialists become smaller. Meanwhile, handing work between people still requires communication, shared context, and accountability.

{{< figure src="images/013.png" caption="Figure 13. A conceptual account of specialization and coordination costs. The original essay proposes that cheaper learning and task switching could favor broader roles. This diagram is a theoretical illustration, not an estimated historical series or evidence that switching costs have fallen to zero." >}}

The claim is not that expertise has become unnecessary. It is that the efficient boundary between one person's work and another's may move.

That leads to the essay's second literary image: Robinson Crusoe. On his island, Crusoe builds shelter, grows food, and performs the many activities needed to survive. He embodies breadth rather than the extreme specialization of the factory worker.

An AI-assisted individual who can carry an entire digital workflow from beginning to end resembles that figure. Some people may need fewer colleagues to complete a project, and some small businesses may need fewer specialized roles.

{{< figure src="images/014.png" caption="Figure 14. Two metaphors for organizing work: a connected society of specialists and an archipelago of more self-sufficient producers. The contrast frames the essay's question about social interdependence; it is not a forecast that collaboration will disappear." >}}

The social question is harder than the productivity question. Work does more than allocate tasks. It connects people through repeated cooperation, learning, and mutual dependence. If some forms of production require fewer of those connections, what will replace them?

## 6. Greater independence still rests on shared infrastructure

There are good reasons not to turn this argument into a prediction that the organization will disappear.

Language models are most immediately useful in digitally mediated work. Physical operations remain different. Only some firms reorganize substantially around the technology, and a one-person company still needs customers willing to pay for what it produces.

Even the seemingly self-sufficient digital worker depends on electricity, networks, chips, data centers, and a reliable supply of computing power. Producing that infrastructure requires extensive specialization and large organizations.

The original essay describes the arrival of DeepSeek-R1 in 2025 and the expansion of agentic tools in 2026 as important moments in China's workplace use of language models. But neither a technological release nor a compelling individual example establishes economy-wide adoption or impact.

It also reports a **5.2% reduction in 2026 recruitment demand attributed to model use** and **18.6% of positions with task combinations different from three years earlier**. Those are claims in the original essay, rather than estimates independently reproduced for this translation. The essay does not provide enough detail to establish their counterfactual and classification threshold here, so they should not be read as a measured economy-wide loss of employment or a causal estimate established by the charts above.

The most persuasive insight is the distinction that can be seen throughout the evidence: **the work can outlive the job that once contained it**.

For a young applicant, that can mean fewer places to begin. For an experienced worker, it can mean a larger bundle of duties. For an employer, it raises a choice about whether productivity gains will support learning and new opportunities, or simply reduce hiring and concentrate responsibility.

AI can expand an individual's capabilities while making that individual more dependent on shared technological infrastructure. The first generation of these digital “Crusoes” will still live in a society built on the work of others.

## Sources and editorial notes

- **Original article:** Qin Chen (chenqin), [不再被需要的年轻人，和替他们干活的中登](https://mp.weixin.qq.com/s/iL3lbLcqlOdEl1xcWQCiOA), 城市数据团, August 30, 2026. All 14 figures above are reproduced from the supplied article; their Chinese labels and numerical values are unchanged. English captions were added for this edition.
- **Research:** Qin Chen, Ying Fang, Xiangyu Wang, and Leo Yang, [The Pulse Beneath the Job Title: Monthly Readings of Requirements and Tasks from 750 Million Chinese Job Ads](/publication/job_ads_pulse/). [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7358820) · [arXiv](https://arxiv.org/abs/2608.26924).
- **Data versions:** The original essay describes roughly 740 million ads through August 2026. The August 27 arXiv version reports 752.6 million ads from January 2022 through June 2026 and uses analysis-specific windows and platform samples. Those descriptions are not interchangeable; this adaptation retains the essay's figures rather than silently substituting the paper's sample or coefficients.
- **Acknowledgment:** The original credits Leo Yang of Hong Kong Baptist University for the data and Professor Yan Shen of Peking University for the *Modern Times* and *Robinson Crusoe* metaphors.
- **Translation choices:** The colloquial title contrasts young people with established mid-career workers. Here, the contrast is expressed through entry-level jobs and experienced workers; it should not be mistaken for a direct estimate by age. The long passage from Adam Smith is condensed, and speculative claims about the end of specialization are presented as arguments rather than established outcomes.
