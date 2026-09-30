const ChartCard = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-navy-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
