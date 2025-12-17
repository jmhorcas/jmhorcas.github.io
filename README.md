# Personal Portfolio Website

A clean, minimalist, and bilingual personal website built with Jekyll and hosted on GitHub Pages. 

This site is structured to separate content from design, using Markdown for posts and Jekyll Collections for managing projects and publications independently.

---

## 🌍 Language Support
The site is primarily in English, with a full Spanish version accessible via a language toggle.
- English (Default): Accessible at the root URL.
- Spanish: Accessible under the /es/ directory.

---

## 🛠 Project Structure
To maintain a clean workflow, the project follows the standard Jekyll directory structure:

* _layouts/: Contains the default.html master template.
* _projects/ & _projects_es/: Markdown files for projects (English and Spanish).
* _publications/ & _publications_es/: Markdown files for publications (English and Spanish).
* _data/: Contains i18n.yml for UI translations (navigation, buttons).
* assets/: Custom CSS, JavaScript, and images.
* es/: Contains the main index and listing pages for the Spanish version.

---

## 🚀 Local Development

To run this site on your machine and preview changes in real-time, you need Ruby installed.

### 1. Install Jekyll and Bundler
Open your terminal and run:
gem install jekyll bundler

### 2. Install Project Dependencies
Navigate to the root of the project and run:
bundle install

### 3. Serve the Website
Start the local development server:
bundle exec jekyll serve

The site will be live at http://127.0.0.1:4000. The server will automatically watch for file changes and refresh the build.

---

## Adding New Content

### To add a new Project:
1. Create a new .md file in _projects/ (English) or _projects_es/ (Spanish).
2. Add the required Front Matter:
---
layout: default
title: "Project Name"
lang: en (or es)
---

### To add a new Publication:
1. Create a new .md file in _publications/ or _publications_es/.
2. Include metadata like journal, year, or link in the Front Matter.

---

## Deployment
This site is configured for GitHub Actions. Simply push your changes to the main branch, and GitHub will automatically build and deploy the site to your GitHub Pages URL.

---

## License
This project is open-source. Feel free to customize it for your own use.