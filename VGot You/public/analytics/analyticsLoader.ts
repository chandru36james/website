declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function loadAnalytics() {
  // Prevent double loading
  if (document.getElementById("ga-script")) return;

  /* Google Analytics */
  const gaScript = document.createElement("script");
  gaScript.id = "ga-script";
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XRBQTY2DLC";
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }

  gtag("js", new Date());
  gtag("config", "G-XRBQTY2DLC", {
    anonymize_ip: true,
  });

  /* Microsoft Clarity */
  const clarityScript = document.createElement("script");
  clarityScript.id = "clarity-script";
  clarityScript.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "tiybrh7g7z");
  `;
  document.head.appendChild(clarityScript);
}
