// ========================================
// 页面性能优化 - 加载进度条和图片渐进式加载
// ========================================

// 页面加载进度条
(function() {
    const loadingBar = document.getElementById('loading-bar');
    let progress = 0;
    
    // 模拟进度增长
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 90) {
            progress = 90;
            clearInterval(interval);
        }
        if (loadingBar) {
            loadingBar.style.width = progress + '%';
        }
    }, 200);
    
    // 页面完全加载后完成进度
    window.addEventListener('load', () => {
        if (loadingBar) {
            loadingBar.style.width = '100%';
            setTimeout(() => {
                loadingBar.style.opacity = '0';
                setTimeout(() => {
                    loadingBar.style.display = 'none';
                }, 300);
            }, 500);
        }
    });
})();

// 图片渐进式加载效果
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 如果图片已经加载完成（来自缓存）
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            // 监听图片加载完成事件
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            // 处理加载错误
            img.addEventListener('error', () => {
                img.classList.add('loaded');
            });
        }
    });
    
    // 使用 Intersection Observer 优化懒加载
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                }
            });
        }, {
            rootMargin: '50px' // 提前50px开始加载
        });
        
        images.forEach(img => {
            if (img.loading === 'lazy') {
                imageObserver.observe(img);
            }
        });
    }
});

// ========================================
// 推廣人員郵箱對照表
// ========================================
// 在 email-mapping.html 生成代碼後，將代碼貼在這裡
const EMAIL_MAPPING = {
    // 範例：
    // 'A': 'userA@gmail.com',
    // 'B': 'userB@gmail.com',
    "jordantsai777": "jordantsai777@gmail.com",
    "jordantsai07": "jordantsai07@gmail.com",
    "001": "cchaha888@gmail.com",
    "002": "a0928127137@gmail.com",
    "003": "peter.w2520701@gmail.com",
    "005": "gabi4507@gmail.com",
    "006": "h0917995529@gmail.com",
    "008": "rong20020804@gmail.com",
    "009": "amy75301@gmail.com",
    "010": "sasabreakfast@gmail.com"
};

// 預設郵箱（如果沒有 ref 參數）
const DEFAULT_EMAIL = 'jordantsai777@gmail.com';

// 從 URL 獲取推廣代碼
function getReferralCode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref');
}

// 根據推廣代碼獲取對應郵箱
function getTargetEmail() {
    const refCode = getReferralCode();
    const email = EMAIL_MAPPING[refCode] || DEFAULT_EMAIL;
    console.log('📧 推廣代碼:', refCode || '無');
    console.log('📧 目標郵箱:', email);
    return email;
}

// ========================================
// Google 表單設定
// ========================================
// 從 localStorage 載入設定，如果沒有則使用預設值

// 預設設定（後備用）
const DEFAULT_GOOGLE_FORM_CONFIG = {
    enabled: true,
    formId: '1FAIpQLSfgpRp3GyT27oanx3_pLwAlGVgCGdvH-gPnyS_fW-LsueGpFw',
    fields: {
        fullName: 'entry.1124417422',
        email: 'entry.1571446378',
        phone: 'entry.51167075',
        country: 'entry.251150813',
        industry: 'entry.828038711',
        region: 'entry.1586436660',
        lineId: 'entry.1922861190',
        whatsapp: 'entry.1017645638'
    }
};

// 從 localStorage 載入設定
function loadGoogleFormConfig() {
    try {
        const savedConfig = localStorage.getItem('googleFormConfig');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            console.log('✅ 已載入自訂設定');
            return config;
        }
    } catch (error) {
        console.warn('⚠️ 載入設定失敗，使用預設設定:', error);
    }
    console.log('ℹ️ 使用預設設定');
    return DEFAULT_GOOGLE_FORM_CONFIG;
}

// 載入設定
const GOOGLE_FORM_CONFIG = loadGoogleFormConfig();

// 國家對應表（確保與 Google 表單的選項一致）
const COUNTRY_NAMES = {
    'TW': '台灣',
    'HK': '香港',
    'SG': '新加坡',
    'MY': '馬來西亞',
    'CN': '中國',
    'US': '美國',
    'other': '其他'
};

