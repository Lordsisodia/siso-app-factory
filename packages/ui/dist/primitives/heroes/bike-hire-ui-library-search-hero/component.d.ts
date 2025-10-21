import React from 'react';
export interface SearchHeroProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    badge?: string;
    heading: string;
    description?: string;
    backgroundImage?: string;
    placeholder?: string;
    showCurvedBottom?: boolean;
    backgroundColor?: string;
    className?: string;
}
export declare const SearchHero: React.FC<SearchHeroProps>;
export default SearchHero;
//# sourceMappingURL=component.d.ts.map