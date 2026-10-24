/* Portfolio data - written by the admin panel. */
window.SITE_DATA = {
  "categories": [
    {
      "id": "pm",
      "label": "Product Manager"
    },
    {
      "id": "design",
      "label": "Product Design"
    }
  ],
  "projects": [
    {
      "id": "logistics-platform-for-cement-and-oil-gas-plants",
      "category": "pm",
      "title": "Logistics platform for cement and oil & gas plants",
      "tags": [
        "B2B SaaS",
        "Web + Mobile"
      ],
      "summary": "Owned for 2+ years. Replaced spreadsheet and email processes with one workflow across web and mobile.",
      "stat": "40% faster · 80% automated",
      "link": "",
      "video": "",
      "art": "a1",
      "html": "<h2>The problem</h2><p>Plants ran procurement on spreadsheets and email, so orders, vendors and invoices lived in different places.</p><h2>What I did</h2><p>Led one workflow across web and mobile, aligning procurement, operations, engineering and compliance, validated with scenario-based usability tests and a parallel pilot.</p><h2>Results</h2><ul><li>40% faster business workflow</li><li>80% of the workflow automated</li><li>30% lower cost variance, zero dispute escalations</li></ul>"
    },
    {
      "id": "prompt-based-workflow-chatbot",
      "category": "pm",
      "title": "Prompt-based workflow chatbot",
      "tags": [
        "AI",
        "n8n · RAG"
      ],
      "summary": "Users track vehicles and run plant workflows in plain language. RAG keeps answers current without retraining.",
      "stat": "60% less research effort",
      "link": "",
      "video": "",
      "art": "a2",
      "html": ""
    }
  ],
  "posts": [
    {
      "id": "from-spreadsheets-to-80-automated-replacing-a-logi",
      "category": "product",
      "label": "Product",
      "title": "From spreadsheets to 80% automated: replacing a logistics workflow",
      "date": "Sep 2026",
      "read": "7 min read",
      "summary": "What it took to move cement and oil &amp; gas plants off email and Excel.",
      "html": "<p class=\"lede\">Spreadsheets and email threads were the real product. Replacing them meant understanding who touched every order, not just drawing new screens.</p>\n<h2>Start with the people in the chain</h2>\n<p>Procurement, operations, engineering and compliance each held part of the process. I mapped it with all four before writing a single requirement, so the workflow matched how plants actually run.</p>\n<h2>Prove it before replacing it</h2>\n<p>We validated with scenario-based usability tests and ran a parallel pilot next to the old process. Nobody was forced to trust the new system on faith.</p>\n<h2>Measure what changed</h2>\n<p>The result was a 40% faster workflow, 70% participation across web and mobile, 30% lower cost variance, 80% automation and zero dispute escalations.</p>\n<div class=\"key\"><b>Key takeaways</b><ul><li>Map the whole chain, not one team</li><li>Run a parallel pilot before cutting over</li><li>Pick metrics that finance and operations both care about</li></ul></div>"
    },
    {
      "id": "why-i-chose-rag-over-fine-tuning-for-our-workflow-",
      "category": "product",
      "label": "Product · AI",
      "title": "Why I chose RAG over fine-tuning for our workflow chatbot",
      "date": "Aug 2026",
      "read": "6 min read",
      "summary": "Keeping answers current without retraining a model.",
      "html": "<p class=\"lede\">Our users wanted to ask for vehicle tracking and plant workflows in plain language. The data changes every hour, so the answer had to stay fresh.</p>\n<h2>Why RAG</h2>\n<p>Fine-tuning bakes knowledge into the model, so every data change means retraining. With retrieval-augmented generation the chatbot reads live data through REST APIs, so answers stay current.</p>\n<h2>How we built it</h2>\n<p>The pipeline runs on n8n. Documents are split into 550-character chunks with a 50-character overlap, so ideas that cross a boundary are not lost.</p>\n<h2>How we judged quality</h2>\n<p>I defined evaluation criteria for response quality, hallucination rate and citation accuracy, with human review for decision-critical outputs. It cut research effort by 60%.</p>\n<div class=\"key\"><b>Key takeaways</b><ul><li>Choose RAG when your data changes often</li><li>Chunk size and overlap are product decisions</li><li>Define hallucination and citation checks before launch</li></ul></div>"
    },
    {
      "id": "rice-prioritization-when-every-stakeholder-says-it",
      "category": "product",
      "label": "Product",
      "title": "RICE prioritization when every stakeholder says it is urgent",
      "date": "Jun 2026",
      "read": "5 min read",
      "summary": "A simple way to say no without losing the room.",
      "html": "<p class=\"lede\">In enterprise software every request arrives marked urgent. A shared scoring model turns arguments into a conversation about evidence.</p>\n<h2>Score it together</h2>\n<p>Reach, Impact, Confidence and Effort give everyone the same language. Stakeholders can challenge a number, which is far better than challenging a person.</p>\n<h2>Let data raise confidence</h2>\n<p>I used SQL to track funnel drop-off, timing and feature adoption. Real usage moved confidence scores more than opinions did.</p>\n<h2>Say no with a path</h2>\n<p>A low score is not a rejection. It becomes a documented reason and a clear condition for revisiting the idea.</p>\n<div class=\"key\"><b>Key takeaways</b><ul><li>Use one scoring model for every request</li><li>Treat Confidence as the most honest column</li><li>Give every no a revisit condition</li></ul></div>"
    },
    {
      "id": "from-ui-ux-designer-to-product-manager-what-change",
      "category": "career",
      "label": "Career",
      "title": "From UI/UX designer to product manager: what changed",
      "date": "Apr 2026",
      "read": "6 min read",
      "summary": "Lessons from moving from making screens to owning outcomes.",
      "html": "<p class=\"lede\">I started in UI/UX, moved through design roles, and now own a SaaS product as a product manager. The craft carried over; the questions changed.</p>\n<h2>From how it looks to why it exists</h2>\n<p>Design asks whether a flow is clear. Product also asks whether it should exist, what it costs, and how we will know it worked.</p>\n<h2>Learn the system</h2>\n<p>Writing API specs and understanding data flows made me a better partner to engineers and removed guesswork from planning.</p>\n<h2>Keep the design habit</h2>\n<p>Prototyping and usability testing remain my fastest way to settle debates. I also mentor 2–3 junior designers, which keeps me close to the craft.</p>\n<div class=\"key\"><b>Key takeaways</b><ul><li>Design skills are a product superpower</li><li>Learn APIs and data early</li><li>Measure outcomes, not output</li></ul></div>"
    },
    {
      "id": "building-a-governed-design-system-that-10-people-a",
      "category": "design",
      "label": "Design",
      "title": "Building a governed design system that 10+ people actually use",
      "date": "Feb 2026",
      "read": "5 min read",
      "summary": "Start small, set rules, and let teams adopt it.",
      "html": "<p class=\"lede\">A design system fails when it feels like extra work. Ours worked because it removed work for designers and developers.</p>\n<h2>Govern, do not police</h2>\n<p>A governed Figma system means clear owners, simple contribution rules and a review path. That kept 10+ developers and stakeholders aligned without slowing delivery.</p>\n<h2>Build from real screens</h2>\n<p>We extracted components from shipped workflows instead of inventing a library first, so every piece had a proven use.</p>\n<h2>Make handoff boring</h2>\n<p>Component-based design with responsive, cross-browser behavior documented up front cut the back-and-forth at handoff.</p>\n<div class=\"key\"><b>Key takeaways</b><ul><li>Start from shipped screens</li><li>Assign owners and a contribution path</li><li>Optimize for easy handoff</li></ul></div>"
    }
  ],
  "custom": {
    "css": "",
    "work_extra": "",
    "about_extra": "",
    "blog_extra": ""
  },
  "site": {
    "about_heading": "Hi, I'm Amit Kumar. I turn messy workflows into products people actually use.",
    "about_text": "Product professional with 6+ years across UI/UX, product design and enterprise automation, including 2+ years owning a B2B SaaS application as Product Manager. I work on roadmaps, RICE prioritization, API integrations, data-driven discovery and AI/RAG solutions with measurable operational impact.",
    "email": "ak71901@gmail.com",
    "phone": "+91 7999902865",
    "linkedin": "https://linkedin.com/in/amit-kumar-5540a3223",
    "location": "Delhi, India",
    "footer": "© 2026 Amit Kumar · ak71901@gmail.com · Delhi, India",
    "jobs_html": "<div class=\"job\"><h4>Product Manager <small>(official title: Product Designer)</small></h4><span class=\"meta\">Amazin Automation India Ltd · Sep 2024 – Present</span><ul><li>Own the B2B SaaS application end-to-end: roadmap, planning and RICE prioritization, plus market assessment through TAM analysis, competitor benchmarking, ROI modeling and customer validation.</li><li>Led the business workflow across web and mobile, replacing spreadsheet and email processes; aligned procurement, operations, engineering and compliance.</li><li>Results: 40% faster workflow, 70% participation, 30% lower cost variance, zero dispute escalations, 80% automated.</li><li>Designed API specs and integrations for orders, vendors, invoices and other entities; used SQL to track funnel drop-off, timing and feature adoption.</li><li>Built a governed Figma design system across 10+ developers and stakeholders; mentor 2–3 junior designers on quality and AI-assisted workflows.</li></ul></div><div class=\"job\"><h4>AI Assistant for the SaaS app</h4><span class=\"meta\">n8n · RAG · LLM · REST APIs</span><ul><li>Chatbot lets users complete daily tasks, such as vehicle tracking and plant workflows, through natural-language prompts.</li><li>Pipeline on n8n with RAG (550-character chunks, 50 overlap) connected to live REST APIs.</li><li>Defined evaluation for response quality, hallucination rate and citation accuracy, with human review for decision-critical outputs.</li></ul></div><div class=\"job\"><h4>UI/UX Developer</h4><span class=\"meta\">People Tech Group · Apr 2023 – Mar 2024</span><ul><li>Designed web and mobile workflows from user flows to high-fidelity prototypes; worked with stakeholders to cut rework by 25%.</li></ul></div><div class=\"job\"><h4>UI/UX Developer</h4><span class=\"meta\">Zeemo Pvt Ltd · Aug 2022 – Mar 2023</span><ul><li>Owned design-to-development handoffs for customer-facing apps: responsive, cross-browser, component-based.</li></ul></div><div class=\"job\"><h4>Early Career</h4><span class=\"meta\">Netlink Software · Teleperformance · Quess Corp · 2019 – 2022</span><ul><li>UI/UX Design Intern, Customer Support Executive, Giga Fiber Engineer.</li></ul></div>",
    "skills_html": "<h4 class=\"sk\">Product Management</h4><div><span class=\"tag\">PRDs</span><span class=\"tag\">User Stories</span><span class=\"tag\">Acceptance Criteria</span><span class=\"tag\">Technical Specs</span><span class=\"tag\">API Integrations</span><span class=\"tag\">System Workflows</span><span class=\"tag\">Roadmaps</span><span class=\"tag\">MVP Definition</span><span class=\"tag\">Feature Prioritization</span><span class=\"tag\">Product Lifecycle</span><span class=\"tag\">Product-Market Fit</span></div><h4 class=\"sk\">Technical &amp; Data</h4><div><span class=\"tag\">SQL</span><span class=\"tag\">Mixpanel</span><span class=\"tag\">Amplitude</span><span class=\"tag\">Google Analytics</span><span class=\"tag\">REST APIs</span><span class=\"tag\">Data Flows</span><span class=\"tag\">RAG/LLM Apps</span><span class=\"tag\">n8n</span><span class=\"tag\">Funnel Analysis</span><span class=\"tag\">Feature Adoption</span><span class=\"tag\">Retention</span><span class=\"tag\">Product KPIs</span></div><h4 class=\"sk\">Execution</h4><div><span class=\"tag\">Agile/Scrum</span><span class=\"tag\">Backlog Management</span><span class=\"tag\">QA</span><span class=\"tag\">Release Coordination</span><span class=\"tag\">Stakeholder Management</span></div><h4 class=\"sk\">Design</h4><div><span class=\"tag\">User Research</span><span class=\"tag\">UX Strategy</span><span class=\"tag\">Prototyping</span><span class=\"tag\">Usability Testing</span><span class=\"tag\">Figma</span><span class=\"tag\">XD</span></div>",
    "education_html": "<div class=\"tl\"><div><b>Product Management Fellowship</b><span>Nextleap Fellowship Program · 2026</span></div><div><b>B.E., Electronics and Communication</b><span>RGPV, Bhopal · 2015 – 2019</span></div></div>"
  },
  "stats": [
    {
      "v": "40%",
      "l": "faster business workflow"
    },
    {
      "v": "80%",
      "l": "of the workflow automated"
    },
    {
      "v": "70%+",
      "l": "adoption within 90 days"
    },
    {
      "v": "30%",
      "l": "lower cost variance"
    },
    {
      "v": "60%",
      "l": "less research effort with AI"
    },
    {
      "v": "0",
      "l": "dispute escalations"
    }
  ],
  "updated": 1792828431822
};
