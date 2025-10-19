import React from 'react';

export interface Spec {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}

export interface SpecsGridProps {
  specs: Spec[];
  columns?: 2 | 3 | 4;
  title?: string;
  cardClassName?: string;
  className?: string;
}

export const SpecsGrid: React.FC<SpecsGridProps> = ({
  specs,
  columns = 3,
  title,
  cardClassName = 'bg-muted/30',
  className = ''
}) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  }[columns];

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      )}
      <div className={`grid ${gridCols} gap-4`}>
        {specs.map((spec, index) => (
          <div key={index} className={`${cardClassName} p-4 rounded-lg`}>
            {spec.icon && (
              <div className="mb-2">{spec.icon}</div>
            )}
            <h3 className="text-sm font-medium text-muted-foreground">{spec.label}</h3>
            <p className="font-medium text-lg">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecsGrid;
