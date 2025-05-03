import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from './useAuth';

interface LINELoginConfig {
  channelId: string;
  universalLink?: string;
}

export const useLINE = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeLINE = async () => {
    if (Platform.OS === 'web') {
      try {
        const liff = (await import('@line/liff')).default;
        await liff.init({
          liffId: process.env.EXPO_PUBLIC_LINE_LIFF_ID!
        });
      } catch (err) {
        console.error('LIFF initialization failed:', err);
      }
    }
  };

  useEffect(() => {
    initializeLINE();
  }, []);

  const handleLINELogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (Platform.OS === 'web') {
        const liff = (await import('@line/liff')).default;
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const accessToken = liff.getAccessToken();
        if (!accessToken) throw new Error('Failed to get access token');

        await login(accessToken);
      } else {
        // For mobile platforms, use OAuth flow with WebBrowser
        const result = await WebBrowser.openAuthSessionAsync(
          `${process.env.EXPO_PUBLIC_API_URL}/api/auth/line`,
          process.env.EXPO_PUBLIC_LINE_CALLBACK_URL!
        );

        if (result.type === 'success') {
          const params = new URLSearchParams(result.url);
          const accessToken = params.get('access_token');
          if (!accessToken) throw new Error('Failed to get access token');

          await login(accessToken);
        }
      }
    } catch (err) {
      console.error('LINE login error:', err);
      setError('Failed to login with LINE');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLINELogin,
    isLoading,
    error
  };
};