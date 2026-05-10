import React, { createContext, useContext, useState } from 'react';
import { AsmaraAgent } from '../lib/asmaraAgent';
import { supabase } from '../lib/supabase';

type AgentStatus = 'idle' | 'processing' | 'success' | 'error';

interface AgentContextType {
  agentStatus: AgentStatus;
  processNewAdWithAgent: (adData: any) => Promise<any>;
  generateAIImage: (keywords: string) => Promise<string | null>;
  trackOrder: (orderId: string, callback: (payload: any) => void) => any;
  checkSubscriptionStatus: (user: any) => any;
  setAgentStatus: (status: AgentStatus) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('idle');

  const checkSubscriptionStatus = (user: any) => {
    return AsmaraAgent.checkSubscriptionStatus(user);
  };

  const generateAIImage = async (keywords: string) => {
    return await AsmaraAgent.generateImage(keywords);
  };

  // 1. وظيفة الـ Agent لربط "إعلان جديد" وعمل "Share" تلقائي مع فحص الذكاء الاصطناعي
  const processNewAdWithAgent = async (adData: any) => {
    setAgentStatus('processing');
    try {
      const result = await AsmaraAgent.processNewAd(adData);
      
      if (result.status === 'rejected') {
        setAgentStatus('error');
        return result;
      }

      setAgentStatus('success');
      return result;
    } catch (err: any) {
      setAgentStatus('error');
      console.error("Agent Error:", err.message);
      throw err;
    }
  };

  // 2. وظيفة الـ Agent لتتبع حالة طلبات المغتربين (Real-time)
  const trackOrder = (orderId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`track-${orderId}`)
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => {
          console.log("Agent: تحديث جديد في حالة الطلب!");
          callback(payload.new);
        }
      )
      .subscribe();
  };

  return (
    <AgentContext.Provider value={{ agentStatus, processNewAdWithAgent, generateAIImage, trackOrder, checkSubscriptionStatus, setAgentStatus }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAsmaraAgent = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAsmaraAgent must be used within an AgentProvider');
  }
  return context;
};
