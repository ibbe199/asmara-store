import React from 'react';
import { Bot, Cpu, Share2, ShieldCheck, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AgentStatusPanelProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  message?: string;
}

const AgentStatusPanel = ({ status, message }: AgentStatusPanelProps) => {
  if (status === 'idle') return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1A5F7A] text-white p-6 rounded-[2.5rem] shadow-xl border-4 border-white/10 overflow-hidden relative"
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E11C32] rounded-full blur-3xl opacity-20"></div>
      
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className={`p-3 rounded-2xl ${status === 'processing' ? 'bg-[#E11C32] animate-pulse' : status === 'success' ? 'bg-[#2D8B49]' : 'bg-red-600'}`}>
          <Bot size={24} />
        </div>
        <div>
          <h4 className="font-black text-sm uppercase tracking-tighter">Asmara Intelligence Agent</h4>
          <p className="text-[10px] text-blue-200">የኣስማራ ስቶር ወኪል • عميل أسمرة الذكي</p>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        {/* Step 1: Moderation */}
        <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
          status === 'processing' ? 'bg-white/10 border-white/5' : 
          status === 'success' ? 'bg-[#2D8B49]/20 border-[#2D8B49]/30' : 'bg-red-900/20 border-red-500/30'
        }`}>
          {status === 'processing' ? <Loader2 size={18} className="animate-spin text-blue-300" /> : 
           status === 'success' ? <ShieldCheck size={18} className="text-[#2D8B49]" /> : 
           <AlertCircle size={18} className="text-red-500" />}
          <span className="text-xs font-medium">
            {status === 'processing' ? 'جاري فحص المحتوى وتطبيق قوانين المجتمع...' : 
             status === 'success' ? 'تم فحص المحتوى بنجاح وتأكيد سلامته' : 'تم رفض المحتوى لمخالفته القوانين'}
          </span>
        </div>

        {/* Step 2: Sharing */}
        <motion.div 
          animate={{ opacity: status === 'success' ? 1 : 0.5 }}
          className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
            status === 'success' ? 'bg-[#12ADEB]/20 border-[#12ADEB]/30' : 'bg-white/5 border-white/5'
          }`}
        >
          <Share2 size={18} className={status === 'success' ? 'text-[#12ADEB]' : 'text-gray-400'} />
          <span className="text-xs font-medium">تجهيز روابط المشاركة الذكية لـ WhatsApp و Telegram...</span>
        </motion.div>
      </div>

      <div className="mt-6 flex justify-between items-center text-[9px] font-bold text-blue-200 uppercase relative z-10">
        <div className="flex items-center gap-2">
          {status === 'processing' && <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>}
          <span>Status: {status === 'processing' ? 'Processing' : status === 'success' ? 'Completed' : 'Failed'}</span>
        </div>
        <Cpu size={14} className={status === 'processing' ? 'animate-spin' : ''} />
      </div>

      {message && status === 'error' && (
        <div className="mt-4 p-3 bg-red-500/20 rounded-lg border border-red-500/30 text-[10px] font-bold text-red-100">
          {message}
        </div>
      )}
    </motion.div>
  );
};

export default AgentStatusPanel;
