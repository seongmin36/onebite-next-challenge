import { NextApiRequest, NextApiResponse } from "next";

// ISR Revalidate (특정 데이터가 업데이트 될 때만 api를 불러오는 정적 페이지를 유지)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate(`/`);
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("Revalidation Failed");
    console.error(err);
  }
}
