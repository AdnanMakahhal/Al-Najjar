export default function DeleteConfirm({ product, onConfirm, onCancel }) {
    const name = product?.name?.en || product?.name?.ar || 'this product';
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onCancel}>
            <div className="bg-[#1c1c1f] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons text-red-400 text-[24px]">delete_forever</span>
                </div>
                <h3 className="text-[15px] font-black text-white text-center mb-2">Delete Product?</h3>
                <p className="text-[13px] text-zinc-400 text-center mb-6">"<span className="text-white">{name}</span>" will be permanently removed.</p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-[13px] font-semibold text-zinc-300 transition-colors">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-[13px] font-black text-white transition-colors">Delete</button>
                </div>
            </div>
        </div>
    );
}
