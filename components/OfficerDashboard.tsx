"use client";

import { useState } from "react";
import { MapPin, DollarSign, Star, CheckCircle, Clock, TrendingUp, Award, Navigation, Camera } from "lucide-react";
import { type VerificationTask } from "@/lib/types";

export default function OfficerDashboard() {
  const [tasks, setTasks] = useState<VerificationTask[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);

  const stats = {
    completedTasks: 45,
    earnings: 12500,
    rating: 4.8,
    pendingTasks: tasks.filter(t => t.status === "assigned").length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Extension Officer Dashboard</h1>
        <p className="text-gray-600">Verify milestones and earn verification fees</p>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-premium group hover:shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completed Tasks</p>
              <p className="text-4xl font-bold text-[#1a1a1a]">{stats.completedTasks}</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="badge badge-success text-xs">verified</span>
          </div>
        </div>

        <div className="card-premium group hover:shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Earnings</p>
              <p className="text-4xl font-bold text-[#2d5f3f]">K{stats.earnings.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <DollarSign className="h-7 w-7 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600 font-semibold">+18% this month</span>
          </div>
        </div>

        <div className="card-premium group hover:shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Rating</p>
              <p className="text-4xl font-bold text-[#1a1a1a]">{stats.rating}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <Star className="h-7 w-7 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Award className="h-3 w-3 text-yellow-600" />
            <span className="text-xs text-gray-500">Top 10% officer</span>
          </div>
        </div>

        <div className="card-premium group hover:shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending Tasks</p>
              <p className="text-4xl font-bold text-[#1a1a1a]">{stats.pendingTasks}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <Clock className="h-7 w-7 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="badge badge-info text-xs">awaiting</span>
          </div>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="card-premium mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${
              isAvailable ? "bg-gradient-to-br from-green-100 to-green-50" : "bg-gray-100"
            }`}>
              <Navigation className={`h-6 w-6 ${
                isAvailable ? "text-green-600" : "text-gray-400"
              }`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">Availability Status</h3>
              <p className="text-sm text-gray-600">
                {isAvailable ? "You are currently available for verification tasks" : "You are currently unavailable"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`relative inline-flex h-10 w-20 items-center rounded-full transition-all shadow-md ${
              isAvailable ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-lg transition-transform ${
                isAvailable ? "translate-x-11" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Available Tasks */}
      <div className="card-premium">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1a1a1a]">Available Verification Tasks</h2>
          {tasks.length > 0 && (
            <span className="badge badge-info">{tasks.length} tasks</span>
          )}
        </div>
        
        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-[#f0f7f4] to-[#e8f5e9] w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-12 w-12 text-[#2d5f3f]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">No Tasks Available</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {isAvailable 
                ? "New verification tasks will appear here when farmers submit milestone evidence"
                : "Turn on availability to start receiving tasks"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-[#2d5f3f] hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-[#1a1a1a]">Milestone Verification</h4>
                      <span className="badge badge-info text-xs">new</span>
                    </div>
                    <p className="text-sm text-gray-600">Task ID: {task.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-br from-[#7fb069] to-[#2d5f3f] px-4 py-2 rounded-xl shadow-md">
                      <p className="text-xs text-white/80 font-medium">Verification Fee</p>
                      <p className="text-lg font-bold text-white">K250</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#2d5f3f]" />
                    <span>2.5 km away</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#2d5f3f]" />
                    <span>Due in 2 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-[#2d5f3f]" />
                    <span>Photo verification required</span>
                  </div>
                </div>
                
                <button className="w-full btn-primary flex items-center justify-center gap-2 group-hover:shadow-xl">
                  <CheckCircle className="h-5 w-5" />
                  <span>Accept Task</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
