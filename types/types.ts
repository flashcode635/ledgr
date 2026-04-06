export type Category =
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Food"
  | "Transport"
  | "Housing"
  | "Entertainment"
  | "Healthcare"
  | "Shopping"
  | "Utilities"
  | "Education"
  | "Other";



export type Role = "Admin" | "Viewer";
export type Theme = "light" | "dark";

export type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
};

className=`bg-slate-800/30 border
 border-slate-400 text-white py-2 px-4 rounded-lg hover:bg-slate-600/20`

className=`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all`

className=`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 border border-violet-500/50 transition-all shadow-lg shadow-violet-600/20`

className=`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-100 bg-violet-600 hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20`

className=`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 transition-all`

className=`inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-all`

className=`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 transition-all`

className=`inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-all`

className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"

 className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"

 className="w-full flex items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"

  className="fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-(--card)/90 backdrop-blur-sm border border-(--card-border) text-foreground"

  className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white"
  className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"

  className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"

  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-white/10"

  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"

  className=`w-full flex items-center justify-center gap-2 py-3 rounded-xl
             bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold 
             transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 active:scale-95`
   className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"

    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-fg hover:text-foreground hover:bg-white/8 transition-colors"

   className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
