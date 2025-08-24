import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function useActives(page: number, limit: number) {
  const data = useSelector((state: RootState) => state.active);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = data.slice(startIndex, endIndex);

  return {
    start: startIndex,
    limit,
    totalItems: paginatedData.length,
    totalPages: Math.ceil(data.length / limit),
    data: paginatedData,
  };
}
