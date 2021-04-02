import { metric, Row, ScoreboardUser } from "../types";

export function getUser(row: Row, property: metric): ScoreboardUser {
  const score = row[property];
  return {
    name: row.name ?? row.login,
    score,
    login: row.login,
  };
}
