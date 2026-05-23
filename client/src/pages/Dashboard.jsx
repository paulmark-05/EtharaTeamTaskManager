import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#7C5CFF",
  "#34D399",
  "#FACC15",
  "#FB7185",
];

const Dashboard = () => {
  const [stats, setStats] =
    useState({
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      overdueTasks: 0,
    });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const res =
          await API.get(
            "/dashboard"
          );

        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

  const pieData = [
    {
      name: "Completed",
      value:
        stats.completedTasks,
    },
    {
      name: "Pending",
      value:
        stats.pendingTasks,
    },
    {
      name: "Overdue",
      value:
        stats.overdueTasks,
    },
  ];

  const trendData = [
    {
      day: "Mon",
      tasks: 2,
    },
    {
      day: "Tue",
      tasks: 4,
    },
    {
      day: "Wed",
      tasks: 3,
    },
    {
      day: "Thu",
      tasks: 5,
    },
    {
      day: "Fri",
      tasks:
        stats.completedTasks,
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>
          Dashboard
        </h1>

        <p>
          Team performance
          analytics
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card purple">
          <h4>Total</h4>
          <h1>
            {stats.totalTasks}
          </h1>
        </div>

        <div className="stat-card green">
          <h4>Completed</h4>
          <h1>
            {
              stats.completedTasks
            }
          </h1>
        </div>

        <div className="stat-card yellow">
          <h4>Pending</h4>
          <h1>
            {stats.pendingTasks}
          </h1>
        </div>

        <div className="stat-card pink">
          <h4>Overdue</h4>
          <h1>
            {stats.overdueTasks}
          </h1>
        </div>
      </div>

      <div className="chart-grid">
        <div className="card chart-card">
          <h2>
            Task Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={
                  110
                }
              >
                {pieData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h2>
            Weekly Trend
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <AreaChart
              data={
                trendData
              }
            >
              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#7C5CFF"
                fill="#C4B5FD"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;