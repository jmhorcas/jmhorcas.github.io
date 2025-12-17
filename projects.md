---
layout: default
title: Projects
permalink: /projects/
lang: en
---
<h1>My Projects</h1>
<ul>
  {% for p in site.projects %}
    <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
  {% endfor %}
</ul>