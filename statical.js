var index = 0;
var pastIndex = index === 0 ? 0 : index - 1;

function getText(id) {
  return document
    .getElementById(id)
    .textContent.replaceAll(",", "")
    .replaceAll("+", "");
}

function updateChart(key, newCounts) {
  if (
    Array.isArray(charts[key].lines) &&
    Array.isArray(newCounts) &&
    newCounts.length === charts[key].lines.length
  ) {
    for (let i = 0; i < newCounts.length; i++) {
      charts[key].lines[i].data.push({
        date: parseFloat(getText("date-value")),
        count: parseFloat(newCounts[i]),
      });
      if (index - charts.startIndex > (charts[key].limit ?? charts.limit)) {
        charts[key].lines[i].data.shift();
      }
    }

    let axisValues = {
      xMin: Math.min(...charts[key].lines.map((c) => c.data[0].date)),
      xMax: Math.max(...charts[key].lines.map((c) => c.data.slice(-1)[0].date)),
      yMin: Math.min(
        ...charts[key].lines.map((c) => c.data.map((cc) => cc.count)).flat()
      ),
      yMax: Math.max(
        ...charts[key].lines.map((c) => c.data.map((cc) => cc.count)).flat()
      ),
    };

    charts[key].x.scale.domain([axisValues.xMin, axisValues.xMax]);
    charts[key].y.scale.domain([axisValues.yMin - 1, axisValues.yMax + 2]);

    charts[key].x.axis.call(d3.axisBottom(charts[key].x.scale).ticks(5));
    charts[key].y.axis.call(
      d3
        .axisLeft(charts[key].y.scale)
        .tickFormat((d) => {
          return abbreviate(d);
        })
        .ticks(5)
    );

    for (let i = 0; i < charts[key].lines.length; i++) {
      charts[key].lines[i].base
        .datum(charts[key].lines[i].data)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return charts[key].x.scale(d.date);
            })
            .y(function (d) {
              return charts[key].y.scale(d.count);
            })
            .curve(d3.curveMonotoneX)
        )
        .style("opacity", charts[key].lines[i].style?.opacity ?? 1);

      if (charts[key].avatars && charts[key].avatarSize) {
        charts[key].avatars[i].base.attr(
          "transform",
          "translate(" +
            (charts[key].style.width - 10) +
            "," +
            (charts[key].y.scale(charts[key].lines[i].data.slice(-1)[0].count) -
              10) +
            ")"
        );
      }
    }
  } else {
    charts[key].lines.data.push({
      date: parseFloat(getText("date-value")),
      count: parseFloat(newCounts),
    });
    if (index - charts.startIndex > (charts[key].limit ?? charts.limit)) {
      charts[key].lines.data.shift();
    }

    let axisValues = {
      xMin: Math.min(...charts[key].lines.data.map((c) => c.date)),
      xMax: Math.max(...charts[key].lines.data.map((c) => c.date)),
      yMin: Math.min(...charts[key].lines.data.map((c) => c.count)),
      yMax: Math.max(...charts[key].lines.data.map((c) => c.count)),
    };

    charts[key].x.scale.domain([axisValues.xMin, axisValues.xMax]);
    charts[key].y.scale.domain([axisValues.yMin - 1, axisValues.yMax + 2]);

    charts[key].x.axis.call(d3.axisBottom(charts[key].x.scale).ticks(5));
    charts[key].y.axis.call(
      d3
        .axisLeft(charts[key].y.scale)
        .tickFormat((d) => {
          return abbreviate(d);
        })
        .ticks(5)
    );

    let lineData = charts[key].lines.data;
    charts[key].lines.base
      .datum(lineData)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return charts[key].x.scale(d.date);
          })
          .y(function (d) {
            return charts[key].y.scale(d.count);
          })
          .curve(d3.curveMonotoneX)
      )
      .style("opacity", charts[key].lines.style?.opacity ?? 1);

    if (charts[key].avatars && charts[key].avatarSize) {
      charts[key].avatars.base.attr(
        "transform",
        "translate(" +
          (charts[key].style.width - 10) +
          "," +
          (charts[key].y.scale(charts[key].lines.data.slice(-1)[0].count) -
            10) +
          ")"
      );
    }
  }
}

