import { useState, useEffect, useCallback } from 'react';
import { settingsRepository } from '../database/repositories/SettingsRepository';
import { UserSettings } from '../database/models/UserSettings';

export const useSettings = (userId: string) => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadSettings = useCallback(() => {
    try {
      setLoading(true);
      const loadedSettings = settingsRepository.getOrCreate(userId);
      setSettings(loadedSettings);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load settings'));
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadSettings();
    }
  }, [userId, loadSettings]);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    try {
      const updated = settingsRepository.update(userId, updates);
      setSettings(updated);
      return updated;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update settings');
      setError(error);
      throw error;
    }
  }, [userId]);

  return {
    settings,
    loading,
    error,
    updateSettings,
    refresh: loadSettings,
  };
};

