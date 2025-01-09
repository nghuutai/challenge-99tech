export type PaginationPresentOptions = {
  total: number;
  perPage: number;
  currentPage: number;
}

export const presentPagination = ({ total, perPage, currentPage }: PaginationPresentOptions) => {
  return {
    total,
    perPage,
    currentPage,
  };
};
