import { useEffect } from "react";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
    twitterCard?: string;
    twitterSite?: string;
    locale?: string;
    canonicalUrl?: string | null;
    noindex?: boolean;
    nofollow?: boolean;
    structuredData?: Record<string, unknown> | null;
}

const SEO = ({
    title = "Groceries App - Smart Shopping List Manager",
    description = "Organize your grocery shopping with our smart shopping list app. Create, edit, and manage your groceries efficiently.",
    keywords = "groceries, shopping list, todo list, grocery app, shopping manager, food list",
    author = "Groceries App",
    image = "/groceries.webp",
    url = typeof window !== "undefined" ? window.location.href : "",
    type = "website",
    siteName = "Groceries App",
    twitterCard = "summary_large_image",
    twitterSite = "@groceriesapp",
    locale = "en_US",
    canonicalUrl = null,
    noindex = false,
    nofollow = false,
    structuredData = null,
}: SEOProps) => {
    useEffect(() => {
        // Default structured data
        const defaultStructuredData: Record<string, unknown> = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: siteName,
            description: description,
            url: url,
            applicationCategory: "ProductivityApplication",
            operatingSystem: "Any",
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
            },
        };

        // Update document title
        document.title = title;

        // Helper function to safely create absolute URLs
        const createAbsoluteUrl = (path: string) => {
            if (!path) return "";
            if (path.startsWith("http")) return path;
            if (typeof window !== "undefined") {
                try {
                    return new URL(path, window.location.origin).href;
                } catch {
                    console.warn("Invalid URL:", path);
                    return "";
                }
            }
            return path;
        };

        // Create or update meta tags
        const updateMetaTag = (
            property: string,
            content: string | undefined,
            isProperty = false,
        ) => {
            if (!content) return;

            const attribute = isProperty ? "property" : "name";
            const meta = document.querySelector(
                `meta[${attribute}="${property}"]`,
            );

            if (!meta) {
                const newMeta = document.createElement("meta");
                newMeta.setAttribute(attribute, property);
                newMeta.setAttribute("content", content);
                document.head.appendChild(newMeta);
            } else {
                meta.setAttribute("content", content);
            }
        };

        const updateLinkTag = (rel: string, href: string | undefined) => {
            if (!href) return;

            // Remove existing link tags of the same rel to avoid duplicates
            const existingLinks = document.querySelectorAll(
                `link[rel="${rel}"]`,
            );
            existingLinks.forEach((link) => link.remove());

            const link = document.createElement("link");
            link.setAttribute("rel", rel);
            link.setAttribute("href", href);
            document.head.appendChild(link);
        };

        // Basic meta tags
        updateMetaTag("description", description);
        updateMetaTag("keywords", keywords);
        updateMetaTag("author", author);
        updateMetaTag(
            "robots",
            `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`,
        );

        // Open Graph meta tags
        updateMetaTag("og:title", title, true);
        updateMetaTag("og:description", description, true);
        updateMetaTag("og:image", createAbsoluteUrl(image), true);
        updateMetaTag("og:url", url, true);
        updateMetaTag("og:type", type, true);
        updateMetaTag("og:site_name", siteName, true);
        updateMetaTag("og:locale", locale, true);

        // Twitter Card meta tags
        updateMetaTag("twitter:card", twitterCard);
        updateMetaTag("twitter:site", twitterSite);
        updateMetaTag("twitter:title", title);
        updateMetaTag("twitter:description", description);
        updateMetaTag("twitter:image", createAbsoluteUrl(image));

        // Additional SEO meta tags
        updateMetaTag("theme-color", "#000000");
        updateMetaTag("apple-mobile-web-app-capable", "yes");
        updateMetaTag("apple-mobile-web-app-status-bar-style", "default");
        updateMetaTag("apple-mobile-web-app-title", siteName);
        updateMetaTag("format-detection", "telephone=no");

        // Canonical URL
        const canonicalHref = canonicalUrl || url;
        updateLinkTag("canonical", canonicalHref);

        // Structured Data (JSON-LD)
        const finalStructuredData = structuredData || defaultStructuredData;
        if (finalStructuredData) {
            let script =
                document.querySelector<HTMLScriptElement>("#structured-data");
            if (!script) {
                script = document.createElement("script");
                script.id = "structured-data";
                script.type = "application/ld+json";
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify(finalStructuredData);
        }
    }, [
        title,
        description,
        keywords,
        author,
        image,
        url,
        type,
        siteName,
        twitterCard,
        twitterSite,
        locale,
        canonicalUrl,
        noindex,
        nofollow,
        structuredData,
    ]);

    return null;
};

export default SEO;
