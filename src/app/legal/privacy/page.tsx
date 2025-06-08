"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PrivacyRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/legal/terms');
  }, [router]);
  
  return (
    <div className="pt-32 pb-20 flex items-center justify-center">
      <p className="text-dark-100">Перенаправление...</p>
    </div>
  );
} 