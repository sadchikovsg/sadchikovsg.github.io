---
redirect_from: /projects.html
title: Кейсы и проекты
layout: page
nav_order: 3
has_children: true
has_toc: false
---

# Кейсы и проекты

Здесь представлены обезличенные описания реальных производственных задач с архитектурными схемами (Mermaid) и метриками результатов.

<div class="mobile-toc">
  <h2 class="text-delta">Содержание</h2>
  <ul>
    {%- assign cases = site.pages | where_exp: "p", "p.parent == 'Кейсы и проекты'" | sort: "nav_order" -%}
    {%- for c in cases -%}
      <li><a href="{{ c.url | relative_url }}">{{ c.title }}</a></li>
    {%- endfor -%}
  </ul>
</div>
