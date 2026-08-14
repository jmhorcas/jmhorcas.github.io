---
layout: default
title: Inicio
lang: es
---
# Hola, soy {{site.author}}
Soy **Profesor Titular de Universidad** en el área de **Lenguajes y Sistemas Informáticos** en la **Universidad de Málaga**. Mi investigación se centra en las **Líneas de Producto Software**, la **gestión de la variabilidad** y las **configuraciones**, y el desarrollo de **herramientas software y soluciones abiertas** para sistemas configurables de gran escala.

En esta web comparto mi trayectoria académica, mis principales contribuciones científicas, proyectos de investigación, herramientas de **ciencia abierta** y actividad docente.

> **Líneas de Producto Software · Variabilidad · Configuración · Atributos de calidad · Ciencia Abierta**

## Explora mi trabajo

{% comment %} Set language path prefix {% endcomment %}
{% assign current_lang = page.lang | default: site.lang %}
{% if current_lang == "es" %}
  {% assign lang_prefix = "/es" %}
{% else %}
  {% assign lang_prefix = "" %}
{% endif %}

{% comment %} Build target URLs {% endcomment %}
{% capture url_resume %}{{ lang_prefix }}/resume/{% endcapture %}
{% capture url_pubs %}{{ lang_prefix }}/publications/{% endcapture %}
{% capture url_awards %}{{ lang_prefix }}/awards/{% endcapture %}
{% capture url_projects %}{{ lang_prefix }}/projects/{% endcapture %}
{% capture url_community %}{{ lang_prefix }}/community_service/{% endcapture %}
{% capture url_software %}{{ lang_prefix }}/software/{% endcapture %}
{% capture url_media %}{{ lang_prefix }}/media/{% endcapture %}
{% capture url_supervision %}{{ lang_prefix }}/supervision/{% endcapture %}
{% capture url_education %}{{ lang_prefix }}/education/{% endcapture %}

{% comment %} Fetch page objects from site.pages collection {% endcomment %}
{% assign p_resume = site.pages | where: "url", url_resume | first %}
{% assign p_pubs = site.pages | where: "url", url_pubs | first %}
{% assign p_awards = site.pages | where: "url", url_awards | first %}
{% assign p_projects = site.pages | where: "url", url_projects | first %}
{% assign p_community = site.pages | where: "url", url_community | first %}
{% assign p_software = site.pages | where: "url", url_software | first %}
{% assign p_media = site.pages | where: "url", url_media | first %}
{% assign p_supervision = site.pages | where: "url", url_supervision | first %}
{% assign p_education = site.pages | where: "url", url_education | first %}

| | |
| :--- | :--- |
| 📄 **[{{ p_resume.title | default: "Resume" }}]({{ site.baseurl }}{{ url_resume }})** | 📚 **[{{ p_pubs.title | default: "Publications" }}]({{ site.baseurl }}{{ url_pubs }})** |
| 🏆 **[{{ p_awards.title | default: "Awards" }}]({{ site.baseurl }}{{ url_awards }})** | 🚀 **[{{ p_projects.title | default: "Projects" }}]({{ site.baseurl }}{{ url_projects }})** |
| 🤝 **[{{ p_community.title | default: "Community Service" }}]({{ site.baseurl }}{{ url_community }})** | 💻 **[{{ p_software.title | default: "Software" }}]({{ site.baseurl }}{{ url_software }})** |
| 📢 **[{{ p_media.title | default: "Media" }}]({{ site.baseurl }}{{ url_media }})** | 👨‍🏫 **[{{ p_supervision.title | default: "Supervision" }}]({{ site.baseurl }}{{ url_supervision }})** |
| 🎓 **[{{ p_education.title | default: "Education" }}]({{ site.baseurl }}{{ url_education }})** | |

## Tesis Doctoral

📖 **[Tesis Doctoral →]({{ '/es/thesis/' | relative_url }})**