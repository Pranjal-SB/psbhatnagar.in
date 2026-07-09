interface AmbientProps {
  active: number;
}

export function Ambient({ active }: AmbientProps) {
  return (
    <div className="ambient" data-active={active} aria-hidden>
      <div className="amb-anchor amb-orb-a"><div className="amb-core" /></div>
      <div className="amb-anchor amb-orb-b"><div className="amb-core" /></div>
      <div className="amb-anchor amb-ring"><div className="amb-core amb-ring-core" /></div>
    </div>
  );
}
