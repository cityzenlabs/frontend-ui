import React, { useState, useRef, useEffect } from "react";

function IDatePicker({ placeholder, label, onChange }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const days: Date[] = [];
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= lastDayOfMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const getStartDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = (): void => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleNextMonth = (): void => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) setCurrentYear((prevYear) => prevYear + 1);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 for accurate comparison

  const handleDateSelect = (day: Date): void => {
    if (day >= today) {
      setSelectedDate(day);
      setIsOpen(false);
      onChange(day);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const days = getDaysInMonth(currentYear, currentMonth);
  const startDay = getStartDayOfMonth(currentYear, currentMonth);

  // Parse and format the placeholder date
  const formattedPlaceholder = placeholder
    ? new Date(placeholder).toLocaleDateString("en-US")
    : "";

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <label className=" text-sm font-thin ">{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <div className="pointer-events-none">
          {/* Icon */}
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-3"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          value={selectedDate ? selectedDate.toLocaleDateString("en-US") : ""}
          placeholder={formattedPlaceholder || "Select date"}
          className="bg-transparent focus:outline-none"
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <button onClick={handlePrevMonth}>&lt;</button>
            <span>{`${new Date(currentYear, currentMonth).toLocaleString(
              "default",
              { month: "long" },
            )} ${currentYear}`}</span>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysOfWeek.map((dayName) => (
              <div key={dayName} className="font-medium">
                {dayName}
              </div>
            ))}
            {Array.from({ length: startDay }, (_, i) => (
              <div key={i} className="py-1"></div> // Empty cells
            ))}
            {days.map((day) => (
              <button
                key={day.toString()}
                disabled={day < today} // Disable past dates
                className={`py-1 px-2 rounded-full ${
                  selectedDate?.toLocaleDateString("en-US") ===
                  day.toLocaleDateString("en-US")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                } ${day < today ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handleDateSelect(day)}
              >
                {day.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default IDatePicker;
