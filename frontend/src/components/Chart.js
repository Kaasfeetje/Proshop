import React, { useState } from "react";
function Chart({ analytics = [], width = 500, height = 300 }) {
    const [highlight, setHighlight] = useState(undefined);

    const productCount = analytics.length;
    const maxAmount = Math.max.apply(
        null,
        analytics.map((product) => product.visitCount)
    );

    const gap_size = 10;
    const bar_width = Math.round(
        (width - (productCount * 2 + 2) * gap_size) / (productCount * 2)
    );

    const data = React.useMemo(
        () =>
            analytics.map((product, i) => {
                const letters = "0123456789ABCDEF";
                let color = "#";
                for (let j = 0; j < 6; j++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }

                return [
                    {
                        chart: 0,
                        label: product.name,
                        value: product.visitCount,
                        x: i * bar_width + gap_size * (i + 1),
                        y: product.visitCount
                            ? Math.round(
                                  (product.visitCount / maxAmount) * height
                              )
                            : 5,
                        color,
                    },
                    {
                        chart: 1,
                        label: product.name,
                        value: product.orderCount,
                        x:
                            (i + productCount) * bar_width +
                            gap_size * (i + productCount + 2),
                        y: product.orderCount
                            ? Math.round(
                                  (product.orderCount / maxAmount) * height
                              )
                            : 5,
                        color,
                    },
                ];
            }),

        [analytics, bar_width, maxAmount, gap_size, productCount, height]
    );

    return (
        <div className="chart">
            <svg width={`${width}px`} height={`${height}px`}>
                <g>
                    <rect
                        x={0}
                        y={0}
                        width={"100%"}
                        height={"100%"}
                        style={{ fill: "rgb(200,200,200)" }}
                    />
                    <rect x={width / 2} y={0} height={"100%"} width={"2px"} />
                    {data.map((product) => (
                        <g key={product.name}>
                            <rect
                                x={product[0].x}
                                y={height - product[0].y}
                                width={bar_width}
                                height={product[0].y}
                                style={{ fill: product[0].color }}
                                onMouseEnter={() => setHighlight(product[0])}
                                onMouseLeave={() => setHighlight(undefined)}
                            />
                            <rect
                                x={product[1].x}
                                y={height - product[1].y}
                                width={bar_width}
                                height={product[1].y}
                                style={{ fill: product[1].color }}
                                onMouseEnter={() => setHighlight(product[1])}
                                onMouseLeave={() => setHighlight(undefined)}
                            />
                        </g>
                    ))}
                </g>
            </svg>
            <div className="chart-heading">
                <h2>Views</h2>
                <h2>Orders</h2>
            </div>
            {highlight && (
                <div>
                    <table>
                        <thead>
                            <th>Name</th>
                            <th>Value</th>
                        </thead>
                        <tbody>
                            <td>{highlight.label}</td>
                            <td>{`${highlight.value} ${
                                highlight.chart === 0 ? "views" : "orders"
                            }`}</td>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Chart;
