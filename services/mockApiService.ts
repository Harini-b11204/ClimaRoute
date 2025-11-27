
import { DeliveryRecord, NotificationItem, RouteSegment, SpeedDataPoint, WeatherForecastItem, DailyForecastItem, RestPointItem } from '../types';

// --- Dummy Data Sets ---

const DELIVERY_HISTORY: DeliveryRecord[] = [
  { id: 'RT-8842', date: 'Oct 24, 2023', time: '08:30 AM', origin: 'Seattle Distribution Ctr', destination: 'Bellevue Electronics', weather: 'Rain', status: 'Completed', distance: '12.4 mi', duration: '45m' },
  { id: 'RT-8843', date: 'Oct 24, 2023', time: '10:15 AM', origin: 'Bellevue Electronics', destination: 'Redmond Logistics Hub', weather: 'Cloudy', status: 'Completed', distance: '8.2 mi', duration: '22m' },
  { id: 'RT-8844', date: 'Oct 25, 2023', time: '07:00 AM', origin: 'Tacoma Port', destination: 'Olympia Retail Park', weather: 'Fog', status: 'Delayed', distance: '30.5 mi', duration: '1h 10m' },
  { id: 'RT-8845', date: 'Oct 25, 2023', time: '01:45 PM', origin: 'Olympia Retail Park', destination: 'Centralia Warehouse', weather: 'Sunny', status: 'Completed', distance: '24.1 mi', duration: '35m' },
  { id: 'RT-8846', date: 'Oct 26, 2023', time: '09:00 AM', origin: 'Portland North', destination: 'Vancouver Depot', weather: 'Rain', status: 'In Progress', distance: '15.3 mi', duration: '--' },
  { id: 'RT-8847', date: 'Oct 26, 2023', time: '11:30 AM', origin: 'Vancouver Depot', destination: 'Salem Distribution', weather: 'Storm', status: 'Pending', distance: '45.0 mi', duration: '--' },
  { id: 'RT-8848', date: 'Oct 26, 2023', time: '02:00 PM', origin: 'Salem Distribution', destination: 'Eugene Logistics', weather: 'Rain', status: 'Pending', distance: '62.8 mi', duration: '--' },
  { id: 'RT-8849', date: 'Oct 27, 2023', time: '08:00 AM', origin: 'Eugene Logistics', destination: 'Roseburg Center', weather: 'Cloudy', status: 'Pending', distance: '70.2 mi', duration: '--' },
  { id: 'RT-8850', date: 'Oct 27, 2023', time: '12:00 PM', origin: 'Roseburg Center', destination: 'Medford Hub', weather: 'Sunny', status: 'Pending', distance: '98.5 mi', duration: '--' },
  { id: 'RT-8851', date: 'Oct 28, 2023', time: '09:15 AM', origin: 'Medford Hub', destination: 'Grants Pass Store', weather: 'Sunny', status: 'Pending', distance: '28.4 mi', duration: '--' },
];

const NOTIFICATIONS: NotificationItem[] = [
  { id: 'NOT-001', category: 'Critical', title: 'Severe Storm Warning', description: 'Hurricane warning in Sector 4. Re-routing advised immediately. Wind speeds exceeding 60mph.', timestamp: '10 min ago', read: false },
  { id: 'NOT-002', category: 'Route', title: 'Traffic Congestion Cleared', description: 'Congestion on I-90 Eastbound has cleared. Speed limits normalized to 60mph.', timestamp: '45 min ago', read: true },
  { id: 'NOT-003', category: 'Status', title: 'Delivery Completed', description: 'Shipment #8843 delivered successfully to Redmond Logistics Hub.', timestamp: '2 hours ago', read: true },
  { id: 'NOT-004', category: 'System', title: 'System Maintenance', description: 'Scheduled maintenance window: Oct 30, 02:00 AM - 04:00 AM EST.', timestamp: '5 hours ago', read: true },
  { id: 'NOT-005', category: 'General', title: 'Fuel Efficiency Report', description: 'Your weekly eco-driving score is 92/100. Great job!', timestamp: '1 day ago', read: true },
  { id: 'NOT-006', category: 'Route', title: 'Road Construction Alert', description: 'New construction on Hwy 99. Expect 10-15 min delays.', timestamp: '1 day ago', read: true },
  { id: 'NOT-007', category: 'Status', title: 'Vehicle Check Required', description: 'Mileage interval reached. Please schedule maintenance check.', timestamp: '2 days ago', read: true },
];

