import * as React from "react";
import { Cascader, type CascaderOption } from "@/components/ui/cascader";

const REGION_OPTIONS: CascaderOption[] = [
  {
    value: "americas",
    label: "Americas",
    children: [
      {
        value: "usa",
        label: "United States",
        children: [
          { value: "san-francisco", label: "San Francisco" },
          { value: "new-york", label: "New York" },
          { value: "seattle", label: "Seattle" },
        ],
      },
      {
        value: "canada",
        label: "Canada",
        children: [
          { value: "toronto", label: "Toronto" },
          { value: "vancouver", label: "Vancouver" },
        ],
      },
    ],
  },
  {
    value: "asia",
    label: "Asia Pacific",
    children: [
      {
        value: "japan",
        label: "Japan",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
      {
        value: "singapore",
        label: "Singapore",
        children: [{ value: "central", label: "Central Area" }],
      },
    ],
  },
  {
    value: "europe",
    label: "Europe",
    children: [
      {
        value: "uk",
        label: "United Kingdom",
        children: [{ value: "london", label: "London" }],
      },
      {
        value: "germany",
        label: "Germany",
        children: [{ value: "berlin", label: "Berlin" }],
      },
    ],
  },
];

export default function CascaderExample() {
  const [val, setVal] = React.useState<string[]>(["americas", "usa", "san-francisco"]);

  return (
    <div className="w-full max-w-sm p-4 flex flex-col gap-2">
      <label className="text-xs font-semibold text-foreground">Select Region & City</label>
      <Cascader
        options={REGION_OPTIONS}
        value={val}
        onChange={(next) => setVal(next)}
        placeholder="Select destination..."
      />
    </div>
  );
}
