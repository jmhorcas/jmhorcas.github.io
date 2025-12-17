---
layout: default
title: Proyectos
permalink: /es/proyectos/
lang: es
---
<h1>Mis Proyectos</h1>
<ul>
  {% for p in site.projects_es %}
    <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
  {% endfor %}
</ul>