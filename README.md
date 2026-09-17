<div align="center">

# Personal Portfolio Website

**DevOps Engineer Portfolio with detailed case studies and architecture diagrams**

[![Live Site](https://img.shields.io/badge/Live-sadchikovsg.ru-5fb13b?style=for-the-badge&logo=githubpages&logoColor=white)](https://sadchikovsg.ru)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![Jekyll](https://img.shields.io/badge/Built%20with-Jekyll-CC0000?style=for-the-badge&logo=jekyll&logoColor=white)](https://jekyllrb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[Download CV (PDF)](https://sadchikovsg.ru/assets/CV_Sadchikovsg_DevOps.pdf) · [LinkedIn](https://linkedin.com/in/sadchikovsg) · [Telegram](https://t.me/chill_devops)

</div>

---

## About

This repository contains the source code for my personal portfolio website, showcasing my work as a **DevOps / Platform Engineer** with 4+ years of commercial experience and a 7-year foundation in Linux/network systems administration.

### What's Inside

- **4 detailed case studies** with Mermaid architecture diagrams
- **Technology stack** with proficiency levels and real-world applications
- **One-page CV** (HTML + PDF) with defensive, defensible metrics
- **Open Graph preview** with auto-rotating cache-busting

### Featured Case Studies

1. **Migration & Platform Transformation** (Cloud A → Cloud B)
   - Zero-downtime migration of legacy infrastructure
   - Deep healthchecks, security hardening, runtime injection pattern

2. **DevSecOps Platform & IaC for EdTech**
   - Terraform + Ansible Dynamic Inventory pipeline
   - ML image optimization: 5.24 GiB → 1.23 GiB (-77%)

3. **Internal Developer Platform for Hackathon**
   - Rootless Podman with systemd drop-in troubleshooting
   - 5 teams, zero collisions, 9.1 GB → 44 MB backup optimization

4. **Reliable Backup System (Restic + Ansible)**
   - Evolution from custom S3 sync to Restic (AES-256, deduplication)
   - User-level systemd timers with XDG_RUNTIME_DIR workaround

---

## Tech Stack

| Component | Technology |
|:---|:---|
| **Static Site Generator** | Jekyll with Just the Docs theme |
| **Hosting** | GitHub Pages (custom domain: sadchikovsg.ru) |
| **Diagrams** | Mermaid.js (architecture diagrams in case studies) |
| **Local Development** | Docker + docker-compose |
| **Styling** | Custom dark theme (hacker aesthetic) |
| **OG Preview** | Auto-rotating `og:image` via `{{ site.time }}` |

---

## Local Development

### Prerequisites

- Docker & Docker Compose
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/sadchikovsg/sadchikovsg.github.io.git
cd sadchikovsg.github.io

# Build and run with Docker
docker-compose up --build

# Access the site at http://localhost:4000
```

### Manual Setup (without Docker)

```bash
# Install Ruby dependencies
bundle install

# Run Jekyll with live reload
bundle exec jekyll serve --livereload

# Access at http://localhost:4000
```

---

## Project Structure

```
.
├── _includes/          # Jekyll includes (head, footer, nav)
├── assets/             # Static assets (PDF, images, HTML)
│   ├── cv-one-page.html
│   ├── CV_Sadchikovsg_DevOps.pdf
│   └── og-banner.png
├── projects/           # Case studies
│   ├── case-1-migration.md
│   ├── case-2-iac-devsecops.md
│   ├── case-3-hackathon-platform.md
│   └── case-4-reliable-backup.md
├── _config.yml         # Jekyll configuration
├── cv.md               # Full CV (markdown)
├── index.md            # Homepage
├── stack.md            # Technology stack
├── docker-compose.yml  # Docker setup
├── Dockerfile          # Jekyll container
└── CNAME               # Custom domain (sadchikovsg.ru)
```

---

## Key Features

### Defensive Wording

All metrics in case studies and CV follow the **"Trust but Verify"** principle:
- Every metric is attributed to a specific action (not just "improved X")
- Baseline → insight → solution → result pattern
- No fabricated achievements — only defensible, real-world results

### Code as Proof

Case studies include real code snippets (anonymized) as proof of non-trivial solutions:
- `docker-entrypoint.sh` (runtime injection)
- `filter_requirements.py` (CUDA filtering)
- Systemd drop-in configs (ACL troubleshooting)
- Ansible tasks (user-level timers)

### Auto-Rotating OG Preview

The Open Graph image URL includes a timestamp that changes with every commit:

```html
<meta property="og:image" content="https://sadchikovsg.ru/assets/og-banner.png?v={{ site.time | date: '%Y%m%d%H%M%S' }}">
```

This ensures Telegram, LinkedIn, and Twitter always fetch the latest preview without manual cache busting.

---

## Contact

- **Portfolio:** [sadchikovsg.ru](https://sadchikovsg.ru)
- **Email:** [sadchikovsg@gmail.com](mailto:sadchikovsg@gmail.com)
- **Telegram:** [@chill_devops](https://t.me/chill_devops)
- **LinkedIn:** [linkedin.com/in/sadchikovsg](https://linkedin.com/in/sadchikovsg)

---

<div align="center">

**Built with and Jekyll · Hosted on GitHub Pages**

![Last updated](https://img.shields.io/github/last-commit/sadchikovsg/sadchikovsg.github.io?style=flat-square&label=Last%20updated)

</div>


---

## 📄 License

This portfolio and its content (case studies, diagrams, documentation) are licensed under the [Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

**You are free to:**
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

**Under the following terms:**
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

For the full legal text, see [LICENSE.txt](LICENSE.txt).

---

<div align="center">
  <a href="https://creativecommons.org/licenses/by-sa/4.0/">
    <img src="https://licensebuttons.net/l/by-sa/4.0/88x31.png" alt="CC BY-SA 4.0" />
  </a>
</div>
