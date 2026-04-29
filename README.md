# Studio Showcase (GitHub Pages)

这是一个轻量静态网站项目，用于展示网站设计业务与模板案例，风格偏科技感，可直接部署到 GitHub Pages。

## 本地目录

```text
studio-showcase/
├─ index.html
├─ assets/
│  ├─ css/styles.css
│  ├─ js/main.js
│  └─ images/templates/
```

## 你需要改的内容

1. 在 `index.html` 修改公司介绍和联系方式。  
2. 把模板图片放到 `assets/images/templates/`。  
3. 在 `index.html` 的 `#templates` 区域修改每个卡片的图片路径、标题、说明和分类。  

## 本地预览

在项目根目录直接双击 `index.html` 即可预览，或使用任意静态服务器。

## 发布到 GitHub Pages

1. 在 GitHub 创建新仓库（例如：`studio-showcase`）。  
2. 本地执行：

```bash
git init
git add .
git commit -m "Initial studio showcase website"
git branch -M main
git remote add origin https://github.com/<你的用户名>/studio-showcase.git
git push -u origin main
```

3. 进入 GitHub 仓库设置：
   - `Settings` -> `Pages`
   - `Source` 选择 `Deploy from a branch`
   - 分支选择 `main`，目录选择 `/ (root)`，保存

4. 几分钟后通过 GitHub Pages 地址访问网站。
