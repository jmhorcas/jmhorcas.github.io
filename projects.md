---
layout: default
title: Projects
permalink: /projects/
lang: en
---

<h1>Projects</h1>

<ul class="item-list">
  {% for project in site.projects %}
    <li>
      <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
      <span>{{ project.description }}</span>
    </li>
  {% endfor %}
</ul>