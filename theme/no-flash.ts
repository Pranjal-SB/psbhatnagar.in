// Runs before paint. Reads persisted state, sets <html> data-attrs so the
// correct palette/theme paints on first frame (no light->dark flash).
// zustand's persist wraps payload as { state: {...}, version }, hence s.state.
export const NO_FLASH_SCRIPT = `(function(){try{
var r=document.documentElement;
var s=JSON.parse(localStorage.getItem('psb.state')||'{}');
var st=(s&&s.state)||{};
r.dataset.palette=st.palette||'indigo';
r.dataset.theme=st.theme||'light';
}catch(e){
var r=document.documentElement;r.dataset.palette='indigo';r.dataset.theme='light';
}})();`;
