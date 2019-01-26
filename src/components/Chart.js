
/* App.js */
var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./../canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Chart extends Component {
	render() {
		const options = {
			title: {
				text: "Tweet Classification by Politician"
			},
			toolTip: {
				shared: true
			},
			legend: {
				verticalAlign: "top"
			},
			axisY: {
				suffix: "%"
			},
			data: [{
				type: "stackedBar100",
				color: "#9bbb59",
				name: "Positive",
				showInLegend: true,
				indexLabel: "{y}",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ label: "Alexandria Ocasio Cortez",   y: 44.49 },
					{ label: "Ayanna Pressly",   y: 53.94 },
					{ label: "Nancy Pelosi",   y: 35.40 },
					{ label: "Elizabeth Warren",   y: 47.57 },
					{ label: "Kristen Gillibrand",   y: 35.34 },
					{ label: "Kyrsten Sinema",   y: 37.15 },
					{ label: "Maxime Waters",   y: 46.73 },
					{ label: "Kamala Harris",   y: 42.58 },
					{ label: "Marilyn Mosby",   y: 39.64 },
                    { label: "Susan Collins",   y: 40.69 },
                    { label: "Lisa Murkowski",   y: 33.57 },
				]
			},{
				type: "stackedBar100",
				color: "#7f7f7f",
				name: "Negative",
				showInLegend: true,
				indexLabel: "{y}",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ label: "Alexandria Ocasio Cortez",   y: 35.32 },
					{ label: "Ayanna Pressly",   y: 21.55 },
					{ label: "Nancy Pelosi",   y: 49.07 },
					{ label: "Elizabeth Warren",   y: 30.80 },
					{ label: "Kristen Gillibrand",   y: 40.07 },
					{ label: "Kyrsten Sinema",   y: 43.69 },
					{ label: "Maxime Waters",   y: 35.69 },
					{ label: "Kamala Harris",   y: 36.48 },
					{ label: "Marilyn Mosby",   y: 30.32 },
                    { label: "Susan Collins",   y: 28.74 },
                    { label: "Lisa Murkowski",   y: 44.51 },
				]
            },
            {
				type: "stackedBar100",
				color: "#7FFFD4",
				name: "Neutral",
				showInLegend: true,
				indexLabel: "{y}%",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ label: "Alexandria Ocasio Cortez",   y: 20.20 },
					{ label: "Ayanna Pressly",   y: 24.51 },
					{ label: "Nancy Pelosi",   y: 15.52 },
					{ label: "Elizabeth Warren",   y: 21.62  },
					{ label: "Kristen Gillibrand",   y: 24.59 },
					{ label: "Kyrsten Sinema",   y: 19.17 },
					{ label: "Maxime Waters",   y: 17.58 },
					{ label: "Kamala Harris",   y: 20.94 },
					{ label: "Marilyn Mosby",   y: 30.04 },
                    { label: "Susan Collins",   y: 30.57 },
                    { label: "Lisa Murkowski",   y: 21.91 },
				]
            },
        ]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
module.exports = Chart;    