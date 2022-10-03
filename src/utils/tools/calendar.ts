import * as d3 from "d3";

/**
 * @param cellSize - width and height of an individual day, in pixels
 * @param colors -
 */
interface CalendarOptions {
  colors: (i: number) => string;
  cellSize?: number;
}

// TODO: Refactor.
/**
 *
 */
export function Calendar(
  data: Iterable<[Date, number]>,
  { colors, cellSize = 17 }: CalendarOptions
) {
  // Compute values.
  const X = d3.map(data, ([x]) => x);
  const Y = d3.map(data, ([, y]) => y);
  const I = d3.range(X.length);

  const countDay = (i: number) => i % 7;
  const timeWeek = d3.utcSunday;
  const weekDays = 7;
  const height = cellSize * (weekDays + 2);
  const width = cellSize * 57;

  // Compute a color scale. This assumes a diverging color scheme where the pivot
  // is zero, and we want symmetric difference around zero.
  const max = d3.quantile(Y, 1, Math.abs);
  const color = d3
    .scaleSequential([max ? -max : 0, max ? +max : 0], colors)
    .unknown("none");

  // Construct formats.
  const formatMonth = d3.utcFormat("%b");
  const formatDay = (i: number) => "SMTWTFS"[i];

  // Compute titles.
  const formatDate = d3.utcFormat("%B %-d, %Y");
  const formatValue = d3.tickFormat(0, 100, 1);
  const tooltip = (i: number) => `${formatDate(X[i])}\n${formatValue(Y[i])}`;

  // Group the index by year, in reverse input order. (Assuming that the input is
  // chronological, this will show years in reverse chronological order.)
  const years = d3.groups(I, (i) => X[i].getUTCFullYear()).reverse();

  let switchPoint: number;
  let days = 0;
  let lastYear = X[I[0]].getUTCFullYear();
  I.reverse().forEach((i) => {
    if (X[i].getUTCFullYear() === lastYear) {
      days++;
    } else {
      switchPoint = i;
    }
  });

  // d3.utcYear(t)
  function pathMonth(t: Date) {
    const d = Math.max(0, Math.min(weekDays, countDay(t.getUTCDay())));
    const w = timeWeek.count(
      t.getUTCFullYear() === lastYear
        ? d3.utcMonth(X[I[I.length - 1]])
        : d3.utcMonth(X[switchPoint + 1]),
      t
    );
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
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10);

  const year = svg
    .selectAll("g")
    .data(years.reverse())
    .join("g")
    .attr(
      "transform",
      (d, i) =>
        `translate(${(i === 0 ? 40.5 : -11.5) + i * (365 - days)},${
          cellSize * 1.5
        })`
    );

  year
    .append("text")
    .attr("x", -5)
    .attr("y", -5)
    .attr("font-weight", "bold")
    .attr("text-anchor", "end")
    .text(([key]) => key);

  year
    .filter(([key]) => {
      return key === 2021;
    })
    .append("g")
    .attr("text-anchor", "end")
    .selectAll("text")
    .data(d3.range(7))
    .join("text")
    .attr("x", -5)
    .attr("y", (i) => (countDay(i) + 0.5) * cellSize)
    .attr("dy", "0.31em")
    .text(formatDay);

  const cell = year
    .append("g")
    .selectAll("rect")
    .data(([, I]) => I)
    .join("rect")
    .attr("width", cellSize - 3)
    .attr("height", cellSize - 3)
    .attr("rx", 3)
    .attr(
      "x",
      (i) =>
        timeWeek.count(
          i >= switchPoint
            ? X[switchPoint]
            : new Date(
                X[I[I.length - 1]].getFullYear(),
                X[I[I.length - 1]].getMonth(),
                1
              ),
          X[i]
        ) *
          cellSize +
        0.5
    )
    .attr("y", (i) => countDay(X[i].getUTCDay()) * cellSize + 0.5)
    .attr("fill", (i) => (Y[i] === 0 ? "#e5e7eb" : color(Y[i])));

  cell.append("title").text(tooltip);

  const month = year
    .append("g")
    .selectAll("g")
    .data(([, I]) => d3.utcMonths(d3.utcMonth(X[I[0]]), X[I[I.length - 1]]))
    .join("g");

  month
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr("d", pathMonth);

  month
    .append("text")
    .attr(
      "x",
      (d) =>
        timeWeek.count(
          d.getUTCFullYear() === lastYear
            ? d3.utcMonth(X[I[I.length - 1]])
            : d3.utcMonth(X[switchPoint + 1]),
          d
        ) *
          cellSize +
        2
    )
    .attr("y", -5)
    .text(formatMonth);

  return svg.node();
}
