"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { asApexOptions, type ApexChartHandle } from "@/lib/apexOptions";

export default function StartsCard2({ card }) {
    const chartRef = useRef<ApexChartHandle | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState(card.defaultPeriod);
    const [showDropdown, setShowDropdown] = useState(false);

    const filters = useMemo(() => Object.keys(card.chartData), [card]);
    const currentData = card.chartData[filter];

    const series = currentData.series;
    const first = series[0];
    const last = series[series.length - 1];
    const isUp = last >= first;
    const percent = Math.abs(((last - first) / first) * 100).toFixed(2) + "%";

    useEffect(() => {
        setMounted(true);
    }, []);

    // Render chart when filter changes
    useEffect(() => {
        if (!mounted || !containerRef.current) return;
        let disposed = false;

        const renderChart = async () => {
            const ApexCharts = (await import("apexcharts")).default;
            if (!containerRef.current || disposed) return;

            chartRef.current?.destroy();
            chartRef.current = null;
            containerRef.current.innerHTML = "";

            const chart = new ApexCharts(
                containerRef.current,
                asApexOptions({
                    series: [{ name: card.title, data: currentData.series }],
                    chart: {
                        type: "bar",
                        height: card.chartHeight,
                        toolbar: { show: false },
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "3px",
                            borderRadiusApplication: "end",
                        },
                    },
                    dataLabels: { enabled: false },
                    legend: { show: false },
                    colors: [card.chartColor],
                    stroke: { show: false },
                    grid: { show: false },
                    xaxis: {
                        labels: { show: false },
                        axisTicks: { show: false },
                        axisBorder: { show: false },
                    },
                    yaxis: { show: false },
                    tooltip: { y: { formatter: (val) => `${val}` } },
                }),
            );

            chartRef.current = chart;
            await chart.render();
        };

        renderChart();
        return () => {
            disposed = true;
            chartRef.current?.destroy();
            chartRef.current = null;
        };
    }, [mounted, currentData, card.chartColor, card.title]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".dropdown.default")) setShowDropdown(false);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    if (!mounted) return null;

    return (
        <div className="wg-chart-default">
            <div className="top">
                <div className="flex items-center gap14">
                    {/* Icon hexagon */}
                    <div className="image type-white">
                        {card.shapeBg}
                        <span className="icon">{card.icon}</span>
                    </div>
                    <div>
                        <div className="flex gap10 items-center">
                            <div className="body-text mt-2 mb-4">
                                {card.title}
                            </div>
                            <div
                                className={`box-icon-trending ${isUp ? "up" : "down"}`}
                            >
                                <i
                                    className={`icon-trending-${isUp ? "up" : "down"}`}
                                    style={{ color: card.color }}
                                ></i>
                                <div className="body-title number">
                                    {percent}
                                </div>
                            </div>
                        </div>
                        <h4>{currentData.value}</h4>
                    </div>
                </div>

                {/* Dropdown filter */}
                <div className="dropdown default">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className="view-all">
                            {filter}
                            <i className="icon-chevron-down"></i>
                        </span>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                        {filters
                            .filter((item) => item !== filter)
                            .map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setFilter(item);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            <div className="wrap-chart">
                <div
                    className="wrap-line-chart"
                    style={{ minHeight: `${card.chartHeight + 30}px` }}
                    ref={containerRef}
                />
            </div>
        </div>
    );
}
