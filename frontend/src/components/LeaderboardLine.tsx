import { Card, CardContent, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { ScoreboardUser } from "../../../backend/src/shared/types";

export default function LeaderboardLine({ user }: { user: ScoreboardUser }) {
return (
    <TableRow key={user.name}>
        <TableCell component="th" scope="row">
            {user.name}
        </TableCell>
        <TableCell>
            {user.score}
        </TableCell>
    </TableRow>
)
}
