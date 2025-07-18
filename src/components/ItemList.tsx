import type { ListItem as ListItemType } from "../types";
import { ListItem } from "./ListItem";

interface ItemListProps {
  items: ListItemType[];
  onItemClick: (url: string) => void;
}

export function ItemList({ items, onItemClick }: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.slice().reverse().map((item) => (
        <ListItem key={item.url} item={item} onClick={onItemClick} />
      ))}
    </div>
  );
}
