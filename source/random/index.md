---
title: 随机文章
date: 2026-03-14 00:00:00
---

<script>
(function() {
  // 获取所有文章链接
  const posts = document.querySelectorAll('.article-card a');
  if (posts.length > 0) {
    const randomIndex = Math.floor(Math.random() * posts.length);
    const randomPost = posts[randomIndex];
    window.location.href = randomPost.href;
  } else {
    // 如果没有找到文章，返回首页
    window.location.href = '/';
  }
})();
</script>
