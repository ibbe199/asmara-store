import React from 'react';
import { useAsmaraAgent } from '../context/AgentContext';
import { motion } from 'motion/react';
import { Bot, Loader2 } from 'lucide-react';

const AddAdPage = () => {
  const { processNewAdWithAgent, agentStatus } = useAsmaraAgent();

  const handlePublish = async (myData: any) => {
    try {
      const result = await processNewAdWithAgent(myData);
      if (result && result.status !== 'rejected') {
        alert("العميل الذكي: تم النشر والمشاركة بنجاح! | ተዓዊቱ!");
      } else if (result && result.status === 'rejected') {
        alert(`تم الرفض: ${result.reason}`);
      }
    } catch (error) {
      console.error("Publish error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-[#1A5F7A] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Bot size={40} className="text-white" />
        </div>
        
        <h1 className="text-2xl font-black text-[#1A5F7A] mb-4">اختبار العميل الذكي</h1>
        <p className="text-gray-500 mb-8 text-sm">
          هذه الصفحة مخصصة لاختبار قدرة العميل الذكي على معالجة ونشر الإعلانات تلقائياً.
        </p>

        <div className="space-y-4">
          {agentStatus === 'processing' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-blue-50 p-4 rounded-2xl flex items-center justify-center gap-3 text-[#1A5F7A] font-bold"
            >
              <Loader2 className="animate-spin" size={20} />
              <p className="animate-pulse">العميل يعالج طلبك... 🤖</p>
            </motion.div>
          )}

          <button 
            onClick={() => handlePublish({
              user_id: 'test-user',
              title: 'سيارة تويوتا كورولا للبيع', 
              price: '500,000 ERN',
              category: 'cars',
              location: 'أسمرة',
              description: 'سيارة نظيفة جداً وبحالة ممتازة'
            })}
            disabled={agentStatus === 'processing'}
            className="w-full bg-[#1A5F7A] text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#144a5f] transition-all active:scale-95 disabled:opacity-50"
          >
            نشر إعلان تجريبي
          </button>
          
          <button 
            onClick={() => handlePublish({
              user_id: 'test-user',
              title: 'محتوى غير لائق للاختبار', 
              price: '0',
              category: 'all',
              location: 'أسمرة',
              description: 'هذا الإعلان يحتوي على كلمات ممنوعة لاختبار نظام الفحص'
            })}
            disabled={agentStatus === 'processing'}
            className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
          >
            اختبار الفحص (محتوى مرفوض)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdPage;
