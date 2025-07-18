import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("이메일을 입력해주세요.");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/subscription/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage("구독이 완료되었습니다!");
      setEmail("");
      setTimeout(() => {
        onClose();
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("구독 API 호출 중 오류:", error);
      setMessage("구독 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-40"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Content */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    뉴스레터 구독
                  </h2>
                  <p className="text-gray-600">
                    최신 AI 개발 소식과 유용한 정보를 이메일로 받아보세요.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      이메일 주소
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      disabled={isLoading}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        구독 중...
                      </div>
                    ) : (
                      "구독하기"
                    )}
                  </motion.button>

                  {message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-sm text-center ${
                        message.includes("완료")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {message}
                    </motion.p>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
