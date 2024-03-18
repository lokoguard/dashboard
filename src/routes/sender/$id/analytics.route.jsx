import {createFileRoute, useParams} from "@tanstack/react-router";
import Chart from "react-apexcharts";

import {useEffect, useState} from "react";
import useScreenWidth from "../../../hooks/useScreenWidth.jsx";
import {get} from "../../../request.js";
import toast from "react-hot-toast";
import {Flex, Grid, GridItem, SimpleGrid, Text} from "@chakra-ui/react";

export const Route = createFileRoute("/sender/$id/analytics")({
    component: Index,
});

export default function Index() {
    const screenWidth = useScreenWidth();
    const [cpuStatSeries, setCpuStatSeries] = useState([]);
    const [memoryStatSeries, setMemoryStatSeries] = useState([]);
    const [temperatureStatSeries, setTemperatureStatSeries] = useState([]);
    const [diskUsedPercentageStatSeries, setDiskUsedPercentageStatSeries] = useState([]);
    const [diskFreeGbStatSeries, setDiskFreeGbStatSeries] = useState([]);
    const senderId = useParams({
        from: '/sender/$id', select: (params) => params.id,
    })

    // update cpu stats
    const updateCpuStats = async (rawSeries) => {
        if (rawSeries.length === 0) {
            return;
        }
        // fetch length of elements in single series
        const seriesLength = rawSeries[0].cpuStats.length;
        // create series map
        const seriesMap = {};
        // create labels
        for (let i = 0; i < seriesLength; i++) {
            seriesMap[i] = [];
        }
        // fill series map
        for (let i = 0; i < rawSeries.length; i++) {
            for (let j = 0; j < seriesLength; j++) {
                seriesMap[j].push([rawSeries[i].timestamp, rawSeries[i].cpuStats[j]]);
            }
        }
        // create series
        const series = [];
        for (let i = 0; i < seriesLength; i++) {
            series.push({
                name: `CPU ${i + 1}`, data: seriesMap[i]
            });
        }
        setCpuStatSeries(series);
    }

    // update memory stats
    const updateMemoryStats = async (rawSeries) => {
        if (rawSeries.length === 0) {
            return;
        }
        const seriesMap = {
            "available": [], "cached": [], "free": [], "total": [], "used": [],
        };

        for (let i = 0; i < rawSeries.length; i++) {
            seriesMap["available"].push([rawSeries[i].timestamp, rawSeries[i].memStat.available_gb]);
            seriesMap["cached"].push([rawSeries[i].timestamp, rawSeries[i].memStat.cached_gb]);
            seriesMap["free"].push([rawSeries[i].timestamp, rawSeries[i].memStat.free_gb]);
            seriesMap["total"].push([rawSeries[i].timestamp, rawSeries[i].memStat.total_gb]);
            seriesMap["used"].push([rawSeries[i].timestamp, rawSeries[i].memStat.used_gb]);
        }

        // create series
        const series = [{
            name: "Available", data: seriesMap["available"]
        }, {
            name: "Cached", data: seriesMap["cached"]
        }, {
            name: "Free", data: seriesMap["free"]
        }, {
            name: "Used", data: seriesMap["used"]
        }];

        setMemoryStatSeries(series);
    }

    // update temperature stats
    const updateTemperatureStats = async (rawSeries) => {
        if (rawSeries.length === 0) {
            return;
        }
        // pick first element
        const firstElement = rawSeries[0].temperatureStats;
        // create series map
        const seriesMap = {};
        for (let i in firstElement) {
            seriesMap[firstElement[i].sensor] = [];
        }
        // fill series map
        for (let i = 0; i < rawSeries.length; i++) {
            for (let j in rawSeries[i].temperatureStats) {
                seriesMap[rawSeries[i].temperatureStats[j].sensor].push([rawSeries[i].timestamp, rawSeries[i].temperatureStats[j].temperature_celcius]);
            }
        }
        // create series
        const series = [];
        for (let key in seriesMap) {
            series.push({
                name: key, data: seriesMap[key]
            });
        }

        setTemperatureStatSeries(series);
    }

    const updateDiskStats = async (rawSeries) => {
        //     0
        // free_gb
        // :
        // 246.74907
        // fs_type
        // :
        // "ext2/ext3"
        // path
        // :
        // "/home"
        // total_gb
        // :
        // 370.3986
        // used_gb
        // :
        // 104.76441
        // used_percent
        // :
        // 29.80381


        if (rawSeries.length === 0) {
            return;
        }
        // create blank series map
        const seriesMap = {};
        const seriesFreeGbMap = {};

        for (let i = 0; i < rawSeries.length; i++) {
            for (let recordIndex in rawSeries[i].diskStats) {
                let record = rawSeries[i].diskStats[recordIndex];
                if (!seriesMap[record.path]) {
                    seriesMap[record.path] = [];
                }
                if (!seriesFreeGbMap[record.path]) {
                    seriesFreeGbMap[record.path] = [];
                }
                seriesMap[record.path].push([rawSeries[i].timestamp, record.used_percent]);
                seriesFreeGbMap[record.path].push([rawSeries[i].timestamp, record.free_gb]);

            }
        }

        // create series
        const series = [];
        const seriesFreeGb = [];
        for (let key in seriesMap) {
            series.push({
                name: key, data: seriesMap[key]
            });
            seriesFreeGb.push({
                name: key, data: seriesFreeGbMap[key]
            });
        }
        setDiskUsedPercentageStatSeries(series);
        setDiskFreeGbStatSeries(seriesFreeGb);
    }

    // fetch analytics data
    const fetchData = () => {
        get(`/api/management/senders/${senderId}/analytics`, {})
            .then((data) => {
                updateCpuStats(data)
                updateMemoryStats(data)
                updateTemperatureStats(data)
                updateDiskStats(data)
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to fetch analytics data");
            });
    }

    // Start auto 30s refresh
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 60000);
        return () => clearInterval(interval);
    }, [senderId]);


    return (<>
        <SimpleGrid columns={2} spacing={10} maxH="80vh" overflow="auto">
            {/* CPU stats */}
            {areaChart(cpuStatSeries, "CPU Stats (%)", screenWidth)}
            {/*  Memory Stats  */}
            {areaChart(memoryStatSeries, "Memory Stats (GB)", screenWidth)}
            {/* Temperature stats */}
            {areaChart(temperatureStatSeries, "Temperature Stats (°C)", screenWidth)}
            {/*  Disk stats (Used Percentage)  */}
            {areaChart(diskUsedPercentageStatSeries, "Disk Stats (Used Percentage)", screenWidth)}
            {/*  Disk stats (Free GB)  */}
            {areaChart(diskFreeGbStatSeries, "Disk Stats (Free GB)", screenWidth)}
        </SimpleGrid>
    </>)
}


// private components
function areaChart(seriesData, label, screenWidth) {
    return (<Flex flexDirection="column">
        <Chart
            type="area"
            series={seriesData}
            options={{
                chart: {
                    toolbar: {
                        show: true
                    }
                }, zoom: {
                    autoScaleYaxis: true
                }, markers: {
                    size: 0, style: 'hollow',
                }, dataLabels: {
                    enabled: false
                }, xaxis: {
                    type: 'datetime', tickAmount: 1, labels: {
                        show: false,
                    }
                }, stroke: {
                    curve: 'smooth', width: 1,
                }, fill: {
                    type: 'gradient', gradient: {
                        shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0.6, stops: [0, 100]
                    }
                },
            }}
            width={screenWidth / 2.5}
        />
        <Text align="center" fontWeight="bold">{label}</Text>
    </Flex>)
}