function calculateBarWidth(count, firstCount, maxWidth) {
  return (count / firstCount) * maxWidth;
}

function changeText(id, text) {
  document.getElementById(id).textContent = text;
}

function animateValue(el, start, end, options = {}) {
  const { type = "count", prefix = "", suffix = "", duration = DPMS } = options;
  const obj = document.getElementById(el);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / DPMS, 1);
    const value = Math.floor(progress * (end - start) + start);
    const formattedValue = prefix + valueTypes[type](value, obj) + suffix;
    obj.innerHTML = formattedValue;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function abbreviate(count, digits = 3) {
  function abbreviateStep1(value, digits) {
    if (digits == undefined) {
      digits = 3;
    }
    if (parseFloat(value) > 999 || parseFloat(value) < -999) {
      let newValue = value;
      const suffixes = ["", "K", "M", "B", "T"];
      let suffixNum = 0;
      while (newValue >= 1000 || newValue <= -1000) {
        newValue /= 1000;
        suffixNum++;
      }
      newValue = newValue.toPrecision(digits);
      newValue += suffixes[suffixNum];
      return newValue;
    } else {
      return parseFloat(value);
    }
  }

  function abbreviateStep2(count, digits) {
    if (digits == undefined) {
      digits = 3;
    }
    if (count > 999 && count < 1_000_000_000) {
      count = count.toString();
      let first = count.slice(0, digits);
      let rest = count.slice(digits);
      let abb = new Array(rest.length).fill(0).join("");
      return parseFloat(first + abb);
    } else {
      return count;
    }
  }

  return abbreviateStep1(
    abbreviateStep2(Math.floor(parseFloat(count)), digits),
    digits
  );
}

