# Create React Component

Create a new React component following the project's TypeScript and Tailwind CSS conventions.

Template for creating components:
1. Use TypeScript with proper type definitions
2. Use Tailwind CSS for styling
3. Follow the existing component structure in src/components/
4. Import types explicitly with `import type` syntax
5. Use functional components with proper props interface

Example component structure:
```typescript
import type { ReactNode } from 'react';

interface ComponentProps {
  children?: ReactNode;
  className?: string;
}

export default function Component({ children, className = '' }: ComponentProps) {
  return (
    <div className={`base-styles ${className}`}>
      {children}
    </div>
  );
}
```