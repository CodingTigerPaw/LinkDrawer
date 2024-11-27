export type List = {
  id: number;
  name: string;
  url: string;
  children: List[];
  parentId: number;
};
