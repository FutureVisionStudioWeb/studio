const templateGrid = document.getElementById("templateGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

const templateData = [
  "template1.png",
  "template2-1.png",
  "template2-2.png",
  "template2-3.png",
  "template2-4.png",
  "template2-5.png",
  "template2-6.png",
  "template2-7.png",
  "template3-1.png",
  "template3-2.png",
  "template4-1.png",
  "template4-2.png",
  "template4-3.png",
  "template4-4.png",
  "template4-5.png",
  "template4-6.png",
  "template4-7.png",
  "template5-1.png",
  "template5-2.png",
  "template5-3.png",
  "template6-1.png",
  "template6-2.png",
  "template6-3.png",
  "template6-4.png",
  "template6-5.png",
  "template6-6.png",
  "template7-1.png",
  "template7-2.png",
  "template7-3.png",
  "template7-4.png",
  "template8-1.png",
  "template8-2.png",
  "template8-3.png",
  "template8-4.png",
  "template8-5.png",
  "template8-6.png",
  "template8-7.png",
  "template8-8.png",
  "template8-9.png",
];

const inferType = (filename) => {
  if (filename.startsWith("template1") || filename.startsWith("template2") || filename.startsWith("template3")) {
    return "brand";
  }
  if (filename.startsWith("template4") || filename.startsWith("template5")) {
    return "shop";
  }
  return "landing";
};

const templateMeta = {
  1: {
    title: "模板1 - 极简学术主页（价格150 / 加急200）",
    feature: "双栏布局、个人简介+论文模块，结构清晰，适合个人品牌展示",
  },
  2: {
    title: "模板2 - AcademicPages 导航型站点（价格200 / 加急249）",
    feature: "顶部多栏目导航（Publications/Talks/Teaching/CV/Blog），信息体系完整",
  },
  3: {
    title: "模板3 - 个人博客首页（价格150 / 加急200）",
    feature: "清晰内容分区与信息入口，适合个人博客与学习笔记展示",
  },
  4: {
    title: "模板4 - 团队门户扩展版（价格300 / 加急350）",
    feature: "Research/Blog/Team/Contact 多页联动，偏机构化展示",
  },
  5: {
    title: "模板5 - 个人作品集着陆页（价格200 / 加急249）",
    feature: "大头像首屏+作品宫格，视觉直观，适合设计/自由职业者",
  },
  6: {
    title: "模板6 - 深色技术简历站（价格200 / 加急249）",
    feature: "深色科技感风格，含 Education/Experience/Projects/Skills 全链路",
  },
  7: {
    title: "模板7 - 简历长页信息流（价格200 / 加急249）",
    feature: "单页纵向简历布局，教育/技能/经历连续阅读体验",
  },
  8: {
    title: "模板8 - 学术实验室完整版（价格200 / 加急249）",
    feature: "News/Team/Research/Publications/Teaching/Contact 完整学术站结构",
  },
};

const groupByTemplate = () => {
  const map = new Map();

  templateData.forEach((filename) => {
    const match = filename.match(/^template(\d+)(?:-(\d+))?\.png$/);
    if (!match) return;

    const templateNo = Number(match[1]);
    const pageNo = match[2] ? Number(match[2]) : 0;
    const key = `template${templateNo}`;

    if (!map.has(key)) {
      map.set(key, {
        templateNo,
        files: [],
        type: inferType(filename),
      });
    }

    map.get(key).files.push({ filename, pageNo });
  });

  return [...map.values()]
    .sort((a, b) => a.templateNo - b.templateNo)
    .map((item) => ({
      ...item,
      files: item.files.sort((a, b) => a.pageNo - b.pageNo).map((entry) => entry.filename),
    }));
};

const templateGroups = groupByTemplate();

templateGroups.forEach((group) => {
  const card = document.createElement("article");
  card.className = "template-card";
  card.dataset.type = group.type;
  card.dataset.index = "0";
  card.dataset.images = JSON.stringify(group.files);

  const initialImage = group.files[0];
  const totalPages = group.files.length;
  const meta = templateMeta[group.templateNo] || {
    title: `模板${group.templateNo} - 网站模板`,
    feature: "可定制页面结构与风格",
  };

  card.innerHTML = `
    <div class="template-viewer">
      <img src="./assets/images/templates/${initialImage}" alt="网站模板 ${group.templateNo}" />
      <button class="viewer-btn prev" type="button" aria-label="上一页">‹</button>
      <button class="viewer-btn next" type="button" aria-label="下一页">›</button>
      <span class="viewer-counter">1 / ${totalPages}</span>
    </div>
    <div class="template-info">
      <h3>${meta.title}</h3>
      <p>${meta.feature}</p>
      <p>共 ${totalPages} 张页面图（点击图片可放大预览）</p>
    </div>
  `;

  templateGrid.appendChild(card);
});

const cards = document.querySelectorAll(".template-card");

const switchImage = (card, step) => {
  const images = JSON.parse(card.dataset.images);
  const total = images.length;
  let currentIndex = Number(card.dataset.index);
  currentIndex = (currentIndex + step + total) % total;
  card.dataset.index = String(currentIndex);

  const imageEl = card.querySelector("img");
  const counterEl = card.querySelector(".viewer-counter");
  imageEl.src = `./assets/images/templates/${images[currentIndex]}`;
  counterEl.textContent = `${currentIndex + 1} / ${total}`;
};

cards.forEach((card) => {
  const prev = card.querySelector(".viewer-btn.prev");
  const next = card.querySelector(".viewer-btn.next");

  prev?.addEventListener("click", () => switchImage(card, -1));
  next?.addEventListener("click", () => switchImage(card, 1));
});

const imageModal = document.createElement("div");
imageModal.className = "image-modal";
imageModal.innerHTML = `
  <button class="image-modal-close" type="button" aria-label="关闭">×</button>
  <img src="" alt="模板大图预览" />
`;
document.body.appendChild(imageModal);

const modalImg = imageModal.querySelector("img");
const closeModal = () => imageModal.classList.remove("open");

cards.forEach((card) => {
  const imageEl = card.querySelector("img");
  imageEl?.addEventListener("click", () => {
    modalImg.src = imageEl.src;
    imageModal.classList.add("open");
  });
});

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal || event.target.classList.contains("image-modal-close")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const consultTriggers = document.querySelectorAll(".consult-trigger");
const consultModal = document.createElement("div");
consultModal.className = "consult-modal";
consultModal.innerHTML = `
  <div class="consult-modal-card">
    <h3>微信咨询</h3>
    <p>请添加助手微信沟通需求</p>
    <p class="consult-wechat">hcistudio0403</p>
    <button class="consult-modal-close" type="button">我知道了</button>
  </div>
`;
document.body.appendChild(consultModal);

const closeConsultModal = () => consultModal.classList.remove("open");
consultTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    consultModal.classList.add("open");
  });
});

consultModal.addEventListener("click", (event) => {
  if (event.target === consultModal || event.target.classList.contains("consult-modal-close")) {
    closeConsultModal();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    cards.forEach((card) => {
      const type = card.dataset.type;
      const visible = filter === "all" || type === filter;
      card.style.display = visible ? "block" : "none";
    });
  });
});

const revealTargets = document.querySelectorAll(
  ".section h2, .card, .template-card, .steps li, .site-footer .footer-grid > div"
);

revealTargets.forEach((node) => node.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((node) => observer.observe(node));
