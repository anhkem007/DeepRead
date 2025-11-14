import { useState, useEffect, useCallback } from 'react';
import { annotationRepository } from '../database/repositories/AnnotationRepository';
import { Annotation } from '../database/models/Annotation';

export const useAnnotations = (bookId: string, userId: string) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadAnnotations = useCallback(async () => {
    try {
      setLoading(true);
      const loadedAnnotations = await annotationRepository.findByBookId(bookId);
      setAnnotations(loadedAnnotations);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load annotations'));
      console.error('Error loading annotations:', err);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    if (bookId) {
      loadAnnotations();
    }
  }, [bookId, loadAnnotations]);

  const addAnnotation = useCallback(async (annotationData: Omit<Annotation, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newAnnotation = await annotationRepository.create(annotationData);
      setAnnotations((prev) => [newAnnotation, ...prev]);
      return newAnnotation;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to add annotation');
      setError(error);
      throw error;
    }
  }, []);

  const updateAnnotation = useCallback(async (id: string, updates: Partial<Annotation>) => {
    try {
      const updated = await annotationRepository.update(id, updates);
      setAnnotations((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update annotation');
      setError(error);
      throw error;
    }
  }, []);

  const deleteAnnotation = useCallback(async (id: string) => {
    try {
      await annotationRepository.delete(id);
      setAnnotations((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete annotation');
      setError(error);
      throw error;
    }
  }, []);

  return {
    annotations,
    loading,
    error,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    refresh: loadAnnotations,
  };
};

