import React, { useEffect } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { getAccessToken } from "../lib/api";

export default function Callback() {
  async function signIn(code: string) {
    const accessToken = await getAccessToken(code);
    console.log(accessToken);
  }
  const { search } = useLocation();
  const values = queryString.parse(search);
  const code = values.code;
  useEffect(() => {
    if (!code || Array.isArray(code)) return;
    signIn(code);
  }, [code]);

  return <div></div>;
}
