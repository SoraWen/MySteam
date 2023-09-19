// pages/api/steamProxy.ts
//測試用

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NEXT_PUBLIC_STEAM_WEB_API_KEY;
  const appids = req.query.appids;

  try {
    const response = await axios.get(
      `http://store.steampowered.com/api/appdetails` //${appids}`//?key=${apiKey}`
    );
    console.log("123"), res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || {});
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
}
