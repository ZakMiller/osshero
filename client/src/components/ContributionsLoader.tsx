import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Box } from "@material-ui/core";
export default function ContributionsLoader() {
  const cardSkeleton = () => (
    <Box p={1} >
      <Skeleton variant="rect" width={400} height={170} />
    </Box>
  );
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box p={2}>
          <Skeleton variant="circle" width={55} height={55} />
        </Box>
        <Skeleton variant="rect" width={300} height={40} />
      </Box>
      <Box p={2}>
        <Skeleton variant="rect" width={200} height={30} />
      </Box>
      {cardSkeleton()}
      {cardSkeleton()}
      {cardSkeleton()}
    </Box>
  );
}
