# Statical

A high-level stats video framework built on top of [D3.js](https://d3js.org).

## Videos made with Statical

[![Cocomelon VS SET India: The Race For 2ND Most Subscribed Company Channel](https://github.com/user-attachments/assets/fe3fb175-d907-4849-9c30-d0b08262b43a)](https://www.youtube.com/watch?v=Y3zxw7INPc8)

## Usage

Install with NPM:

```bash
npm install @sctools/statical
```

Or use a CDN such as [unpkg](https://unpkg.com):

```js
<script src="https://unpkg.com/@sctools/statical/statical.js"></script>
```

Or [download it straight from the source](./statical.js).

Then use it in HTML:

```html
<body>
  <div id="count">0</div>
  <div id="chart"></div>
</body>
<script src="./statical.js"></script>
<script>
  const data = {
    dates: ["2022-01-01", "2023-01-01", "2024-01-01"],
    count: [1, 5, 10],
  };

  var dates = data.dates.map((date) => new Date(date));
  var DPMS = (1 * 60 * 1000) / dates.length;
  var charts = {
    chart: {
      style: {
        width: 920,
        height: 105,
      },
      lines: {
        color: "#ffffff",
      },
    },
  };
  var valueTypes = {
    count: (val) => val.toLocaleString(),
  };

  function update() {
    animateValue("count", data.count[pastIndex], data.count[index]);
  }

  function animateCharts() {
    updateChart("chart", parseInt(getText("count")));
  }
</script>
```

## Why did we make Statical?

Because we thought that making high-quality stats videos with D3.js was too complicated, involving a lot of code that you have to copy and paste a bunch of times. With Statical, we put the best practices used by many creators such as [JipStats](https://youtube.com/@JipStats), [GNZGUY](https://youtube.com/@GNZGUY) and [MinMax](https://youtube.com/@MinMaxStats) in a simple and easy-to-use package, whilst still giving you the option to make the video your own.
