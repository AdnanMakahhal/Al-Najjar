import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export const DEFAULT_CATEGORIES = [
    { id: 'porcelain', label: { ar: 'بورسلان',      en: 'Porcelain',         ur: 'پورسلین',    zh: '瓷砖',    ru: 'Фарфор',     es: 'Porcelanato' } },
    { id: 'ceramic',   label: { ar: 'سيراميك',      en: 'Ceramic',           ur: 'سیرامک',     zh: '陶瓷',    ru: 'Керамика',   es: 'Cerámica' } },
    { id: 'sanitary',  label: { ar: 'أدوات صحية',   en: 'Sanitary Ware',     ur: 'سینیٹری',    zh: '卫浴',    ru: 'Сантехника', es: 'Sanitarios' } },
    { id: 'install',   label: { ar: 'مواد تركيب',   en: 'Installation Aids', ur: 'تنصیب',      zh: '安装材料', ru: 'Монтаж',     es: 'Material de instalación' } },
    { id: 'protect',   label: { ar: 'حماية وتنظيف', en: 'Protection',        ur: 'حفاظت',      zh: '保护清洁', ru: 'Защита',     es: 'Protección y Limpieza' } },
    { id: 'adhesive',  label: { ar: 'غراء ورغوة',   en: 'Glue & Foam',       ur: 'چپکنے والا', zh: '胶粘剂',  ru: 'Клей',       es: 'Pegamento y Espuma' } },
];

const DEFAULT_CONTACT = {
    phone: '+968 2684 5084',
    whatsapp: '+968 9233 9400',
    email: 'contact@alnajjar-intl.com',
    address: 'Muscat – Head Office | Airport Road, 3rd Floor, Oman',
    mapUrl: 'https://maps.app.goo.gl/dggVrT56pJDV4oF96',
    tiktok: 'https://www.tiktok.com/@alnajjar.ceramic',
    instagram: '#',
    facebook: '#',
};

const DEFAULT_HERO = {
    type: 'video',
    src: '/Assets/Video/background_video_site.mp4',
    tag: { ar: 'جودة لا تُضاهى', en: 'Unmatched Quality' },
    title1: { ar: 'مورد موثوق للسيراميك', en: 'Trusted Supplier of Ceramics,' },
    title2: { ar: 'والبورسلان والأدوات الصحية', en: 'Porcelain & Sanitary Ware' },
    subtitle: { ar: 'نوفر تشكيلة واسعة من السيراميك والبورسلان المستورد والمحلي والأدوات الصحية، مع خيارات تناسب المشاريع السكنية والتجارية بأعلى معايير الجودة وأسعار تنافسية.', en: 'We provide a wide selection of imported and local ceramics, porcelain, and sanitary ware, with options for residential and commercial projects at the highest quality standards and competitive prices.' },
};

