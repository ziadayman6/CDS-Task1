import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function useUsers(page: number, limit = 5) {
  const users = useSelector((state: RootState) => state.users);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = users.slice(startIndex, endIndex);

  return {
    start: startIndex,
    limit,
    totalItems: paginatedData.length,
    totalPages: Math.ceil(users.length / limit),
    data: paginatedData,
  };
}

