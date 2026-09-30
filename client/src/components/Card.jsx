const Card = ({ children, className = '', hover = false, padding = 'p-6', onClick, ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-card transition-all duration-300 ${
        hover ? 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer' : ''
      } ${padding} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