const DEFAULT_ABOUT = {
    title: {
        ar: 'النجار العالمية للتجارة والمقاولات',
        en: 'Al Najjar International Trading & Contracting',
        ur: 'النظار انٹرنیشنل ٹریڈنگ اینڈ کنٹریکٹنگ',
        zh: 'Al Najjar 国际贸易与承包公司',
        ru: 'Al Najjar International Trading & Contracting',
        es: 'Al Najjar International Trading & Contracting',
    },
    description: {
        ar: 'من الشركات العالمية الرائدة في مجال استيراد وتصدير السيراميك والبورسلان والأدوات الصحية، يقع مقرها الرئيسي في مَسقط - سلطنة عمان.',
        en: 'One of the leading international companies in the import and export of ceramics, porcelain, and sanitary ware, headquartered in Muscat, Oman.',
        ur: 'ہم مقامی اور بین الاقوامی منڈیوں میں سیرامکس اور سینیٹری کے سامان کے معروف اداروں میں سے ایک ہیں۔',
        zh: '作为全球领先的瓷砖、陶瓷及卫浴进出口公司之一，总部位于阿曼马斯喀特。',
        ru: 'Одна из ведущих международных компаний в области импорта и экспорта керамики, фарфора и сантехники.',
        es: 'Una de las empresas internacionales líderes en la importación y exportación de cerámica, porcelanato y artículos sanitarios, con sede en Mascate, Omán.',
    },
    stats: [
        { value: '1975', suffix: '', labels: { ar: 'تأسست', en: 'Founded', ur: 'قیام', zh: '成立年份', ru: 'Основана', es: 'Fundada' } },
        { value: '50', suffix: '+', labels: { ar: 'عاماً من التميز', en: 'Years of Excellence', ur: 'سال کا تجربہ', zh: '年卓越经验', ru: 'Лет опыта', es: 'Años de excelencia' } },
        { value: '500', suffix: '+', labels: { ar: 'تشكيلة منتجات', en: 'Product Collections', ur: 'مصنوعات کی اقسام', zh: '产品系列', ru: 'Коллекций товаров', es: 'Colecciones' } },
        { value: '6', suffix: '+', labels: { ar: 'دول تخدمها', en: 'Countries Served', ur: 'ممالک میں خدمات', zh: '服务国家', ru: 'Стран обслуживания', es: 'Países' } },
    ],
};

const DEFAULT_PARTNERS = {
    mode: 'grid',
    items: [
        { id: 1, name: { ar: 'شريك 1', en: 'Partner 1' }, img: '/Assets/Partners/p1.jpg' },
        { id: 2, name: { ar: 'شريك 2', en: 'Partner 2' }, img: '/Assets/Partners/p2.jpg' },
        { id: 3, name: { ar: 'شريك 3', en: 'Partner 3' }, img: '/Assets/Partners/p3.png' },
        { id: 5, name: { ar: 'شريك 5', en: 'Partner 5' }, img: '/Assets/Partners/p5.png' },
        { id: 6, name: { ar: 'شريك 6', en: 'Partner 6' }, img: '/Assets/Partners/p6.png' },
        { id: 7, name: { ar: 'شريك 7', en: 'Partner 7' }, img: '/Assets/Partners/p7.png' },
        { id: 8, name: { ar: 'شريك 8', en: 'Partner 8' }, img: '/Assets/Partners/p8.png' },
    ],
};

export const DEFAULT_BRANCHES = [
    { id: 'br1', country: 'OM', type: 'branch',    nameEn: 'Muscat – Head Office',      nameAr: 'مسقط – المقر الرئيسي',     address: 'Main Airport Rd, 3rd Floor, Oman', phone: '+968 2684 5084', mapUrl: 'https://maps.app.goo.gl/dggVrT56pJDV4oF96', image: '', hoursEn: '8:00 AM - 10:00 PM', hoursAr: '8:00 صباحاً - 10:00 مساءً' },
    { id: 'br2', country: 'OM', type: 'warehouse', nameEn: 'Muscat Warehouse',            nameAr: 'مستودع مسقط',              address: 'Rusayl Industrial Area, Muscat, Oman', phone: '+968 2684 5084', mapUrl: '', image: '', hoursEn: '8:00 AM - 6:00 PM', hoursAr: '8:00 صباحاً - 6:00 مساءً' },
    { id: 'br3', country: 'OM', type: 'showroom',  nameEn: 'Muscat Showroom',             nameAr: 'معرض مسقط',               address: 'Al Hail Area, Muscat, Oman',         phone: '+968 9233 9400', mapUrl: '', image: '', hoursEn: '9:00 AM - 11:00 PM', hoursAr: '9:00 صباحاً - 11:00 مساءً' },
    { id: 'br4', country: 'OM', type: 'warehouse', nameEn: 'Sohar Warehouse',             nameAr: 'مستودع صحار',               address: 'Industrial Zone, Sohar, Oman',        phone: '+968 2684 5084', mapUrl: '', image: '', hoursEn: '8:00 AM - 6:00 PM', hoursAr: '8:00 صباحاً - 6:00 مساءً' },
    { id: 'br5', country: 'AE', type: 'branch',    nameEn: 'Sharjah – UAE Branch',       nameAr: 'الشارقة – فرع الإمارات',  address: 'Al Majaz Area, Sharjah, UAE',         phone: '+971 6 XXX XXXX', mapUrl: '', image: '', hoursEn: '8:00 AM - 10:00 PM', hoursAr: '8:00 صباحاً - 10:00 مساءً' },
    { id: 'br6', country: 'AE', type: 'warehouse', nameEn: 'Sharjah Warehouse',           nameAr: 'مستودع الشارقة',             address: 'Industrial Area, Sharjah, UAE',       phone: '+971 6 XXX XXXX', mapUrl: '', image: '', hoursEn: '8:00 AM - 6:00 PM', hoursAr: '8:00 صباحاً - 6:00 مساءً' },
    { id: 'br7', country: 'AE', type: 'branch',    nameEn: 'Dubai – UAE Branch',         nameAr: 'دبي – فرع الإمارات',     address: 'Al Karama, Dubai, UAE',               phone: '+971 4 XXX XXXX', mapUrl: '', image: '', hoursEn: '8:00 AM - 10:00 PM', hoursAr: '8:00 صباحاً - 10:00 مساءً' },
];


