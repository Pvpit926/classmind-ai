const EmptyState = ({ icon = '📭', title, message, action, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-navy-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm mb-6">{message}</p>
      {action}
    </div>
  );
};

export default EmptyState;
