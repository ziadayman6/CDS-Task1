import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function useBusinesses(page: number, limit = 5) {
  const data = useSelector((state: RootState) => state.business);

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

