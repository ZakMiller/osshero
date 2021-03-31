import { metric, Row, ScoreboardUser } from "../../../backend/src/shared/types";

export function getUser(row: Row, property: metric): ScoreboardUser {
  const score = row[property];
  return {
    name: row.name ?? row.login,
    score,
    login: row.login,
  };
}
