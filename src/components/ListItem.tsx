import type { ListItem as ListItemType } from "../types";

interface ListItemProps {
  item: ListItemType;
  onClick: (url: string) => void;
}

export function ListItem({ item, onClick }: ListItemProps) {
  return (
    <div
      onClick={() => onClick(item.url)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer p-4 border border-gray-200 hover:border-gray-300"
    >
      <div className="flex gap-4">
        {item.ogImage && (
          <img
            src={item.ogImage}
            alt={item.title}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {item.description ||
              item.ogDescription ||
              "No description available"}
          </p>
          <p className="text-xs text-gray-400 mt-1">{item.url}</p>
        </div>
      </div>
    </div>
  );
}
