import * as d3 from "d3";
import { primaryColors } from "./colors";

// Lesson pink
// Reviews blue

/**
 * @param x - given d in data, returns the (temporal) x-value
 * @param y - given d in data, returns the (quantitative) y-value
 * @param title - given d in data, returns the title text
 * @param width - width of the chart, in pixels
 * @param cellSize - width and height of an individual day, in pixels
 * @param weekday - either: weekday, sunday, or monday
 * @param formatDay - given a day number in [0, 6], the day-of-week label
 * @param formatMonth - format specifier string for months (above the chart)
 * @param yFormat - format specifier string for values (in the title)
 * @param colors -
 */
interface CalendarOptions {
  x?: ([]: [Date, number]) => Date;
  y?: ([]: [Date, number]) => number;
  tooltip?: (i: number) => string;
  width?: number;
  cellSize?: number;
  weekday?: string;
  formatDay?: (i: number) => string;
  formatMonth?: string | ((date: Date) => string);
  yFormat?: string;
  colors?: (i: number) => string;
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/calendar-view
// TODO: Refactor more,
/**
 *
 * @param {[number, number]} data -
 * @param {CalendarOptions} options -
 *
 */
export function Calendar(
  data: Iterable<[Date, number]>,
  {
    x = ([x]) => x,
    y = ([, y]) => y,
    tooltip,
    width = 928,
    cellSize = 17,
    weekday = "monday",
    formatDay = (i) => "SMTWTFS"[i],
    formatMonth = "%b",
    yFormat,
    colors = d3.interpolateRgb("rgb(252, 228, 244)", "rgb(152, 0, 124)"),
  }: CalendarOptions
) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const I = d3.range(X.length);

  const countDay = (i: number) => i % 7;
  const timeWeek = weekday === "sunday" ? d3.utcSunday : d3.utcMonday;
  const weekDays = weekday === "weekday" ? 5 : 7;
  const height = cellSize * (weekDays + 2);

  // Compute a color scale. This assumes a diverging color scheme where the pivot
  // is zero, and we want symmetric difference around zero.
  const max = d3.quantile(Y, 0.9975, Math.abs);
  const color = d3
    .scaleSequential([max ? -max : 0, max ? +max : 0], colors)
    .unknown("none");

  // Construct formats.
  formatMonth = d3.utcFormat(formatMonth as string);

  // Compute titles.
  if (tooltip === undefined) {
    const formatDate = d3.utcFormat("%B %-d, %Y");
    const formatValue = d3.tickFormat(0, 100, X.length, yFormat);
    tooltip = (i) => `${formatDate(X[i])}\n${formatValue(Y[i])}`;
  } else if (tooltip !== null) {
    const T = d3.map(I, tooltip);
    tooltip = (i) => T[i];
  }

  // Group the index by year, in reverse input order. (Assuming that the input is
  // chronological, this will show years in reverse chronological order.)
  const years = d3.groups(I, (i) => X[i].getUTCFullYear()).reverse();

  function pathMonth(t: Date) {
    const d = Math.max(0, Math.min(weekDays, countDay(t.getUTCDay())));
    const w = timeWeek.count(d3.utcYear(t), t);
    return `${
      d === 0
        ? `M${w * cellSize},0`
        : d === weekDays
        ? `M${(w + 1) * cellSize},0`
        : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`
    }V${weekDays * cellSize}`;
  }

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height * years.length)
    .attr("viewBox", [0, 0, width, height * years.length])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10);

  const year = svg
    .selectAll("g")
    .data(years)
    .join("g")
    .attr(
      "transform",
      (d, i) => `translate(40.5,${height * i + cellSize * 1.5})`
    );

  year
    .append("text")
    .attr("x", -5)
    .attr("y", -5)
    .attr("font-weight", "bold")
    .attr("text-anchor", "end")
    .text(([key]) => key);

  year
    .append("g")
    .attr("text-anchor", "end")
    .selectAll("text")
    .data(weekday === "weekday" ? d3.range(1, 6) : d3.range(7))
    .join("text")
    .attr("x", -5)
    .attr("y", (i) => (countDay(i) + 0.5) * cellSize)
    .attr("dy", "0.31em")
    .text(formatDay);

  const cell = year
    .append("g")
    .selectAll("rect")
    .data(
      weekday === "weekday"
        ? ([, I]) => I.filter((i) => ![0, 6].includes(X[i].getUTCDay()))
        : ([, I]) => I
    )
    .join("rect")
    .attr("width", cellSize - 1)
    .attr("height", cellSize - 1)
    .attr("x", (i) => timeWeek.count(d3.utcYear(X[i]), X[i]) * cellSize + 0.5)
    .attr("y", (i) => countDay(X[i].getUTCDay()) * cellSize + 0.5)
    .attr("fill", (i) => color(Y[i]));

  if (tooltip) cell.append("title").text(tooltip);

  const month = year
    .append("g")
    .selectAll("g")
    .data(([, I]) => d3.utcMonths(d3.utcMonth(X[I[0]]), X[I[I.length - 1]]))
    .join("g");

  month
    .filter((d, i) => i !== 0)
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("d", pathMonth);

  month
    .append("text")
    .attr(
      "x",
      (d) => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2
    )
    .attr("y", -5)
    .text(formatMonth);

  return svg.node();
}
