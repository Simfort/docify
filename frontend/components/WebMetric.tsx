"use client";
import { useReportWebVitals } from "next/web-vitals";

export function WebMetric() {
  useReportWebVitals((metric) => {
    console.log(JSON.stringify(metric));
  });
  return null;
}
