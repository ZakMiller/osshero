import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { User } from "../types";

interface Props {
  users: User[];
  setUser: any;
}

export default function Leaderboard({ users, setUser }: Props) {
  const records = users.sort((a, b) => b.score - a.score);
  if (records.length === 0) return <div>loading...</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell key="position">Position</TableCell>
          <TableCell key="name">Name</TableCell>
          <TableCell key="score">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map((user, index) => (
          <TableRow key={user.name}>
            <TableCell key="position" component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell key="name">
              <Button onClick={() => setUser(user.login)}>{user.name}</Button>
            </TableCell>
            <TableCell key="score">{user.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
