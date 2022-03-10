export interface PieChartData {
    name: string;
    value: number;
}

export interface PieChartLabel {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}

export interface ScatterChartData {
    x: number;
    y: number;
}

export interface ScatterChartDataDetails {
    nameX: string;
    nameY: string;
    unitX: string;
    unitY: string;
    domainX: number[];
    domainY: number[];
}
