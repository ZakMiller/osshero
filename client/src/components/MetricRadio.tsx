import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";
import { metric } from "../types";

interface Props {
  metric: metric;
  setMetric: React.Dispatch<React.SetStateAction<metric>>;
}
export default function MetricRadio({ metric, setMetric }: Props) {
  function handleChange(_: React.ChangeEvent<HTMLInputElement>, value: string) {
    const metric = value as metric;
    setMetric(metric);
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Metric</FormLabel>
      <RadioGroup
        aria-label="metric"
        name="metric"
        value={metric}
        onChange={handleChange}
        color="primary"
      >
        <FormControlLabel value="commits" control={<Radio />} label="Commits" />
        <FormControlLabel
          value="createdRepositories"
          control={<Radio />}
          label="Created Repositories"
        />
        <FormControlLabel
          value="pullRequests"
          control={<Radio />}
          label="Pull Requests"
        />
        <FormControlLabel
          value="pullRequestReviews"
          control={<Radio />}
          label="Pull Requests Reviewed"
        />
        <FormControlLabel
          value="issuesCreated"
          control={<Radio />}
          label="Issues Created"
        />
      </RadioGroup>
    </FormControl>
  );
}
