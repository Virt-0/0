---
layout: default
title: Welcome to My Blog
---

# Welcome to My Blog

This is the homepage of your blog. You can add more content here or in the `_posts` director
<h1>Welcome to My Blog</h1>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%b %d, %Y" }}
    </li>
  {% endfor %}
