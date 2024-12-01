export type List = {
  id: number;
  name: string;
  url: string;
  isVisible: boolean;
  isEdited: boolean;
  children: List[];
  parentId: number | null;
};
