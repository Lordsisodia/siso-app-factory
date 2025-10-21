import { FC } from "react";
interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    loading?: boolean;
}
declare const PaginationControls: FC<PaginationControlsProps>;
export default PaginationControls;
//# sourceMappingURL=component.d.ts.map