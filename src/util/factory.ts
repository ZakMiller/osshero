import { metric, Row, User } from "../types";

export function getUser(row: Row, property: metric): User {
  const score = row[property];
  return {
    name: row.name ?? row.login,
    score,
    login: row.login,
  };
}