export const DEFAULT_PRODUCTS = [
    { id: 'p1', category: 'porcelain', image: '', price: 8.5, stock: 200, name: { ar: 'بلاطات بورسلان إسبانية', en: 'Spanish Porcelain Tiles', ur: 'ہسپانوی پورسلین ٹائلز', zh: '西班牙瓷砖', ru: 'Испанская напольная плитка', es: 'Porcelanato Español' }, specs: { size: '60×60 cm', weight: '18 kg/m²', thickness: '9 mm', heatResist: '≥ 600 °C', finish: 'Matte', origin: 'Spain' } },
    { id: 'p2', category: 'porcelain', image: '', price: 12.0, stock: 150, name: { ar: 'بورسلان مرمري أبيض', en: 'White Marble Porcelain', ur: 'سفید ماربل پورسلین', zh: '白色大理石瓷砖', ru: 'Белый мраморный фарфор', es: 'Porcelanato Mármol Blanco' }, specs: { size: '80×80 cm', weight: '22 kg/m²', thickness: '10 mm', heatResist: '≥ 600 °C', finish: 'Polished', origin: 'Spain' } },
    { id: 'p3', category: 'porcelain', image: '', price: 9.5, stock: 80, name: { ar: 'بورسلان رمادي مطفأ', en: 'Matte Grey Porcelain', ur: 'میٹ گرے پورسلین', zh: '亚光灰色瓷砖', ru: 'Матовый серый фарфор', es: 'Porcelanato Gris Mate' }, specs: { size: '60×120 cm', weight: '24 kg/m²', thickness: '10 mm', heatResist: '≥ 600 °C', finish: 'Matte', origin: 'Oman' } },
    { id: 'c1', category: 'ceramic', image: '', price: 4.5, stock: 500, name: { ar: 'بلاطات سيراميك للحمام', en: 'Bathroom Ceramic Tiles', ur: 'باتھ روم سیرامک ٹائلز', zh: '浴室瓷砖', ru: 'Керамика для ванной', es: 'Cerámica para Baño' }, specs: { size: '30×60 cm', weight: '11 kg/m²', thickness: '8 mm', waterAbsorption: '< 3%', finish: 'Glossy', origin: 'Oman' } },
    { id: 'c2', category: 'ceramic', image: '', price: 3.8, stock: 320, name: { ar: 'سيراميك حائط ديكوري', en: 'Decorative Wall Ceramic', ur: 'ڈیکوریٹیو وال سیرامک', zh: '装饰墙砖', ru: 'Декоративная настенная керамика', es: 'Cerámica Decorativa de Pared' }, specs: { size: '25×40 cm', weight: '9 kg/m²', thickness: '7 mm', waterAbsorption: '< 5%', finish: 'Glossy', origin: 'Saudi Arabia' } },
    { id: 'c3', category: 'ceramic', image: '', price: 5.2, stock: 180, name: { ar: 'سيراميك أرضية خارجية', en: 'Outdoor Floor Ceramic', ur: 'آؤٹ ڈور فلور سیرامک', zh: '户外地砖', ru: 'Уличная керамическая плитка', es: 'Cerámica de Piso Exterior' }, specs: { size: '45×45 cm', weight: '14 kg/m²', thickness: '9.5 mm', slipResist: 'R11', origin: 'Saudi Arabia' } },
    { id: 's1', category: 'sanitary', image: '', price: 45.0, stock: 30, name: { ar: 'مغسلة معلقة أبيض', en: 'Wall-Hung Washbasin White', ur: 'وال هنگ واش بیسن', zh: '壁挂式洗手盆', ru: 'Подвесная раковина белая', es: 'Lavabo Suspendido Blanco' }, specs: { material: 'Vitreous China', size: '60×48 cm', weight: '12 kg', color: 'White', standard: 'ISO 6991' } },
    { id: 's2', category: 'sanitary', image: '', price: 110.0, stock: 15, name: { ar: 'مرحاض معلق مع خزان', en: 'Wall-Hung Toilet with Cistern', ur: 'وال ہنگ ٹوائلٹ', zh: '壁挂马桶', ru: 'Подвесной унитаз с инсталляцией', es: 'Inodoro Suspendido con Cisterna' }, specs: { material: 'Vitreous China', flushVol: '4/6 L dual flush', color: 'White', standard: 'EN 997' } },
    { id: 's3', category: 'sanitary', image: '', price: 75.0, stock: 20, name: { ar: 'خلاطة حوض كروم', en: 'Chrome Basin Mixer', ur: 'کروم بیسن مکسر', zh: '镀铬面盆龙头', ru: 'Хромированный смеситель', es: 'Mezclador de Lavabo Cromo' }, specs: { material: 'Brass', finish: 'Chrome', cartridge: '35 mm ceramic', pressure: '0.5–8 bar' } },
    { id: 'i1', category: 'install', image: '', price: 6.0, stock: 400, name: { ar: 'مواد لاصقة تركيب سيراميك', en: 'Ceramic Tile Adhesive C2', ur: 'سیرامک ٹائل ایڈسیو', zh: '瓷砖粘合剂C2', ru: 'Клей для плитки C2', es: 'Adhesivo para Cerámica C2' }, specs: { weight: '25 kg bag', classif: 'C2', potLife: '30 min', coverage: '4–6 m²/bag', frost: 'Frost resistant' } },
    { id: 'i2', category: 'install', image: '', price: 3.5, stock: 600, name: { ar: 'خليط تجميع (جروت)', en: 'Tile Grout', ur: 'ٹائل گراؤٹ', zh: '填缝剂', ru: 'Затирка для плитки', es: 'Lechada para Azulejos' }, specs: { weight: '5 kg bag', colors: '12 colors', jointWidth: '1–15 mm', waterResist: 'Yes' } },
    { id: 'r1', category: 'protect', image: '', price: 15.0, stock: 100, name: { ar: 'طارد ماء للسيراميك', en: 'Ceramic Water Repellent', ur: 'سیرامک واٹر ریپلنٹ', zh: '瓷砖防水剂', ru: 'Водоотталкивающее для керамики', es: 'Repelente de Agua para Cerámica' }, specs: { volume: '1 L / 5 L', coverage: '10–15 m²/L', dryTime: '2 hrs', durability: '5 years' } },
    { id: 'r2', category: 'protect', image: '', price: 8.0, stock: 200, name: { ar: 'منظف بلاط مركز', en: 'Concentrated Tile Cleaner', ur: 'ٹائل کلینر', zh: '浓缩瓷砖清洁剂', ru: 'Концентрат для чистки плитки', es: 'Limpiador de Azulejos Concentrado' }, specs: { volume: '1 L', dilution: '1:10', pH: '2.5 (acid)', surface: 'Ceramic, Porcelain' } },
    { id: 'g1', category: 'adhesive', image: '', price: 4.5, stock: 250, name: { ar: 'رغوة بولي يوريتان', en: 'Polyurethane Foam', ur: 'پولی یوریتھین فوم', zh: '聚氨酯泡沫', ru: 'Полиуретановая монтажная пена', es: 'Espuma de Poliuretano' }, specs: { volume: '750 ml', expansion: '60 L', cureTime: '20 min tack-free', tempRange: '-20 °C to +90 °C' } },
    { id: 'g2', category: 'adhesive', image: '', price: 6.5, stock: 180, name: { ar: 'غراء إيبوكسي دو مكونات', en: 'Two-Component Epoxy Adhesive', ur: 'ایپوکسی ایڈسیو', zh: '双组份环氧胶', ru: 'Двухкомпонентный эпоксидный клей', es: 'Adhesivo Epoxi de Dos Componentes' }, specs: { volume: '400 ml cartridge', bondStrength: '25 MPa', openTime: '5 min', tempRange: '-40 °C to +120 °C' } },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function load(key, defaultVal) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : defaultVal;
    } catch {
        return defaultVal;
    }
}
function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
}
function uid() {
    return 'prod_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

// ─── Context ───────────────────────────────────────────────────────────────────
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
    const [products, setProducts] = useState(() => load('admin_products', DEFAULT_PRODUCTS));
    const [contactInfo, setContactInfo] = useState(() => load('admin_contact', DEFAULT_CONTACT));
    const [heroSettings, setHeroSettings] = useState(() => load('admin_hero', DEFAULT_HERO));
    const [aboutContent, setAboutContent] = useState(() => load('admin_about', DEFAULT_ABOUT));
    const [partnersSettings, setPartnersSettings] = useState(() => load('admin_partners', DEFAULT_PARTNERS));
    const [categories, setCategories] = useState(() => load('admin_categories', DEFAULT_CATEGORIES));
    const [branches, setBranches] = useState(() => load('admin_branches', DEFAULT_BRANCHES));

    useEffect(() => { save('admin_products', products); }, [products]);
    useEffect(() => { save('admin_contact', contactInfo); }, [contactInfo]);
    useEffect(() => { save('admin_hero', heroSettings); }, [heroSettings]);
    useEffect(() => { save('admin_about', aboutContent); }, [aboutContent]);
    useEffect(() => { save('admin_partners', partnersSettings); }, [partnersSettings]);
    useEffect(() => { save('admin_categories', categories); }, [categories]);
    useEffect(() => { save('admin_branches', branches); }, [branches]);

    // Sync across tabs
    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === 'admin_products') setProducts(load('admin_products', DEFAULT_PRODUCTS));
            if (e.key === 'admin_categories') setCategories(load('admin_categories', DEFAULT_CATEGORIES));
            if (e.key === 'admin_contact') setContactInfo(load('admin_contact', DEFAULT_CONTACT));
            if (e.key === 'admin_hero') setHeroSettings(load('admin_hero', DEFAULT_HERO));
            if (e.key === 'admin_about') setAboutContent(load('admin_about', DEFAULT_ABOUT));
            if (e.key === 'admin_partners') setPartnersSettings(load('admin_partners', DEFAULT_PARTNERS));
            if (e.key === 'admin_branches') setBranches(load('admin_branches', DEFAULT_BRANCHES));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    // Products CRUD
    const addProduct = useCallback((product) => { const p = { ...product, id: uid() }; setProducts(prev => [p, ...prev]); return p; }, []);
    const updateProduct = useCallback((id, updated) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p)), []);
    const deleteProduct = useCallback((id) => setProducts(prev => prev.filter(p => p.id !== id)), []);
    const resetProducts = useCallback(() => setProducts(DEFAULT_PRODUCTS), []);

    // Categories CRUD
    function catUid() { return 'cat_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5); }
    const addCategory = useCallback((labelsOrString) => {
        const id = catUid();
        const label = typeof labelsOrString === 'string' 
            ? { en: labelsOrString, ar: labelsOrString, ur: labelsOrString, zh: labelsOrString, ru: labelsOrString, es: labelsOrString }
            : labelsOrString;
        setCategories(prev => [...prev, { id, label }]);
    }, []);
    const deleteCategory = useCallback((id) => setCategories(prev => prev.filter(c => c.id !== id)), []);
    const resetCategories = useCallback(() => setCategories(DEFAULT_CATEGORIES), []);

    // Contact
    const updateContactInfo = useCallback((data) => setContactInfo(prev => ({ ...prev, ...data })), []);
    const resetContact = useCallback(() => setContactInfo(DEFAULT_CONTACT), []);

    // Hero
    const updateHeroSettings = useCallback((data) => setHeroSettings(prev => ({ ...prev, ...data })), []);
    const resetHero = useCallback(() => setHeroSettings(DEFAULT_HERO), []);

    // About
    const updateAboutContent = useCallback((data) => setAboutContent(prev => ({ ...prev, ...data })), []);
    const resetAbout = useCallback(() => setAboutContent(DEFAULT_ABOUT), []);

    // Partners
    const updatePartnersSettings = useCallback((data) => setPartnersSettings(prev => ({ ...prev, ...data })), []);
    const addPartner = useCallback((partner) => { const p = { ...partner, id: Date.now() }; setPartnersSettings(prev => ({ ...prev, items: [...prev.items, p] })); }, []);
    const updatePartner = useCallback((id, data) => setPartnersSettings(prev => ({ ...prev, items: prev.items.map(p => p.id === id ? { ...p, ...data } : p) })), []);
    const deletePartner = useCallback((id) => setPartnersSettings(prev => ({ ...prev, items: prev.items.filter(p => p.id !== id) })), []);
    const resetPartners = useCallback(() => setPartnersSettings(DEFAULT_PARTNERS), []);

    // Branches CRUD
    function branchUid() { return 'br_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5); }
    const addBranch = useCallback((data) => setBranches(prev => [...prev, { ...data, id: branchUid() }]), []);
    const updateBranch = useCallback((id, data) => setBranches(prev => prev.map(b => b.id === id ? { ...b, ...data } : b)), []);
    const deleteBranch = useCallback((id) => setBranches(prev => prev.filter(b => b.id !== id)), []);
    const resetBranches = useCallback(() => setBranches(DEFAULT_BRANCHES), []);

    const value = useMemo(() => ({
        products, addProduct, updateProduct, deleteProduct, resetProducts,
        categories, addCategory, deleteCategory, resetCategories,
        contactInfo, updateContactInfo, resetContact,
        heroSettings, updateHeroSettings, resetHero,
        aboutContent, updateAboutContent, resetAbout,
        partnersSettings, updatePartnersSettings, addPartner, updatePartner, deletePartner, resetPartners,
        branches, addBranch, updateBranch, deleteBranch, resetBranches,
    }), [products, categories, contactInfo, heroSettings, aboutContent, partnersSettings, branches,
        addProduct, updateProduct, deleteProduct, resetProducts,
        addCategory, deleteCategory, resetCategories,
        updateContactInfo, resetContact, updateHeroSettings, resetHero,
        updateAboutContent, resetAbout, updatePartnersSettings, addPartner, updatePartner, deletePartner, resetPartners,
        addBranch, updateBranch, deleteBranch, resetBranches]);

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export const useAdmin = () => useContext(AdminContext);
export { DEFAULT_CONTACT, DEFAULT_HERO };
