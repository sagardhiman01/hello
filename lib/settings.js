import { prisma } from './prisma';

export async function getSettings() {
  const defaults = {
    site_name: 'THE AURIKA',
    razorpay_key_id: '',
    razorpay_key_secret: '',
    razorpay_enabled: 'false',
    cod_enabled: 'true',
    payment_currency: 'INR',
  };

  try {
    const settingsRaw = await prisma.siteSettings.findMany();
    const result = { ...defaults };
    
    for (const s of settingsRaw) {
      result[s.key] = s.value;
    }
    
    return result;
  } catch (error) {
    console.error('getSettings Error:', error);
    return defaults;
  }
}

export async function getSetting(key, defaultValue = '') {
  try {
    const setting = await prisma.siteSettings.findUnique({
      where: { key },
    });
    return setting ? setting.value : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}
