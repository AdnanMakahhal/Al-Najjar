import { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import ProductModal from '../components/modals/ProductModal.jsx';
import DeleteConfirm from '../components/modals/DeleteConfirm.jsx';

// ─── Products Tab ──────────────────────────────────────────────────────────────
export default function ProductsTab() {
    const { products, deleteProduct, categories } = useAdmin();
    const { t, currency, lang } = useLang();
    const allTabs = [{ id: 'all', label: { en: t.admin.products.all, ar: t.admin.products.all, es: t.admin.products.all } }, ...categories];

    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('all');
    const [modalProduct, setModalProduct] = useState(undefined);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const filtered = useMemo(() => {
        let list = catFilter === 'all' ? products : products.filter(p => p.category === catFilter);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(p => Object.values(p.name).some(n => n.toLowerCase().includes(q)));
        }
        return list;
    }, [products, catFilter, search]);

    const catLabel = (id) => {
        const cat = categories.find(c => c.id === id);
        return cat ? (cat.label?.en || cat.label || id) : id;
    };

    return (
        <>
            {/* ── Toolbar ─────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
                    <div className="relative flex-1 sm:flex-none">
                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-[18px]">search</span>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t.admin.products.searchPlaceholder}
                            className="w-full sm:w-52 bg-[#1c1c1f] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand/50 transition-colors" />
                    </div>
                    <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                        className="bg-[#1c1c1f] border border-white/10 rounded-xl px-3 py-2.5 text-[13px] text-white focus:outline-none focus:border-brand/50 transition-colors">
                        {allTabs.map(c => <option key={c.id} value={c.id}>{c.label.en || c.label}</option>)}
                    </select>
                    <span className="text-[12px] text-zinc-500 self-center">{filtered.length} {t.admin.sidebar.products}</span>
                </div>
                <button onClick={() => setModalProduct(null)} className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand/80 text-[13px] font-black text-black shadow-lg shadow-brand/20 shrink-0">
                    <span className="material-icons text-[18px]">add</span> {t.admin.products.addNewProduct}
                </button>
            </div>

            {/* ── Mobile Card View (hidden on sm+) ─────────────────────── */}
            <div className="sm:hidden flex flex-col gap-3">
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-zinc-600">
                        <span className="material-icons text-4xl block mb-2">search_off</span>
                        {t.admin.products.noProducts}
                    </div>
                )}
                {filtered.map(product => (
                    <div key={product.id} className="bg-[#18181b] border border-white/7 rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                            {product.image
                                ? <img src={product.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                                : <span className="material-icons text-zinc-600 text-[22px]">inventory_2</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-white text-[13px] truncate" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                                {lang === 'ar' ? (product.name.ar || product.name.en) : (product.name.en || product.name.ar)}
                            </p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="px-2 py-0.5 rounded-md bg-brand/10 text-brand text-[10px] font-bold">{catLabel(product.category)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            <button onClick={() => setModalProduct(product)} className="w-9 h-9 rounded-xl bg-white/6 hover:bg-brand/20 hover:text-brand transition-colors" title={t.admin.products.edit}>
                                <span className="material-icons text-[17px]">edit</span>
                            </button>
                            <button onClick={() => setDeleteTarget(product)} className="w-9 h-9 rounded-xl bg-white/6 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-zinc-400 transition-colors" title={t.admin.products.delete}>
                                <span className="material-icons text-[17px]">delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Desktop Table (hidden on mobile) ─────────────────────── */}
            <div className="hidden sm:block bg-[#18181b] border border-white/7 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr className="border-b border-white/7">
                                {[t.admin.modal.pName, t.admin.modal.pCategory, t.admin.modal.pPrice + ' ('+currency+')', ''].map((h, i) => (
                                    <th key={i} className="text-left rtl:text-right px-5 py-3.5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 && (
                                <tr><td colSpan={4} className="text-center py-16 text-zinc-600">
                                    <span className="material-icons text-4xl block mb-2">search_off</span>
                                    {t.admin.products.noProducts}
                                </td></tr>
                            )}
                            {filtered.map(product => (
                                <tr key={product.id} className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                                                {product.image ? <img src={product.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} /> : <span className="material-icons text-zinc-600 text-[18px]">inventory_2</span>}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-bold text-white leading-tight truncate" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                                                    {lang === 'ar' ? (product.name.ar || product.name.en) : (product.name.en || product.name.ar)}
                                                </p>
                                                <p className="text-[11px] text-zinc-600 mt-1 uppercase tracking-tight font-bold">{catLabel(product.category)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="px-3 py-1 rounded-lg bg-brand/10 text-brand text-[11px] font-bold">{catLabel(product.category)}</span>
                                    </td>
                                    <td className="px-5 py-4 text-white font-bold">{parseFloat(product.price).toFixed(2)}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setModalProduct(product)} className="w-8 h-8 rounded-lg bg-white/6 hover:bg-brand/20 hover:text-brand transition-colors" title={t.admin.products.edit}>
                                                <span className="material-icons text-[16px]">edit</span>
                                            </button>
                                            <button onClick={() => setDeleteTarget(product)} className="w-8 h-8 rounded-lg bg-white/6 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-zinc-400 transition-colors" title={t.admin.products.delete}>
                                                <span className="material-icons text-[16px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalProduct !== undefined && <ProductModal product={modalProduct} onClose={() => setModalProduct(undefined)} />}
            {deleteTarget && <DeleteConfirm product={deleteTarget} onConfirm={() => { deleteProduct(deleteTarget.id); setDeleteTarget(null); }} onCancel={() => setDeleteTarget(null)} />}
        </>
    );
}
