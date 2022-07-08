
export interface Note{
  id: number;
  title: string;
  description: string;
  background: string;
  images: string[],
  isFavourite: boolean;
  isDelete: boolean;
  font: string;
  folderImage: string;
}
export const NoteInitialValues: Note = {
  id: 0,
  title: '',
  description: '',
  background: 'white',
  images: [],
  isFavourite: false,
  isDelete: false,
  font: 'Noto Sans',
  folderImage: ''
}
