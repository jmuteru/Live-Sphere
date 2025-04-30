export enum EventType {
  NATURAL_DISASTER = 'Natural Disaster',
  POLITICAL = 'Political',
  ECONOMIC = 'Economic',
  SOCIAL = 'Social',
  ENVIRONMENTAL = 'Environmental',
  HEALTH = 'Health',
  TECHNOLOGY = 'Technology',
  SECURITY = 'Security'
}

export type ImpactLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Event {
  id: string;
  title: string;
  description: string;
  country: string;
  coordinates: [number, number]; // [latitude, longitude]
  type: string;
  impactLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  date: string;
}

// Sample events data
export const events: Event[] = [
  {
    id: '1',
    title: 'Major Economic Reform in Japan',
    description: 'Japan announces comprehensive economic reform package aimed at boosting growth.',
    country: 'Japan',
    coordinates: [36.2048, 138.2529],
    type: 'Economic',
    impactLevel: 'High',
    date: '2024-03-15',
  },
  {
    id: '2',
    title: 'Tech Innovation Hub Launch in India',
    description: 'New technology innovation hub opens in Bangalore, attracting global investors.',
    country: 'India',
    coordinates: [20.5937, 78.9629],
    type: 'Technology',
    impactLevel: 'Medium',
    date: '2024-03-14',
  },
  {
    id: '3',
    title: 'Environmental Summit in Brazil',
    description: 'International climate conference discusses Amazon preservation strategies.',
    country: 'Brazil',
    coordinates: [-14.2350, -51.9253],
    type: 'Environmental',
    impactLevel: 'High',
    date: '2024-03-13',
  },
  {
    id: '4',
    title: 'Trade Agreement in EU',
    description: 'European Union finalizes major trade agreement with Asian partners.',
    country: 'Belgium',
    coordinates: [50.8503, 4.3517],
    type: 'Trade',
    impactLevel: 'High',
    date: '2024-03-12',
  },
  {
    id: '5',
    title: 'Infrastructure Project in Australia',
    description: 'Launch of major renewable energy infrastructure project in Western Australia.',
    country: 'Australia',
    coordinates: [-25.2744, 133.7751],
    type: 'Infrastructure',
    impactLevel: 'Medium',
    date: '2024-03-11',
  }
]; 