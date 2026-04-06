import BalanceChart from "./BalanceChart";

const BalanceTrend = ({ monthly }:{ monthly: any[] }) => {
  return (
       <div className="grid grid-cols-4 items-center">
           <div className="lg:col-span-3 rounded-2xl surface border border-(--card-border) p-4">
             <div className="flex items-center justify-between mb-0">
               <div>
                 <h3 className="text-base font-semibold text-foreground">Balance Trend</h3>
                 <p className="text-xs text-muted-fg mt-0.5">Running balance over time</p>
               </div>
             </div>
             <div className="h-50 min-h-40 w-full">
               <BalanceChart data={monthly} />
             </div>
           </div>
         </div>
  );
};

export default BalanceTrend;