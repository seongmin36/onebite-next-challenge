import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next앱에서 발생하는 모든 데이터 패칭이 log로 발생
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
};

export default nextConfig;