const SPEED_SEGMENTS: RouteSegment[] = [
  { id: 'SEG-01', name: 'I-5 Southbound (Mi 120-130)', roadType: 'Interstate', currentSpeed: 65, recommendedSpeed: 60, riskLevel: 'Low' },
  { id: 'SEG-02', name: 'Hwy 18 West (Mi 4-10)', roadType: 'Highway', currentSpeed: 55, recommendedSpeed: 45, riskLevel: 'Medium' },
  { id: 'SEG-03', name: 'Downtown Sector 4', roadType: 'Urban', currentSpeed: 30, recommendedSpeed: 25, riskLevel: 'High' },
  { id: 'SEG-04', name: 'Bridge 520 Crossing', roadType: 'Bridge', currentSpeed: 50, recommendedSpeed: 40, riskLevel: 'High' },
  { id: 'SEG-05', name: 'Rural Route 7', roadType: 'Rural', currentSpeed: 45, recommendedSpeed: 45, riskLevel: 'Low' },
];

const SPEED_TREND: SpeedDataPoint[] = [
  { time: '06:00', speed: 55, optimized: 55 },
  { time: '08:00', speed: 45, optimized: 50 },
  { time: '10:00', speed: 60, optimized: 60 },
  { time: '12:00', speed: 50, optimized: 55 },
  { time: '14:00', speed: 35, optimized: 45 },
  { time: '16:00', speed: 40, optimized: 45 },
  { time: '18:00', speed: 55, optimized: 55 },
  { time: '20:00', speed: 60, optimized: 60 },
  { time: '22:00', speed: 65, optimized: 65 },
];

const HOURLY_FORECAST: WeatherForecastItem[] = [
  { time: 'Now', temp: 68, condition: 'Cloudy' },
  { time: '1 PM', temp: 70, condition: 'Sunny' },
  { time: '2 PM', temp: 72, condition: 'Sunny' },
  { time: '3 PM', temp: 69, condition: 'Cloudy' },
  { time: '4 PM', temp: 65, condition: 'Rain' },
  { time: '5 PM', temp: 63, condition: 'Rain' },
  { time: '6 PM', temp: 61, condition: 'Storm' },
  { time: '7 PM', temp: 60, condition: 'Storm' },
];

const DAILY_FORECAST: DailyForecastItem[] = [
  { day: 'Mon', min: 62, max: 75, condition: 'Sunny' },
  { day: 'Tue', min: 60, max: 72, condition: 'Cloudy' },
  { day: 'Wed', min: 58, max: 68, condition: 'Rain' },
  { day: 'Thu', min: 55, max: 65, condition: 'Storm' },
  { day: 'Fri', min: 57, max: 69, condition: 'Rain' },
  { day: 'Sat', min: 60, max: 74, condition: 'Sunny' },
  { day: 'Sun', min: 62, max: 76, condition: 'Sunny' },
];

const REST_POINTS: RestPointItem[] = [
  { id: 'RP-01', name: 'Pilot Travel Center #452', type: 'Truck Stop', distance: '12.4 mi', safetyRating: 'High', facilities: ['Fuel', 'Showers', 'Parking (50+)', 'WiFi', 'Food'] },
  { id: 'RP-02', name: 'I-5 Rest Area South', type: 'Rest Area', distance: '28.1 mi', safetyRating: 'Medium', facilities: ['Restrooms', 'Vending', 'Parking (Small)'] },
  { id: 'RP-03', name: 'Love\'s Travel Stop', type: 'Truck Stop', distance: '45.3 mi', safetyRating: 'High', facilities: ['Fuel', 'Tire Care', 'Parking (100+)', 'Showers', 'Subway'] },
  { id: 'RP-04', name: 'SafeHaven Secure Parking', type: 'Secure Parking', distance: '52.0 mi', safetyRating: 'High', facilities: ['Gated', 'CCTV', 'Security Guard'] },
  { id: 'RP-05', name: 'Joe\'s Diner & Park', type: 'Diner', distance: '8.5 mi', safetyRating: 'Low', facilities: ['Food', 'Parking (Limited)'] },
];

// --- Mock Service ---

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getDeliveryHistory: async (): Promise<DeliveryRecord[]> => {
    await delay(600);
    return DELIVERY_HISTORY;
  },

  getNotifications: async (): Promise<NotificationItem[]> => {
    await delay(400);
    return NOTIFICATIONS;
  },

  getSpeedAnalytics: async () => {
    await delay(500);
    return {
      segments: SPEED_SEGMENTS,
      trend: SPEED_TREND,
      currentRec: 45,
      impact: {
        fuelSaved: 2.4,
        co2Reduced: 12,
        engineStrain: 5
      }
    };
  },

  getWeatherForecast: async () => {
    await delay(300);
    return {
      current: { temp: 68, condition: 'Cloudy', humidity: 65, wind: 12 },
      hourly: HOURLY_FORECAST,
      daily: DAILY_FORECAST
    };
  },

  searchRestPoints: async (filters: any): Promise<RestPointItem[]> => {
    await delay(800);
    // Simulate filtering
    return REST_POINTS;
  }
};