document.addEventListener("DOMContentLoaded", (w) => {
  function toId(str) {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }

  if (!charts.startIndex) {
    charts.startIndex = index;
  }

  const chartKeys = Object.keys(charts).filter(
    (key) => typeof charts[key] === "object"
  );
  for (let i = 0; i < chartKeys.length; i++) {
    const key = chartKeys[i];
    charts[key].chart = d3
      .select("#" + toId(key))
      .append("svg")
      .attr(
        "width",
        charts[key].style.width +
          charts[key].style.marginLeft +
          charts[key].style.marginRight
      )
      .attr(
        "height",
        charts[key].style.height +
          charts[key].style.marginTop +
          charts[key].style.marginBottom
      )
      .append("g")
      .attr(
        "transform",
        `translate(${charts[key].style.marginLeft},${charts[key].style.marginTop})`
      );
    charts[key].x = {
      scale: {},
      axis: {},
      ...charts[key].x,
    };
    charts[key].x.scale = d3
      .scaleTime()
      .domain([dates[0], dates[1]])
      .range([0, charts[key].style.width]);
    charts[key].x.axis = charts[key].chart
      .append("g")
      .attr("transform", `translate(0, ${charts[key].style.height})`)
      .style("font-size", charts[key].x.style?.fontSize)
      .style("font-family", charts[key].x.style?.fontFamily)
      .call(d3.axisBottom(charts[key].x.scale).ticks(5));

    charts[key].y = {
      scale: {},
      axis: {},
      ...charts[key].y,
    };
    charts[key].y.scale = d3
      .scaleLinear()
      .domain([0, 150])
      .range([charts[key].style.height, 0]);
    charts[key].y.axis = charts[key].chart
      .append("g")
      .attr("transform", `translate(0, 0)`)
      .style("font-size", charts[key].y.style?.fontSize)
      .style("font-family", charts[key].y.style?.fontFamily)
      .call(d3.axisLeft(charts[key].y.scale).ticks(5));

    if (Array.isArray(charts[key].lines)) {
      for (let j = 0; j < charts[key].lines.length; j++) {
        charts[key].lines[j] = {
          base: {},
          data: [],
          ...charts[key].lines[j],
        };
        charts[key].lines[j].base = charts[key].chart
          .append("path")
          .attr("class", "line")
          .attr("stroke", charts[key].lines[j].color)
          .attr("stroke-width", charts[key].lines[j].style?.strokeWidth ?? 4)
          .attr("fill", "none")
          .attr("clip-path", `url(#clip${i})`)
          .style("opacity", charts[key].lines[j].opacity);
      }
    } else if (typeof charts[key].lines === "object") {
      charts[key].lines = {
        base: {},
        data: [],
        ...charts[key].lines,
      };
      charts[key].lines.base = charts[key].chart
        .append("path")
        .attr("class", "line")
        .attr("stroke", charts[key].lines.color)
        .attr("stroke-width", charts[key].lines.style?.strokeWidth ?? 4)
        .attr("fill", "none")
        .attr("clip-path", `url(#clip${i})`)
        .style("opacity", charts[key].lines.opacity);
    }

    if (charts[key].avatars && charts[key].avatarSize) {
      if (Array.isArray(charts[key].avatars)) {
        for (let j = 0; j < charts[key].avatars.length; j++) {
          charts[key].avatars[j] = {
            base: {},
            group: {},
            type: "circle",
            ...charts[key].avatars[j],
          };
          charts[key].avatars[j].group = charts[key].chart
            .append("g")
            .attr(
              "transform",
              "translate(" +
                (charts[key].style.width - charts[key].avatarSize) +
                "," +
                (charts[key].style.height - charts[key].avatarSize) +
                ")"
            )
            .attr("y", 100);

          charts[key].avatars[j].base = charts[key].chart
            .append("image")
            .attr("xlink:href", charts[key].avatars[j].url)
            .attr("width", charts[key].avatarSize)
            .attr("height", charts[key].avatarSize);

          if (charts[key].avatars[j].type === "circle") {
            charts[key].avatars[j].base.attr(
              "clip-path",
              `url(#circleClip${i})`
            );
          }
        }
      } else {
        charts[key].avatars = {
          base: {},
          group: {},
          type: "circle",
          ...charts[key].avatars,
        };
        charts[key].avatars.group = charts[key].chart
          .append("g")
          .attr(
            "transform",
            "translate(" +
              (charts[key].style.width - charts[key].avatarSize) +
              "," +
              (charts[key].style.height - charts[key].avatarSize) +
              ")"
          )
          .attr("y", 100);

        charts[key].avatars.base = charts[key].chart
          .append("image")
          .attr("xlink:href", charts[key].avatars.url)
          .attr("width", charts[key].avatarSize)
          .attr("height", charts[key].avatarSize);

        if (charts[key].avatars.type === "circle") {
          charts[key].avatars.base.attr("clip-path", `url(#circleClip${i})`);
        }
      }
    }

    charts[key].chart
      .append("clipPath")
      .attr("id", `clip${i}`)
      .append("rect")
      .attr("width", charts[key].style.width)
      .attr("height", charts[key].style.height)
      .attr("fill", "blue");

    const shouldClipAvatars =
      charts[key].avatars && charts[key].avatarSize
        ? Array.isArray(charts[key].avatars)
          ? charts[key].avatars.length > 0 &&
            charts[key].avatars.find((a) => a.type === "circle")
          : charts[key].avatars.type === "circle"
        : false;
    if (shouldClipAvatars) {
      charts[key].chart
        .append("defs")
        .append("clipPath")
        .attr("id", `circleClip${i}`)
        .append("circle")
        .attr("cx", charts[key].avatarSize / 2)
        .attr("cy", charts[key].avatarSize / 2)
        .attr("r", charts[key].avatarSize / 2);
    }
  }

  if (!document.getElementById("date-value")) {
    const dateValue = document.createElement("p");
    dateValue.id = "date-value";
    dateValue.style.display = "none";
    dateValue.textContent = dates[index].toLocaleString();
    document.body.appendChild(dateValue);
  }

  function staticalUpdate() {
    animateValue("date-value", dates[pastIndex], dates[index]);
    update();
  }

  setInterval(() => {
    if (index === dates.length - 1) {
      index = dates.length - 1;
      pastIndex = dates.length - 1;
    } else {
      index += 1;
      if (index > 0) {
        pastIndex = index - 1;
      }
    }

    if (pastIndex < index) {
      staticalUpdate();
    }
  }, DPMS);
  setInterval(() => {
    if (pastIndex < index) {
      animateCharts();
    }
  }, charts.interval ?? 30);
});
