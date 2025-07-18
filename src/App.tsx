import { useState, useEffect } from "react";
import { ItemList } from "./components/ItemList";
import { FloatingSubscribeButton } from "./components/FloatingSubscribeButton";
import { BottomSheet } from "./components/BottomSheet";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { fetchMetadata } from "./services/api";
import { ListItem } from "./types";

function App() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        setLoading(true);
        const data = await fetchMetadata();
        setItems(data);
        setError(null);
      } catch (err) {
        setError("Failed to load metadata");
        console.error("Error loading metadata:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMetadata();
  }, []);

  const handleItemClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleSubscribeClick = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All about AI for developers
          </h1>
          <p className="text-gray-600">
            최신 AI 개발 트렌드와 기술을 확인해보세요
          </p>
        </header>

        <main>
          {loading && <LoadingSpinner size="lg" className="py-12" />}
          {error && <div className="text-center text-red-600">{error}</div>}
          {!loading && !error && (
            <ItemList items={items} onItemClick={handleItemClick} />
          )}
        </main>
      </div>

      <FloatingSubscribeButton onClick={handleSubscribeClick} />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />
    </div>
  );
}

export default App;