// 行業對應表（確保與 Google 表單的選項一致）
const INDUSTRY_NAMES = {
    'spiritual': '身心靈導師',
    'beauty': '美容 / 美髮',
    'education': '教育 / 培訓',
    'insurance': '保險 / 金融',
    'realestate': '房地產',
    'consultant': '諮詢顧問',
    'freelancer': '自由工作者',
    'coach': '個人教練',
    'ecommerce': '電商 / 微商',
    'other': '其他'
};

// 地區對應表
const REGION_NAMES = {
    'north': '北部',
    'central': '中部',
    'south': '南部'
};

// ========================================
// 頁面功能
// ========================================

// 倒计时功能
function initCountdown() {
    // 设置倒计时结束时间（例如：今天晚上11:59pm）
    const now = new Date();
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    
    // 如果已经过了今天的11:59pm，设置为明天的11:59pm
    if (now > endTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            // 倒计时结束
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            const bannerEl = document.getElementById('countdown-banner');
            
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            if (bannerEl) bannerEl.textContent = '00:00:00';
            return;
        }

        // 计算天、时、分、秒
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // 更新显示（添加空值检查）
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const bannerEl = document.getElementById('countdown-banner');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        // 更新横幅倒计时（包含秒数）
        if (bannerEl) {
            bannerEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }

    // 初始化并每秒更新
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ折叠功能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 关闭其他打开的FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前FAQ
            item.classList.toggle('active');
        });
    });
}

// CTA按钮点击处理 - 打开模态框
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    const modal = document.getElementById('orderModal');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            openModal();
        });
    });
}

// 打开模态框
function openModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // 恢复滚动
}

// 显示成功页面
function showSuccessPage(userName, userRegion) {
    const modalContent = document.querySelector('#orderModal .modal-content');
    
    // 保存原始内容
    const originalContent = modalContent.innerHTML;
    
    // 准备地区显示文字
    const regionText = userRegion ? `，評估地區：${userRegion}` : '';
    
    // 显示成功页面内容
    modalContent.innerHTML = `
        <div class="success-page" style="text-align: center; padding: 40px 20px;">
            <div class="success-icon" style="font-size: 80px; margin-bottom: 20px;">
                ✅
            </div>
            <h2 style="color: #2ecc71; margin-bottom: 10px;">提交成功！</h2>
            <p style="font-size: 1.1rem; color: #333; margin-bottom: 30px;">
                感謝 <strong>${userName}</strong>！<br>
                您已成功報名${regionText}，
            </p>
            
            <button onclick="location.reload()" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; border: none; padding: 15px 40px; font-size: 1.1rem; border-radius: 30px; cursor: pointer; margin-top: 20px; box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);">
                關閉
            </button>
        </div>
    `;
    
    // 滾動到彈窗頂部
    setTimeout(() => {
        modalContent.scrollTop = 0;
    }, 100);
}

