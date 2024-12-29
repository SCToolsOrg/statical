# Statical

A high-level stats video framework built on top of [D3.js](https://d3js.org).

## Videos made with Statical

[!["Cocomelon VS SET India: The Race For 2ND Most Subscribed Company Channel" by JipStats](https://github.com/user-attachments/assets/fe3fb175-d907-4849-9c30-d0b08262b43a)](https://www.youtube.com/watch?v=Y3zxw7INPc8)

[!["Every Channel with Over 100M Subscribers Visualized" by MinMax](https://github.com/user-attachments/assets/773f0e3b-b999-4547-9415-42611a22243d)](https://www.youtube.com/watch?v=rnIyZvWI630)

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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://d3js.org/d3.v7.min.js"></script>
  </head>
  <body>
    <div id="count">0</div>
    <div id="chart"></div>
  </body>
  <script src="./statical.js"></script>
  <script>
    // this can come from an external script, such as "./data.js"
    const data = {
      dates: [
        "2022-01-01",
        "2023-01-01",
        "2024-01-01",
        "2025-01-01",
        "2026-01-01",
        "2027-01-01",
        "2028-01-01",
      ],
      count: [1, 5, 10, 15, 20, 25, 30],
    };

    var dates = data.dates.map((date) => new Date(date));
    var DPMS = (5 * 1000) / dates.length;
    var charts = {
      chart: {
        style: {
          width: 920,
          height: 105,
          marginLeft: 25,
          marginTop: 10,
          marginBottom: 25,
          marginRight: 25,
        },
        lines: {
          color: "black",
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
</html>
```

## Why did we make Statical?

Because we thought that making high-quality stats videos with D3.js was too complicated, involving a lot of code that you have to copy and paste a bunch of times. With Statical, we put the best practices used by many creators such as [JipStats](https://youtube.com/@JipStats), [GNZGUY](https://youtube.com/@GNZGUY) and [MinMax](https://youtube.com/@MinMaxStats) in a simple and easy-to-use package, whilst still giving you the option to make the video your own.
