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
    [key: string]: any;
  }
  interface Line {
    base?: Selection<SVGPathElement, any, null, undefined>;
    data?: {
      date: number;
      count: number;
    }[];
    color: string;
    style?: {
      strokeWidth?: number;
      opacity?: number;
    };
  }
  type ValueType = (value: number, element: HTMLElement) => string;
  type Charts<T> = keyof {
    [key in keyof T]: T[key] extends Chart ? T[key] : never;
  };

  var statical: EventTarget;

  var dates: number[];
  var DPMS: number;
  var index: number;
  var pastIndex: number;
  var charts: {
    startIndex?: number;
    interval?: number;
    limit?: number;
  } & Record<string, Chart>;
  var valueTypes: Record<string, ValueType>;

  /**
   * Smoothly animate a value from `start` to `end`
   * @param {string | HTMLElement} element The element to animate the text of
   * @param {number} start The starting value
   * @param {number} end The ending value
   * @param {Object} options
   * @param {string} options.type The type of value to animate
   * @param {string} options.prefix The prefix to add to the value
   * @param {string} options.suffix The suffix to add to the value
   * @param {number} options.duration The duration of the animation in milliseconds
   */
  function animateValue(
    element: string | HTMLElement,
    start: number,
    end: number,
    options?: {
      type?: keyof typeof valueTypes;
      prefix?: string;
      suffix?: string;
      duration?: number;
    }
  ): void;

  /**
   * Abbreviate a number to a shorter string
   * @example abbreviate(123456789) => "123M"
   * @param {string} count The number to abbreviate
   * @param {number?} digits The number of digits to keep
   * @returns {string} The abbreviated string
   */
  function abbreviate(count: number, digits?: number): string;

  /**
   * Updates a chart's lines and avatars
   * @param {string} chart The chart to update
   * @param {number | number[]} newCounts The new counts to add to the chart
   */
  function updateChart(
    chart: Charts<typeof charts>,
    newCounts: number | number[],
    update?: (chart: Charts<typeof charts>, index: number) => void
  ): void;

  /**
   * Calculate a bar's width
   * @param {number} count This bar's count
   * @param {number} firstCount The first bar's count
   * @param {number} maxWidth The maximum width of the bar
   * @returns {number} The width of the bar
   */
  function calculateBarWidth(
    count: number,
    firstCount: number,
    maxWidth: number
  ): number;

  /**
   * Get the `textContent` of an element
   * @param {string | HTMLElement} element The element to get the `textContent` of
   * @returns {string} The text content of the element
   */
  function getText(element: string | HTMLElement): string;

  /**
   * Change the `textContent` of an element
   * @param {string | HTMLElement} element The element to change the `textContent` of
   * @param {string} text The new text content
   */
  function changeText(element: string | HTMLElement, text: string): void;

  function update(): void;
  function animateCharts(): void;
}
