export interface Annotation {
  id: string;
  book_id: string;
  user_id: string;
  type: 'highlight' | 'mark' | 'note';
  cfi_range: string;
  selected_text?: string;
  color?: string;
  note_text?: string;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
}

export interface AnnotationRow {
  id: string;
  book_id: string;
  user_id: string;
  type: string;
  cfi_range: string;
  selected_text: string | null;
  color: string | null;
  note_text: string | null;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
}

export const mapRowToAnnotation = (row: AnnotationRow): Annotation => ({
  id: row.id,
  book_id: row.book_id,
  user_id: row.user_id,
  type: row.type as Annotation['type'],
  cfi_range: row.cfi_range,
  selected_text: row.selected_text || undefined,
  color: row.color || undefined,
  note_text: row.note_text || undefined,
  created_at: row.created_at,
  updated_at: row.updated_at,
  deleted_at: row.deleted_at || undefined,
});

