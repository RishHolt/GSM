const SummaryCard = ({ title, value, icon, trend, type = 'primary' }) => {
  // Define color schemes based on type
  const colorSchemes = {
    primary: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    success: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    danger: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
  };

  return (
    <div className={`p-4 rounded-lg ${colorSchemes[type]} transition-all duration-300 hover:scale-105`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="mb-2 font-bold text-3xl">{value}</div>
      {trend && (
        <div className="opacity-75 text-sm">{trend}</div>
      )}
    </div>
  );
};

export default SummaryCard;