// 初始化模态框事件
function initModal() {
    const modal = document.getElementById('orderModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // 点击关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// ========================================
// 資料儲存功能
// ========================================

// Google Apps Script 部署 URL（全局变量）
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwysRbbLiMwUUWFgJvO3Dyc-LWokX3VDP7qQuJx-wYCWhNh9P5NapCVVKtYblXrp9jK/exec';

// LocalStorage 資料管理
const STORAGE_KEY = 'customerLeads';

// 儲存資料到 localStorage（本地備份）
function saveToLocalStorage(data) {
    try {
        // 取得現有資料
        let leads = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        
        // 加入新資料
        const newLead = {
            id: Date.now(), // 使用時間戳作為 ID
            ...data,
            createdAt: new Date().toISOString()
        };
        
        leads.push(newLead);
        
        // 儲存回 localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
        
        return { success: true, data: newLead };
    } catch (error) {
        console.error('本地儲存失敗:', error);
        return { success: false, error: error.message };
    }
}

// 提交資料到 Google 表單
async function submitToGoogleForm(data) {
    try {
        // 建立表單提交網址（使用 /d/e/ 格式，因為 Form ID 是從預填連結取得）
        const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_CONFIG.formId}/formResponse`;
        
        // 準備表單資料
        const formData = new FormData();
        
        // 添加必填欄位資料
        if (GOOGLE_FORM_CONFIG.fields.fullName && data.fullName) {
            formData.append(GOOGLE_FORM_CONFIG.fields.fullName, data.fullName);
        }
        if (GOOGLE_FORM_CONFIG.fields.email && data.email) {
            formData.append(GOOGLE_FORM_CONFIG.fields.email, data.email);
        }
        if (GOOGLE_FORM_CONFIG.fields.phone && data.phone) {
            formData.append(GOOGLE_FORM_CONFIG.fields.phone, data.phone);
        }
        if (GOOGLE_FORM_CONFIG.fields.country && data.country) {
            formData.append(GOOGLE_FORM_CONFIG.fields.country, COUNTRY_NAMES[data.country] || data.country);
        }
        if (GOOGLE_FORM_CONFIG.fields.industry && data.industry) {
            formData.append(GOOGLE_FORM_CONFIG.fields.industry, INDUSTRY_NAMES[data.industry] || data.industry);
        }
        
        // 添加選填字段：地區、LINE ID 和 WhatsApp
        if (GOOGLE_FORM_CONFIG.fields.region && data.region) {
            formData.append(GOOGLE_FORM_CONFIG.fields.region, REGION_NAMES[data.region] || data.region);
        }
        if (GOOGLE_FORM_CONFIG.fields.lineId && data.lineId && data.lineId !== '未提供') {
            formData.append(GOOGLE_FORM_CONFIG.fields.lineId, data.lineId);
        }
        if (GOOGLE_FORM_CONFIG.fields.whatsapp && data.whatsapp && data.whatsapp !== '未提供') {
            formData.append(GOOGLE_FORM_CONFIG.fields.whatsapp, data.whatsapp);
        }
        
        console.log('📤 正在提交資料到 Google 表單...');
        console.log('表單 URL:', formUrl);
        
        // 打印所有要提交的資料（用於調試）
        console.log('=== 📋 提交的表單資料 ===');
        for (let [key, value] of formData.entries()) {
            console.log(`  ${key}: "${value}"`);
        }
        console.log('========================');
        
        // 使用 no-cors 模式提交（Google Forms 不允許讀取回應，但會正常提交）
        await fetch(formUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        
        console.log('✅ 資料已成功提交到 Google 表單！');
        return { success: true };
    } catch (error) {
        console.error('❌ Google 表單提交失敗:', error);
        return { success: false, error: error.message };
    }
}

// 處理表單提交（使用 Google Apps Script，支援動態推廣郵箱）
function initOrderForm() {
    const form = document.getElementById('orderForm');
    const submitBtn = document.getElementById('submitBtn');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateRegionSelection(true)) {
            return;
        }
        
        // 驗證表單
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // 顯示載入狀態
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳ 處理中...</span>';
        
        // 獲取用戶名稱
        const userName = form.querySelector('[name="姓名"]').value;
        
        // 🎯 添加推廣代碼到表單（Google Script 會根據此判斷目標郵箱）
        const refCode = getReferralCode();
        const targetEmail = getTargetEmail();
        
        console.log('🔖 推廣代碼:', refCode || '無');
        console.log('📧 目標郵箱:', targetEmail);
        
        // 準備表單資料
        const formData = new FormData(form);
        const countryValue = getCountryFormValue();
        const regionValue = getRegionFormValue();
        formData.set('國家地區', countryValue);
        formData.set('評估地區', regionValue);
        const userRegion = regionValue;
        
        // 添加推廣代碼
        if (refCode) {
            formData.append('推廣代碼', refCode);
        }
        formData.append('ref', refCode || '');
        
        // 🔍 調試：打印所有提交的資料
        console.log('=== 📋 準備提交的表單資料 ===');
        for (let [key, value] of formData.entries()) {
            console.log(`  ${key}: "${value}"`);
        }
        console.log('========================');
        
        try {
            console.log('📤 正在提交到 Google Apps Script...');
            
            // 提交到 Google Apps Script
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ 提交成功！郵件已發送到:', result.targetEmail || targetEmail);
                
                // 顯示成功頁面
                showSuccessPage(userName, userRegion);
                form.reset();
                resetFormCardSelectors();
            } else {
                console.error('❌ 提交失敗:', result.message);
                alert('❌ 提交失敗，請稍後再試或直接聯繫我們的 WhatsApp/LINE\n\n錯誤: ' + result.message);
            }
        } catch (error) {
            console.error('⚠️ 提交錯誤:', error);
            alert('❌ 網路錯誤，請檢查網路連接後重試');
        } finally {
            submitBtn.innerHTML = '<span data-i18n="form-submit">📝 提交資料</span>';
            updateSubmitButtonState();
        }
    });

    updateSubmitButtonState();
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 滚动动画效果
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 为各个区块添加动画
    const animatedElements = document.querySelectorAll(
        '.audience-card, .case-card, .testimonial-card, .included-item, .scenario-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 添加视频播放追踪和覆盖层控制
function initVideoTracking() {
    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');
    
    if (video && overlay) {
        // 視頻開始播放時隱藏覆蓋層
        video.addEventListener('play', () => {
            console.log('Video started playing');
            overlay.classList.add('hidden');
            // 这里可以添加分析追踪代码
        });

        // 視頻暫停時顯示覆蓋層
        video.addEventListener('pause', () => {
            console.log('Video paused');
            overlay.classList.remove('hidden');
        });

        // 視頻結束時顯示覆蓋層
        video.addEventListener('ended', () => {
            console.log('Video finished');
            overlay.classList.remove('hidden');
            // 视频结束后可以显示特别优惠等
        });

        // 當視頻從頭開始時確保覆蓋層可見
        video.addEventListener('loadeddata', () => {
            overlay.classList.remove('hidden');
        });
    }
}

/** 依 a/b/c 落地頁強制 hero 圖走各自 data/page-x/（避免三頁共用同一路徑或快取） */
function initLandingPageVariantAssets() {
    const body = document.body;
    if (!body) return;

    const variant = body.dataset.pageVariant;
    let assetDir = body.dataset.assetDir || '';
    if (!variant) return;

    if (!assetDir) {
        const path = window.location.pathname.replace(/\\/g, '/');
        if (path.includes('/b/')) assetDir = '/LOVE/data/page-b/';
        else if (path.includes('/c/')) assetDir = '/LOVE/data/page-c/';
        else if (path.includes('/a/')) assetDir = '/LOVE/data/page-a/';
    }
    if (!assetDir.endsWith('/')) assetDir += '/';

    body.classList.add('landing-variant-' + variant.toLowerCase());

    document.querySelectorAll('img.hero-top-image').forEach((img) => {
        const src = img.getAttribute('src') || '';
        const fileName = src.split('/').pop().split('?')[0];
        if (!fileName) return;
        img.src = assetDir + fileName + '?v=' + variant;
    });

    console.log('📄 落地頁', variant, '| 素材目錄', assetDir);
}

// 页面加载时初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initLandingPageVariantAssets();

    // 🌐 先初始化語言（必須最先執行）
    initLanguage();
    
    initCountdown();
    initFAQ();
    initCTAButtons();
    initModal();
    initOrderForm();
    initSmoothScroll();
    initScrollAnimations();
    initVideoTracking();
    
    // 🆕 初始化國家-地區卡片選擇
    initFormCardSelectors();
    
    // 🕒 初始化右上角時間地點選單
    initHeaderLocationSelect();
    
    // ⚠️ 不再默认加载，等用户选择国家后再加载
});

// 监听页面可见性变化，暂停/恢复倒计时
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
        // 重新初始化倒计时以确保准确性
        initCountdown();
    }
});

function getSelectedCountryCode() {
    const activeCard = document.querySelector('#country-cards .option-card.active');
    return activeCard ? activeCard.dataset.countryCode || 'TW' : 'TW';
}

let regionsLoading = true;

function getCountryFormValue() {
    const countryInput = document.getElementById('country');
    return countryInput && countryInput.value.trim()
        ? countryInput.value.trim()
        : '台灣 Taiwan';
}

function getRegionFormValue() {
    const regionInput = document.getElementById('region');
    return regionInput ? regionInput.value.trim() : '';
}

function setRegionFieldError(hasError) {
    const group = document.getElementById('region-form-group');
    const errorEl = document.getElementById('region-error');
    if (group) {
        group.classList.toggle('field-error', hasError);
    }
    if (errorEl) {
        errorEl.hidden = !hasError;
    }
}

function getRegionValidationMessage() {
    const errorEl = document.getElementById('region-error');
    if (errorEl && errorEl.textContent.trim()) {
        return errorEl.textContent.trim();
    }
    return '請選擇評估時間地點';
}

function updateSubmitButtonState() {
    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) {
        return;
    }
    submitBtn.disabled = regionsLoading || !getRegionFormValue();
}

function validateRegionSelection(showFeedback = false) {
    if (regionsLoading) {
        if (showFeedback) {
            alert('地點載入中，請稍候再提交');
        }
        return false;
    }

    const isValid = Boolean(getRegionFormValue());
    if (!isValid && showFeedback) {
        setRegionFieldError(true);
        alert(getRegionValidationMessage());
    } else if (isValid) {
        setRegionFieldError(false);
    }

    return isValid;
}

function clearRegionSelection() {
    const regionInput = document.getElementById('region');
    const grid = document.getElementById('region-cards');
    if (regionInput) {
        regionInput.value = '';
    }
    if (grid) {
        grid.querySelectorAll('.option-card').forEach(card => card.classList.remove('active'));
    }
    setRegionFieldError(false);
    updateSubmitButtonState();
}

function selectRegionCard(card) {
    const regionInput = document.getElementById('region');
    const grid = document.getElementById('region-cards');
    if (grid) {
        grid.querySelectorAll('.option-card').forEach(item => item.classList.remove('active'));
    }
    card.classList.add('active');
    if (regionInput) {
        regionInput.value = card.dataset.regionText || card.textContent.trim();
    }
    setRegionFieldError(false);
    updateSubmitButtonState();
}

function renderRegionCards(regions) {
    const grid = document.getElementById('region-cards');
    if (!grid) {
        return;
    }

    grid.innerHTML = '';
    regions.forEach(region => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'option-card';
        button.dataset.regionId = region.id;
        button.dataset.regionText = region.text;
        button.textContent = region.text;
        button.addEventListener('click', () => selectRegionCard(button));
        grid.appendChild(button);
    });

    const firstCard = grid.querySelector('.option-card');
    if (firstCard) {
        selectRegionCard(firstCard);
    }
}

function resetFormCardSelectors() {
    const countryInput = document.getElementById('country');
    if (countryInput) {
        countryInput.value = '台灣 Taiwan';
    }
    document.querySelectorAll('#country-cards .option-card').forEach(card => card.classList.remove('active'));
    const twCard = document.querySelector('#country-cards .option-card[data-country-code="TW"]');
    if (twCard) {
        twCard.classList.add('active');
    }
    clearRegionSelection();
    loadRegionCards('TW');
}

function initFormCardSelectors() {
    const countryCards = document.getElementById('country-cards');
    const regionCards = document.getElementById('region-cards');
    if (!countryCards || !regionCards) {
        console.warn('⚠️ 找不到國家或地區卡片元素');
        return;
    }

    countryCards.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            countryCards.querySelectorAll('.option-card').forEach(item => item.classList.remove('active'));
            card.classList.add('active');

            const countryInput = document.getElementById('country');
            if (countryInput) {
                countryInput.value = card.dataset.countryLabel || card.textContent.trim();
            }

            clearRegionSelection();
            const countryCode = card.dataset.countryCode || 'TW';
            loadRegionCards(countryCode);
            loadHeaderLocationOptions(countryCode);
        });
    });

    loadRegionCards('TW');
    console.log('✅ 國家-地區卡片選擇已初始化');
}

// ========================================
// 動態加載評估地點（從 Google Apps Script 獲取，根據國家）
// ========================================
async function loadRegionCards(country = 'TW') {
    const regionCards = document.getElementById('region-cards');
    const regionInput = document.getElementById('region');

    if (!regionCards) {
        console.warn('⚠️ 找不到評估地區卡片元素');
        return;
    }

    regionsLoading = true;
    updateSubmitButtonState();

    try {
        console.log('📍 正在載入評估地點選項...（國家: ' + country + '）');
        regionCards.innerHTML = '<p class="option-card-message">載入中...</p>';
        if (regionInput) {
            regionInput.value = '';
        }
        setRegionFieldError(false);

        const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getRegions&country=' + country);
        const result = await response.json();

        if (result.success && result.regions && result.regions.length > 0) {
            renderRegionCards(result.regions);
            console.log('✅ 成功載入 ' + result.regions.length + ' 個評估地點（' + country + '）');
        } else {
            console.warn('⚠️ 載入評估地點失敗，使用預設選項');
            const fallback = country === 'MY'
                ? [{ id: 'my1', text: '待定 - 吉隆坡地點' }]
                : [{ id: 'tw1', text: '待定 - 台灣地點' }];
            renderRegionCards(fallback);
        }
    } catch (error) {
        console.error('❌ 載入評估地點錯誤:', error);
        const fallback = country === 'MY'
            ? [{ id: 'my1', text: '待定 - 吉隆坡地點' }]
            : [{ id: 'tw1', text: '待定 - 台灣地點' }];
        renderRegionCards(fallback);
    } finally {
        regionsLoading = false;
        updateSubmitButtonState();
    }
}

// ========================================
// 右上角時間地點選單（從 Google Sheet 讀取）
// ========================================
async function loadHeaderLocationOptions(country = 'TW') {
    const locationSelect = document.getElementById('location-select');
    
    if (!locationSelect) {
        return;
    }
    
    try {
        locationSelect.innerHTML = '<option value="">載入中...</option>';
        locationSelect.disabled = true;
        
        const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getRegions&country=' + country);
        const result = await response.json();
        
        if (result.success && result.regions && result.regions.length > 0) {
            locationSelect.innerHTML = '<option value="">時間地點</option>';
            result.regions.forEach(region => {
                const option = document.createElement('option');
                option.value = region.id;
                option.textContent = region.text;
                locationSelect.appendChild(option);
            });
        } else {
            locationSelect.innerHTML = '<option value="">目前無可用時間地點</option>';
        }
    } catch (error) {
        console.error('❌ 載入時間地點選單錯誤:', error);
        locationSelect.innerHTML = '<option value="">時間地點載入失敗</option>';
    } finally {
        locationSelect.disabled = false;
    }
}

function initHeaderLocationSelect() {
    const locationSelect = document.getElementById('location-select');
    
    if (!locationSelect) {
        return;
    }
    
    loadHeaderLocationOptions(getSelectedCountryCode());
    updateSelectWidth(locationSelect);
    
    locationSelect.addEventListener('change', () => updateSelectWidth(locationSelect));
}

function updateSelectWidth(select) {
    const selectedOption = select.options[select.selectedIndex];
    if (!selectedOption) {
        return;
    }
    
    const text = selectedOption.textContent || '';
    const style = window.getComputedStyle(select);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
        return;
    }
    
    context.font = font;
    const textWidth = context.measureText(text).width;
    
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    const arrowSpace = 24; // 預留下拉箭頭空間
    
    select.style.width = `${Math.ceil(textWidth + paddingLeft + paddingRight + arrowSpace)}px`;
}

// 添加急迫感效果
function addUrgencyEffect() {
    const urgencyElements = document.querySelectorAll('.urgency-text, .urgency-badge');
    
    setInterval(() => {
        urgencyElements.forEach(el => {
            el.style.transform = 'scale(1.05)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 500);
        });
    }, 3000);
}

// 初始化急迫感效果
addUrgencyEffect();

