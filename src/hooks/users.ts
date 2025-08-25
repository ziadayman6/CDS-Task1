import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function useUsers(page: number, limit: number) {
  const users = useSelector((state: RootState) => state.users);
  const size = limit === 0 ? 10 : limit;

  const startIndex = (page - 1) * size;
  const endIndex = page * size;

  const paginatedData = users.slice(startIndex, endIndex);

  return {
    start: startIndex,
    limit: size,
    totalItems: paginatedData.length,
    totalPages: Math.ceil(users.length / limit),
    data: paginatedData,
  };
}
