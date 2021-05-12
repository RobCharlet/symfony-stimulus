import {Controller} from 'stimulus';

export default class extends Controller {
    // https://www.chartjs.org/docs/latest/developers/updates.html
    onChartConnect(event) {
        this.chart = event.detail.chart;
        setTimeout(() => {
            this.setNewData();
        }, 3000);
    }

    setNewData() {
        this.chart.data.datasets[0].data[2] = 30;
        this.chart.update();
    }
}