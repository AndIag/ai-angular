export interface LineChartValue<X, Y> {
  name: string;
  series: { name: X, value: Y }[];
}
