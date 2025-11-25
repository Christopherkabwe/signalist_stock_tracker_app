"use client";
import { useEffect, useRef } from "react";

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Prefer the existing inner widget node rendered by the component
        let widgetContainer = containerRef.current.querySelector('.tradingview-widget-container__widget') as HTMLDivElement | null;
        let createdContainer = false;
        if (!widgetContainer) {
            widgetContainer = document.createElement('div');
            widgetContainer.className = 'tradingview-widget-container__widget';
            containerRef.current.appendChild(widgetContainer);
            createdContainer = true;
        }
        widgetContainer.style.width = '100%';
        widgetContainer.style.height = `${height}px`;

        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.type = "text/javascript";
        scriptRef.current = script;

        try {
            // TradingView expects the configuration JSON to be the script's text content
            // when using their external-embedding scripts. Put the JSON into the script
            // innerHTML before appending so the external script can read it when executed.
            script.innerHTML = JSON.stringify(config);
            widgetContainer.appendChild(script);
        } catch (error) {
            console.error("Error loading TradingView script:", error);
        }

        return () => {
            if (scriptRef.current) {
                scriptRef.current.remove();
                scriptRef.current = null;
            }
            // Don't clear the entire container (React controls its children). If we created
            // a fallback container, remove it; otherwise just remove the appended script.
            if (createdContainer && widgetContainer && widgetContainer.parentNode) {
                widgetContainer.parentNode.removeChild(widgetContainer);
            }
        }
    }, [scriptUrl, config, height]);

    return containerRef;
}

export default useTradingViewWidget;