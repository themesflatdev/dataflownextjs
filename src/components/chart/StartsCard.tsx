"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { asApexOptions, type ApexChartHandle } from "@/lib/apexOptions";

export default function StatsCard({
    title,
    value,
    percent,
    trending = "up",
    defaultPeriod = "Weekly",
    periods = ["Daily", "Weekly", "Monthly", "Yearly"],
    chartData = {},
    chartColor = "#22C55E",
    chartHeight = 194,
    icon,
    shapeBg,
}) {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<ApexChartHandle | null>(null);
    const [period, setPeriod] = useState(defaultPeriod);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentData = useMemo(() => {
        const fallbackPeriod = chartData?.[defaultPeriod]
            ? defaultPeriod
            : Object.keys(chartData || {})[0];

        return chartData?.[period] || chartData?.[fallbackPeriod] || {};
    }, [chartData, period, defaultPeriod]);

    const displayValue = currentData?.value || value;
    const displayPercent = currentData?.percent || percent;
    const displaySeries = currentData?.series || [];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const t = e.target;
            if (
                t instanceof Node &&
                dropdownRef.current &&
                !dropdownRef.current.contains(t)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!mounted || !chartRef.current) return;

        let disposed = false;

        const renderChart = async () => {
            const ApexCharts = (await import("apexcharts")).default;
            if (!chartRef.current || disposed) return;

            const options = {
                series: [{ data: displaySeries }],
                colors: [chartColor],
                chart: {
                    type: "area",
                    height: chartHeight,
                    toolbar: { show: false },
                    background: "transparent",
                    animations: {
                        enabled: true,
                        easing: "easeinout",
                        speed: 800,
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        colorStops: [
                            { offset: 0, color: chartColor, opacity: 0.4 },
                            { offset: 100, color: chartColor, opacity: 0 },
                        ],
                    },
                },
                stroke: {
                    curve: "smooth",
                    width: 2.5,
                    colors: [chartColor],
                },
                dataLabels: { enabled: false },
                legend: { show: false },
                yaxis: { show: false },
                xaxis: {
                    labels: { show: false },
                    axisTicks: { show: false },
                    tooltip: { enabled: false },
                    axisBorder: { show: false },
                },
                grid: { show: false },
                tooltip: {
                    x: { show: false },
                    y: { title: { formatter: () => "" } },
                    marker: { show: false },
                    theme: "dark",
                },
                markers: { size: 0 },
            };

            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }

            chartInstance.current = new ApexCharts(
                chartRef.current,
                asApexOptions(options),
            );
            await chartInstance.current.render();
        };

        renderChart();

        return () => {
            disposed = true;
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [mounted, displaySeries, chartColor, chartHeight]);

    return (
        <div className="wg-chart-default" aria-label={title ? `${title} Stats Card` : "Statistics Card"}>
            <div className="top">
                <div className="flex items-center gap14">
                    <div className="image type-white" aria-hidden="true">
                        {shapeBg}
                        <span className="icon" aria-hidden="true">{icon}</span>
                    </div>
                    <div>
                        <div className="flex gap10 items-center">

                            <h3 className="body-text mt-2 mb-4" style={{fontSize: '1rem'}}>
                                {title}
                            </h3>
                            <div className={`box-icon-trending ${trending}`}>
                 
                                <i
                                    style={{ color: chartColor }}
                                    className={`icon-trending-${trending}`}
                                    aria-label={`Trending ${trending === "up" ? "upwards" : "downwards"}`}
                                    role="img"
                                ></i>
                                <div className="body-title number">
                               
                                    <strong>{displayPercent}</strong>
                                </div>
                            </div>
                        </div>
           
                        <h4><strong>{displayValue}</strong></h4>
                    </div>
                </div>

                <nav
                    className="dropdown default"
                    aria-label="Select period for chart"
                    ref={dropdownRef}
                >
                  
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    >
                        <span className="view-all">
                            {period}
                            <i className="icon-chevron-down" aria-hidden="true"></i>
                        </span>
                    </button>

                    <ul
                        id="stats-chart-periods"
                        className={`dropdown-menu dropdown-menu-end`}
                        role="menu"
                    >
                        {periods.map((p) => (
                            <li key={p} role="none">
                                <a
                                    href="#"
                                    className={p === period ? "active" : ""}
                                    role="menuitem"
                                    aria-current={p === period ? "page" : undefined}
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPeriod(p);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {p}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="wrap-chart">

                {mounted && <div ref={chartRef} aria-hidden="false" title={`${title ? title + " " : ""}Chart`} />}
            </div>
        </div>
    );
}
