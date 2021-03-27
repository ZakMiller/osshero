import { Card, CardContent, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { User } from "../types";

export default function LeaderboardLine({ user }: { user: User }) {
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
