# Advanced Usage

Do you want to add more content to your graphs? Maybe you want to show names next to the lines? Maybe avatars? You can do all of that with Statical and custom update logic.

## `create-chart` event

The `create-chart` event is fired from the `statical` global whenever a chart is created, which allows you to initialize any elements you want to add.

```js
const charts = {
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

statical.addEventListener("create-chart", (event) => {
  const { detail } = event;
  console.log(detail); // { chart: "chart" }
});
```

The `chart` parameter from the `detail` object is the chart's key in the `charts` object (aka the ID of the chart) that is currently being created.

## Custom `update` function for `updateChart`

You can pass in a function to `updateChart` to be able to update your custom elements.

```js
function animateCharts() {
  updateChart("chart", parseInt(getText("count")), (chart, index) => {
    console.log(chart, index); // chart, 0
  });
}
```

The `chart` parameter specifies which chart the update function is being called in, which is useful for using the same update function for mmultiple charts.

The `index` parameter specifies which line is currently being updated. This is usually used for multi-line charts.
