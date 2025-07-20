import type { FormEvent } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface UnsubscribePageProps {
  email?: string;
  onUnsubscribe: (data: UnsubscribeData) => void;
  onCancel?: () => void;
}

interface UnsubscribeData {
  email: string;
  reason: string;
  feedback?: string;
}

const unsubscribeReasons = [
  '이메일을 너무 자주 받아요',
  '더 이상 관심이 없어요',
  '콘텐츠가 유용하지 않아요',
  '스팸으로 분류되었어요',
  '실수로 구독했어요',
  '기타'
];

export function UnsubscribePage({ email = '', onUnsubscribe, onCancel }: UnsubscribePageProps) {
  const [formData, setFormData] = useState({
    email,
    reason: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.reason) return;

    setIsSubmitting(true);
    
    try {
      await onUnsubscribe(formData);
      setShowConfirmation(true);
    } catch (error) {
      console.error('구독 취소 중 오류가 발생했습니다:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showConfirmation) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">구독이 취소되었습니다</h2>
            <p className="text-gray-600">
              {formData.email}에서 더 이상 이메일을 받지 않습니다.
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            언제든지 다시 구독하실 수 있습니다. 좋은 하루 되세요!
          </p>
          {onCancel && (
            <button
              onClick={onCancel}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              홈으로 돌아가기
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">구독 취소</h1>
          <p className="text-gray-600">
            구독을 취소하시려는 이유를 알려주세요. 더 나은 서비스를 위해 소중한 의견을 반영하겠습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              이메일 주소
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="이메일을 입력해주세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              구독을 취소하시는 이유는 무엇인가요?
            </label>
            <div className="space-y-2">
              {unsubscribeReasons.map((reason) => (
                <label key={reason} className="flex items-center">
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={formData.reason === reason}
                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              추가 의견 (선택사항)
            </label>
            <textarea
              id="feedback"
              value={formData.feedback}
              onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="개선사항이나 의견을 자유롭게 남겨주세요"
            />
          </div>

          <div className="flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                취소
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !formData.email || !formData.reason}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '처리 중...' : '구독 취소'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}