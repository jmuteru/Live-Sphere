import React, { useState } from 'react';
import ReactGlobe from 'react-globe.gl';
import { Event } from '@/data/events';

interface GlobeProps {
  events: Event[];
  onCountryClick: (country: string) => void;
}

const Globe: React.FC<GlobeProps> = ({ events, onCountryClick }) => {
  const [hoverD, setHoverD] = useState<Event | null>(null);

  const globeConfig = {
    pointRadius: 0.5,
    pointColor: (d: Event) => {
      switch (d.impactLevel) {
        case 'Critical':
          return 'red';
        case 'High':
          return 'orange';
        case 'Medium':
          return 'yellow';
        case 'Low':
          return 'green';
        default:
          return 'white';
      }
    },
    pointAltitude: 0.1,
    pointLabel: (d: Event) => `
      <div style="color: white; background: rgba(0,0,0,0.8); padding: 8px; border-radius: 4px;">
        <div><b>${d.title}</b></div>
        <div>${d.description}</div>
        <div>Impact: ${d.impactLevel}</div>
        <div>Date: ${d.date}</div>
      </div>
    `
  };

  const points = events.map(event => ({
    ...event,
    lat: event.coordinates[0],
    lng: event.coordinates[1]
  }));

  return (
    <ReactGlobe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      pointsData={points}
      pointRadius={globeConfig.pointRadius}
      pointColor={globeConfig.pointColor}
      pointAltitude={globeConfig.pointAltitude}
      pointLabel={globeConfig.pointLabel}
      onPointHover={setHoverD}
      onGlobeClick={() => onCountryClick('')}
      backgroundColor="rgba(0,0,0,0)"
    />
  );
};

export default Globe; 