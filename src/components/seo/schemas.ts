/**
 * Common structured data schemas for SEO
 * These can be imported and used with the SEO component
 */

// Organization schema for the app
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Groceries App",
    description: "Smart shopping list manager for organizing groceries",
    url: window.location?.origin || "",
    logo: `${window.location?.origin || ""}/groceries.webp`,
    sameAs: [] as string[],
};

// WebApplication schema
export const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Groceries App",
    description:
        "Smart shopping list manager for organizing groceries efficiently",
    url: window.location?.origin || "",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
};

// Breadcrumb schema generator
interface BreadcrumbItem {
    name: string;
    url: string;
}

export const generateBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
});

// FAQ schema generator
interface FAQItem {
    question: string;
    answer: string;
}

export const generateFAQSchema = (faqs: FAQItem[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
});

// Article schema generator
interface Article {
    title: string;
    description: string;
    image?: string;
    author?: string;
    datePublished: string;
    dateModified?: string;
}

export const generateArticleSchema = (article: Article) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
        "@type": "Person",
        name: article.author || "Groceries App Team",
    },
    publisher: {
        "@type": "Organization",
        name: "Groceries App",
        logo: {
            "@type": "ImageObject",
            url: `${window.location?.origin || ""}/groceries.webp`,
        },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
});

// How-to schema generator
interface HowToStep {
    name: string;
    description: string;
    image?: string;
}

interface HowTo {
    name: string;
    description: string;
    image?: string;
    totalTime?: string;
    supplies?: string[];
    steps?: HowToStep[];
}

export const generateHowToSchema = (howTo: HowTo) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    totalTime: howTo.totalTime,
    supply:
        howTo.supplies?.map((supply) => ({
            "@type": "HowToSupply",
            name: supply,
        })) || [],
    step:
        howTo.steps?.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.description,
            image: step.image,
        })) || [],
});
