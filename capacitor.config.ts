
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b0af1beebd584edba1f60d806c74f767',
  appName: 'citizen-id-sign',
  webDir: 'dist',
  server: {
    url: 'https://b0af1bee-bd58-4edb-a1f6-0d806c74f767.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera']
    }
  }
};

export default config;
