import { ScaleLinear } from "d3";
import { ScaleTime, Selection } from "d3";

declare global {
  interface Chart {
    chart?: Selection<SVGElement, any, null, undefined>;
    limit?: number;
    style: {
      width: number;
      height: number;
      marginTop?: number;
      marginBottom?: number;
      marginLeft?: number;
      marginRight?: number;
    };
    x?: {
      scale?: ScaleTime<number, number>;
      axis?: Selection<SVGGElement, any, null, undefined>;
      style?: {
        fontSize?: string;
        fontFamily?: string;
      };
    };
    y?: {
      scale?: ScaleLinear<number, number>;
      axis?: Selection<SVGGElement, any, null, undefined>;
      style?: {
        fontSize?: string;
        fontFamily?: string;
      };
    };
    lines: Line | Line[];
    avatars?: Avatar | Avatar[];
    avatarSize?: number;
  }
  interface Line {
    base?: Selection;
    color: string;
    style?: {
      strokeWidth?: number;
      opacity?: number;
    };
  }
  interface Avatar {
    base?: Selection;
    group?: Selection;
    type?: "circle" | "square";
    url: string;
  }
  type ValueType = (value: number, element: HTMLElement) => string;
  type Charts<T> = keyof {
    [key in keyof T]: T[key] extends Chart ? T[key] : never;
  };

  var index: number;
  var pastIndex: number;
  var charts: {
    startIndex?: number;
    interval?: number;
    limit?: number;
    [key: string]: Chart;
  };
  var valueTypes: Record<string, ValueType>;

  function animateValue(
    element: HTMLElement,
    start: number,
    end: number,
    options?: {
      type?: keyof typeof valueTypes;
      prefix?: string;
      suffix?: string;
      duration?: number;
    }
  ): void;
  function updateChart(
    chart: Charts<typeof charts>,
    newCounts: number | number[]
  ): void;
  function calculateBarWidth(
    count: number,
    firstCount: number,
    maxWidth: number
  ): number;
  function abbreviate(count: number, digits?: number): string;

  function getText(id: string): string;
  function changeText(id: string, value: string): void;

  function update(): void;
  function animateCharts(): void;
}
