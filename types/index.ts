// Centralized types for import (keeps things explicit for modules)
export type UserForNewsEmail = {
    id: string;
    email: string;
    name: string;
    country?: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
};

export type MarketNewsArticle = {
    id: number;
    headline: string;
    summary: string;
    source: string;
    url: string;
    datetime: number;
    category: string;
    related: string;
    image?: string;
};

export type RawNewsArticle = {
    id?: number;
    headline?: string;
    summary?: string;
    source?: string;
    url?: string;
    datetime?: number;
    category?: string;
    related?: string;
    image?: string;
};

export default {};
