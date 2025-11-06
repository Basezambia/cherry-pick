/**
 * Route Optimization Service for Extension Officers
 * Calculates optimal routes for verification tasks
 */

interface Location {
  lat: number;
  lng: number;
}

interface Task {
  id: string;
  location: Location;
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: number; // minutes
}

interface OptimizedRoute {
  tasks: Task[];
  totalDistance: number; // km
  totalDuration: number; // minutes
  estimatedFuel: number; // liters
}

/**
 * Calculate distance between two points using Haversine formula
 */
function calculateDistance(point1: Location, point2: Location): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
    Math.cos(toRad(point2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Optimize route using nearest neighbor algorithm
 */
export function optimizeRoute(
  startLocation: Location,
  tasks: Task[]
): OptimizedRoute {
  if (tasks.length === 0) {
    return {
      tasks: [],
      totalDistance: 0,
      totalDuration: 0,
      estimatedFuel: 0,
    };
  }

  // Sort by priority first
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const route: Task[] = [];
  const remaining = [...sortedTasks];
  let currentLocation = startLocation;
  let totalDistance = 0;
  let totalDuration = 0;

  // Nearest neighbor algorithm with priority consideration
  while (remaining.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = calculateDistance(currentLocation, remaining[0].location);

    // Find nearest high-priority task first, then nearest overall
    const highPriorityTasks = remaining.filter(t => t.priority === 'high');
    
    if (highPriorityTasks.length > 0) {
      // Find nearest high-priority task
      for (let i = 0; i < remaining.length; i++) {
        if (remaining[i].priority === 'high') {
          const distance = calculateDistance(currentLocation, remaining[i].location);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = i;
          }
        }
      }
    } else {
      // Find nearest task overall
      for (let i = 1; i < remaining.length; i++) {
        const distance = calculateDistance(currentLocation, remaining[i].location);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }
    }

    const nextTask = remaining[nearestIndex];
    route.push(nextTask);
    totalDistance += nearestDistance;
    totalDuration += nextTask.estimatedDuration + (nearestDistance / 40) * 60; // Assume 40 km/h average speed
    currentLocation = nextTask.location;
    remaining.splice(nearestIndex, 1);
  }

  // Calculate estimated fuel (assume 12 km/liter)
  const estimatedFuel = totalDistance / 12;

  return {
    tasks: route,
    totalDistance: Math.round(totalDistance * 10) / 10,
    totalDuration: Math.round(totalDuration),
    estimatedFuel: Math.round(estimatedFuel * 10) / 10,
  };
}

/**
 * Get route summary for display
 */
export function getRouteSummary(route: OptimizedRoute): string {
  const hours = Math.floor(route.totalDuration / 60);
  const minutes = route.totalDuration % 60;
  
  return `${route.tasks.length} tasks • ${route.totalDistance} km • ${hours}h ${minutes}m • ${route.estimatedFuel}L fuel`;
}

/**
 * Calculate time savings compared to unoptimized route
 */
export function calculateTimeSavings(
  optimizedRoute: OptimizedRoute,
  unoptimizedTasks: Task[],
  startLocation: Location
): number {
  // Calculate unoptimized distance (tasks in original order)
  let unoptimizedDistance = 0;
  let currentLoc = startLocation;
  
  for (const task of unoptimizedTasks) {
    unoptimizedDistance += calculateDistance(currentLoc, task.location);
    currentLoc = task.location;
  }
  
  const unoptimizedDuration = (unoptimizedDistance / 40) * 60 + 
    unoptimizedTasks.reduce((sum, t) => sum + t.estimatedDuration, 0);
  
  return Math.round(unoptimizedDuration - optimizedRoute.totalDuration);
}
