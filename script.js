// 本地存储的作品数据
let portfolioData = [
    {
        id: 1,
        title: '品牌海报设计',
        category: 'design',
        description: '现代简约风格的品牌宣传海报，突出品牌特色。',
        image: 'https://via.placeholder.com/300x300?text=平面设计作品1'
    },
    {
        id: 2,
        title: '产品包装设计',
        category: 'packaging',
        description: '精美的产品包装盒设计，兼具美观和实用性。',
        image: 'https://via.placeholder.com/300x300?text=包装设计作品1'
    },
    {
        id: 3,
        title: '宣传册设计',
        category: 'design',
        description: '企业宣传册的专业设计和排版。',
        image: 'https://via.placeholder.com/300x300?text=平面设计作品2'
    }
];

// 从本地存储加载数据
function loadPortfolioData() {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
        portfolioData = JSON.parse(saved);
    }
    renderPortfolio();
}

// 保存数据到本地存储
function savePortfolioData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// 获取分类标签
function getCategoryLabel(category) {
    const labels = {
        'design': '平面设计',
        'packaging': '包装设计',
        'other': '其他'
    };
    return labels[category] || category;
}

// 渲染作品集
function renderPortfolio(filter = 'all') {
    const grid = document.getElementById('portfolioGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = `portfolio-item`;
        div.setAttribute('data-category', item.category);
        div.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p class="category">${getCategoryLabel(item.category)}</p>
                <p>${item.description}</p>
                <button class="btn" onclick="deletePortfolio(${item.id})" style="margin-top: 1rem; background-color: #e74c3c;">删除</button>
            </div>
        `;
        grid.appendChild(div);
    });
}

// 删除作品
function deletePortfolio(id) {
    if (confirm('确定要删除这个作品吗？')) {
        portfolioData = portfolioData.filter(item => item.id !== id);
        savePortfolioData();
        renderPortfolio();
    }
}

// 设置过滤按钮
function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderPortfolio(filter);
        });
    });
}

// 设置上传表单
function setupUploadForm() {
    const form = document.getElementById('uploadForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('projectName').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const imageInput = document.getElementById('image');

        if (imageInput.files.length === 0) {
            alert('请选择一张图片');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const newProject = {
                id: Date.now(),
                title: name,
                category: category,
                description: description,
                image: event.target.result
            };

            portfolioData.push(newProject);
            savePortfolioData();

            // 清空表单
            form.reset();
            alert('作品上传成功！');
            
            // 重新渲染
            renderPortfolio();
            
            // 滚动到作品集区域
            document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
        };

        reader.readAsDataURL(imageInput.files[0]);
    });
}

// 设置联系表单
function setupContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('感谢你的消息！我会尽快回复你。');
        form.reset();
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();
    setupFilterButtons();
    setupUploadForm();
    setupContactForm();
});