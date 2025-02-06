export type List = {
  id: string;
  name: string;
  url: string;
  isVisible: boolean;
  isEdited: boolean;
  children: List[];
  parentId: string | null;
};
