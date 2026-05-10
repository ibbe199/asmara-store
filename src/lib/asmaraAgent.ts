import { GoogleGenAI, Type } from "@google/genai";
import { supabase } from "./supabase";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AsmaraAgent = {
  name: "Asmara Store Agent",

  async checkContentWithAI(text: string): Promise<{ allowed: boolean; reason?: string }> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `فحص المحتوى التالي للتأكد من أنه مناسب للنشر في سوق إلكتروني (أسمرة ستور). 
        يجب أن يكون المحتوى خالياً من العنف، الكراهية، الاحتيال، أو أي محتوى غير قانوني.
        المحتوى: "${text}"
        
        رد بصيغة JSON فقط:
        {
          "allowed": boolean,
          "reason": "سبب الرفض بالعربية والتغرينية إذا كان غير مسموح"
        }`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              allowed: { type: Type.BOOLEAN },
              reason: { type: Type.STRING }
            },
            required: ["allowed"]
          }
        }
      });

      const textResponse = response.text || '{"allowed": true}';
      const result = JSON.parse(textResponse);
      return result;
    } catch (error) {
      console.error("AI Moderation Error:", error);
      return { allowed: true }; // Default to allow if AI fails to avoid blocking users
    }
  },

  async generateImage(keywords: string): Promise<string | null> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [
            {
              text: `Generate a high-quality, realistic, and commercially appealing image for an advertisement. 
              The item is related to these keywords: ${keywords}. 
              The context is the Asmara Store in Eritrea. 
              The image should be centered, well-lit, and professional. 
              Do not include any text or watermarks in the image.`,
            },
          ],
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
      return null;
    } catch (error) {
      console.error("AI Image Generation Error:", error);
      return null;
    }
  },

  async saveToDatabase(adData: any) {
    const { data, error } = await supabase
      .from('ads')
      .insert([adData])
      .select()
      .single();

    if (error) {
      console.error("Database Save Error:", error);
      throw error;
    }
    return data;
  },

  async processNewAd(adData: any) {
    console.log("العميل الذكي يقوم بفحص الإعلان...");
    
    const moderation = await this.checkContentWithAI(`${adData.title} ${adData.description}`);
    
    if (!moderation.allowed) {
      return { 
        status: "rejected", 
        reason: moderation.reason || "المحتوى يخالف قوانين المجتمع | ትሕዝቶ ምስ ሕጊ ኣይሰማማዕን" 
      };
    }

    const savedAd = await this.saveToDatabase(adData);

    if (savedAd) {
      this.autoShare(savedAd);
    }

    return { status: "approved", data: savedAd };
  },

  autoShare(ad: any) {
    const shareText = `
🇪🇷 إعلان جديد في سوق أسمرة:
🏠 ${ad.title}
💰 السعر: ${ad.price}
📍 الموقع: ${ad.location}
🔗 الرابط: asmarastore.com/ad/${ad.id}
    `;

    console.log("العميل ينشر الإعلان في قنوات تيليجرام وواتساب...");
    console.log("Share Text:", shareText);
    // Here you would typically call external APIs for Telegram, WhatsApp, or Facebook
  },

  checkSubscriptionStatus(user: any) {
    if (!user || !user.created_at) return { status: "IDLE", daysLeft: 0 };
    
    const joinDate = new Date(user.created_at);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) {
      return { status: "FREE_MONTH", daysLeft: 30 - diffDays };
    } else {
      return { status: "EXPIRED", message: "يرجى اختيار باقة للاستمرار | በጃኹም ሓደ ፓኬጅ ምረጹ" };
    }
  }
};
