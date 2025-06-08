"use client";

import React, { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { SEO_CONFIG } from '@/constants/seo';

declare global {
  interface Window {
    ym: (counterId: number, eventName: string, ...args: any[]) => void;
  }
}

export const YandexMetrika = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const metrikaId = SEO_CONFIG.analytics.yandexMetrikaId;

  // Отслеживаем изменение страницы и отправляем хит в Метрику
  useEffect(() => {
    if (window.ym && metrikaId) {
      window.ym(Number(metrikaId), 'hit', window.location.href);
    }
  }, [metrikaId, pathname, searchParams]);

  if (!metrikaId || metrikaId === '00000000') {
    return null;
  }

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${metrikaId}, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img 
            src={`https://mc.yandex.ru/watch/${metrikaId}`} 
            style={{ position: 'absolute', left: '-9999px' }} 
            alt="" 
          />
        </div>
      </noscript>
    </>
  );
}; 