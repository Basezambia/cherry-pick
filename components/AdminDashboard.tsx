"use client";

import { useState } from "react";
import { Users, FileText, TrendingUp, DollarSign, Activity, ArrowUp, ArrowDown, BarChart3, PieChart, MapPin, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week");

  const stats = {
    totalFarmers: { value: 156, change: 12, trend: "up" },
    activeContracts: { value: 89, change: 8, trend: "up" },
    totalVolume: { value: 45000, change: 15, trend: "up" },
    platformRevenue: { value: 125000, change: 22, trend: "up" },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Platform Overview</h1>
        <p className="text-gray-600">Monitor and manage your AgroChain360 platform</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2 mb-6">
        {["Today", "Week", "Month", "Year"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range.toLowerCase())}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timeRange === range.toLowerCase()
                ? "bg-[#2d5f3f] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Farmers */}
        <div className="card-premium group hover:shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Farmers</p>
              <p className="text-4xl font-bold text-[#1a1a1a] mb-2">{stats.totalFarmers.value}</p>
              <div className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">{stats.totalFarmers.change}%</span>
                <span className="text-xs text-gray-500">vs last {timeRange}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <Users className="h-7 w-7 text-green-600" />
            </div>
          </div>
        </div>

        {/* Active Contracts */}
        <div className="card-premium group hover:shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Contracts</p>
              <p className="text-4xl font-bold text-[#1a1a1a] mb-2">{stats.activeContracts.value}</p>
              <div className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">{stats.activeContracts.change}%</span>
                <span className="text-xs text-gray-500">vs last {timeRange}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <FileText className="h-7 w-7 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Volume */}
        <div className="card-premium group hover:shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Volume (kg)</p>
              <p className="text-4xl font-bold text-[#1a1a1a] mb-2">{stats.totalVolume.value.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">{stats.totalVolume.change}%</span>
                <span className="text-xs text-gray-500">vs last {timeRange}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <TrendingUp className="h-7 w-7 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Platform Revenue */}
        <div className="card-premium group hover:shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Platform Revenue</p>
              <p className="text-4xl font-bold text-[#1a1a1a] mb-2">K{stats.platformRevenue.value.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-600">{stats.platformRevenue.change}%</span>
                <span className="text-xs text-gray-500">vs last {timeRange}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <DollarSign className="h-7 w-7 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-premium mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center">
            <Activity className="h-6 w-6 mr-3 text-[#2d5f3f]" />
            Recent Platform Activity
          </h2>
          <button className="text-sm font-medium text-[#2d5f3f] hover:text-[#1d4029] transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-1">
          {[
            { action: "New contract created", farmer: "John Mwale", crop: "Mangoes", time: "2 hours ago", icon: FileText, color: "blue" },
            { action: "Milestone verified", farmer: "Mary Banda", crop: "Pineapples", time: "3 hours ago", icon: CheckCircle2, color: "green" },
            { action: "Payment processed", farmer: "Peter Phiri", crop: "Tomatoes", time: "5 hours ago", icon: DollarSign, color: "yellow" },
            { action: "New farmer onboarded", farmer: "Grace Tembo", crop: "Strawberries", time: "1 day ago", icon: Users, color: "purple" },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-[#f0f7f4] rounded-xl transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${
                    activity.color === "blue" ? "bg-blue-100" :
                    activity.color === "green" ? "bg-green-100" :
                    activity.color === "yellow" ? "bg-yellow-100" :
                    "bg-purple-100"
                  } group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-5 w-5 ${
                      activity.color === "blue" ? "text-blue-600" :
                      activity.color === "green" ? "text-green-600" :
                      activity.color === "yellow" ? "text-yellow-600" :
                      "text-purple-600"
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a1a1a]">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.farmer} - {activity.crop}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Crop Distribution */}
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1a1a1a] flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-[#2d5f3f]" />
              Crop Distribution
            </h3>
          </div>
          <div className="space-y-4">
            {[
              { crop: "Mangoes", percentage: 28, color: "bg-gradient-to-r from-yellow-500 to-yellow-600", value: "12,600 kg" },
              { crop: "Pineapples", percentage: 22, color: "bg-gradient-to-r from-orange-500 to-orange-600", value: "9,900 kg" },
              { crop: "Tomatoes", percentage: 18, color: "bg-gradient-to-r from-red-500 to-red-600", value: "8,100 kg" },
              { crop: "Cashew nuts", percentage: 15, color: "bg-gradient-to-r from-amber-600 to-amber-700", value: "6,750 kg" },
              { crop: "Others", percentage: 17, color: "bg-gradient-to-r from-gray-500 to-gray-600", value: "7,650 kg" },
            ].map((item) => (
              <div key={item.crop} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">{item.crop}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{item.value}</span>
                    <span className="font-bold text-[#1a1a1a]">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:opacity-90`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Farmers */}
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1a1a1a] flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-[#2d5f3f]" />
              Top Performing Farmers
            </h3>
          </div>
          <div className="space-y-4">
            {[
              { name: "John Mwale", contracts: 8, earnings: 45000, badge: "🥇" },
              { name: "Mary Banda", contracts: 6, earnings: 38000, badge: "🥈" },
              { name: "Peter Phiri", contracts: 5, earnings: 32000, badge: "🥉" },
              { name: "Grace Tembo", contracts: 4, earnings: 28000, badge: "4" },
            ].map((farmer, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-[#f0f7f4] rounded-xl transition-all group">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-[#7fb069] to-[#2d5f3f] w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold text-white">{farmer.badge}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a]">{farmer.name}</p>
                    <p className="text-sm text-gray-600">{farmer.contracts} active contracts</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#2d5f3f]">K{farmer.earnings.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total earnings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Distribution */}
      <div className="card-premium">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#1a1a1a] flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-[#2d5f3f]" />
            Regional Distribution
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { region: "Central", farmers: 45, contracts: 28, color: "blue" },
            { region: "Eastern", farmers: 38, contracts: 22, color: "green" },
            { region: "Southern", farmers: 42, contracts: 25, color: "purple" },
            { region: "Northern", farmers: 31, contracts: 14, color: "orange" },
          ].map((region) => (
            <div key={region.region} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all">
              <p className="text-sm font-medium text-gray-600 mb-2">{region.region}</p>
              <p className="text-2xl font-bold text-[#1a1a1a] mb-1">{region.farmers}</p>
              <p className="text-xs text-gray-500">{region.contracts} contracts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
