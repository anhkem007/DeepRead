import { useState, useEffect, useCallback } from 'react';
import { bookRepository } from '../database/repositories/BookRepository';
import { Book } from '../database/models/Book';

export const useBooks = (userId: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadBooks = useCallback(() => {
    try {
      setLoading(true);
      const loadedBooks = bookRepository.findByUserId(userId);
      setBooks(loadedBooks);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load books'));
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadBooks();
    }
  }, [userId, loadBooks]);

  const addBook = useCallback((bookData: Omit<Book, 'id' | 'added_at' | 'updated_at'>) => {
    try {
      const newBook = bookRepository.create(bookData);
      setBooks((prev) => [newBook, ...prev]);
      return newBook;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to add book');
      setError(error);
      throw error;
    }
  }, []);

  const updateBook = useCallback((id: string, updates: Partial<Book>) => {
    try {
      const updated = bookRepository.update(id, updates);
      setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
      return updated;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update book');
      setError(error);
      throw error;
    }
  }, []);

  const deleteBook = useCallback((id: string) => {
    try {
      bookRepository.delete(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete book');
      setError(error);
      throw error;
    }
  }, []);

  const updateProgress = useCallback((id: string, progress: number, lastCfi?: string) => {
    try {
      bookRepository.updateProgress(id, progress, lastCfi);
      setBooks((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, progress, last_cfi: lastCfi, last_read_at: Math.floor(Date.now() / 1000) }
            : b
        )
      );
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update progress');
      setError(error);
      throw error;
    }
  }, []);

  return {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    updateProgress,
    refresh: loadBooks,
  };
};

