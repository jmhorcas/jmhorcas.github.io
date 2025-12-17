---
layout: default
title: Proyectos
permalink: /es/proyectos/
lang: es
---
<h1>Mis Proyectos</h1>
<ul class="item-list">
  {% for p in site.proyectos_es %}
    <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
  {% endfor %}
</ul>