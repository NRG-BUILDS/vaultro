import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./card";

/**
 * RangeSlider - A reusable dual-handle range slider component
 *
 * @param {Object} props
 * @param {number} props.minValue - Minimum possible value for the range
 * @param {number} props.maxValue - Maximum possible value for the range
 * @param {number} props.initialFrom - Initial value for the 'from' handle
 * @param {number} props.initialTo - Initial value for the 'to' handle
 * @param {boolean} props.isPercentage - Whether to display values as percentages
 * @param {Function} props.onChange - Callback function when values change, receives {from, to} object
 * @param {string} props.primaryColor - Color for the active track (default: "purple")
 * @param {string} props.secondaryColor - Color for the inactive track (default: "gray")
 * @param {string} props.fromLabel - Custom label for the "From" field (default: "From:")
 * @param {string} props.toLabel - Custom label for the "To" field (default: "To:")
 * @param {boolean} props.hideInputs - Whether to hide the input fields (default: false)
 * @param {boolean} props.disabled - Whether the slider is disabled (default: false)
 */
export default function RangeSlider({
  minValue = 0,
  maxValue = 100,
  initialFrom = null,
  initialTo = null,
  isPercentage = false,
  onChange = () => {},
  primaryColor = "purple",
  secondaryColor = "gray",
  fromLabel = "From:",
  toLabel = "To:",
  hideInputs = false,
  disabled = false,
}) {
  // Initialize with props or defaults
  const [range, setRange] = useState({
    from: initialFrom !== null ? initialFrom : minValue,
    to: initialTo !== null ? initialTo : maxValue,
  });

  // For custom slider styling and positioning
  const sliderTrackRef = useRef(null);

  // Update parent component when range changes
  useEffect(() => {
    //@ts-ignore
    onChange(range);
  }, [range, onChange]);

  // Handle changes when props update
  useEffect(() => {
    // Only update if the values are different to prevent loops
    const shouldUpdateFrom = initialFrom !== null && initialFrom !== range.from;
    const shouldUpdateTo = initialTo !== null && initialTo !== range.to;

    if (shouldUpdateFrom || shouldUpdateTo) {
      setRange({
        from: shouldUpdateFrom ? initialFrom : range.from,
        to: shouldUpdateTo ? initialTo : range.to,
      });
    }
  }, [initialFrom, initialTo]);

  const handleFromChange = (e) => {
    if (disabled) return;

    let value = e.target.value;
    if (isPercentage) {
      // Remove % sign if present
      value = value.replace("%", "");
    }

    // Parse as number and validate
    value = parseInt(value.replace(/[^\d.-]/g, "") || "0", 10);

    // Constrain within min/max and not greater than 'to'
    value = Math.max(minValue, Math.min(range.to, value));

    setRange({ ...range, from: value });
  };

  const handleToChange = (e) => {
    if (disabled) return;

    let value = e.target.value;
    if (isPercentage) {
      // Remove % sign if present
      value = value.replace("%", "");
    }

    // Parse as number and validate
    value = parseInt(value.replace(/[^\d.-]/g, "") || "0", 10);

    // Constrain within min/max and not less than 'from'
    value = Math.min(maxValue, Math.max(range.from, value));

    setRange({ ...range, to: value });
  };

  // Calculate position percentages for the handles
  const fromPosition = ((range.from - minValue) / (maxValue - minValue)) * 100;
  const toPosition = ((range.to - minValue) / (maxValue - minValue)) * 100;

  // Custom slider dragging logic
  const [activeDrag, setActiveDrag] = useState(null);

  const handleMouseDown = (handle) => (e) => {
    if (disabled) return;

    e.preventDefault();
    setActiveDrag(handle);

    const handleMouseMove = (moveEvent) => {
      if (sliderTrackRef.current) {
        const rect = sliderTrackRef.current.getBoundingClientRect();
        const x = moveEvent.clientX - rect.left;
        const percentage = Math.min(Math.max(x / rect.width, 0), 1);
        const value = Math.round(minValue + percentage * (maxValue - minValue));

        if (handle === "from" && value <= range.to) {
          setRange({ ...range, from: value });
        } else if (handle === "to" && value >= range.from) {
          setRange({ ...range, to: value });
        }
      }
    };

    const handleMouseUp = () => {
      setActiveDrag(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Format values for display
  const formatValue = (value) => {
    if (isPercentage) {
      return `${value}%`;
    }

    // Format large numbers with commas
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle track click
  const handleTrackClick = (e) => {
    if (disabled || !sliderTrackRef.current) return;

    const rect = sliderTrackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const value = Math.round(minValue + percentage * (maxValue - minValue));

    // Determine which handle to move based on proximity
    const fromDistance = Math.abs(
      percentage - (range.from - minValue) / (maxValue - minValue)
    );
    const toDistance = Math.abs(
      percentage - (range.to - minValue) / (maxValue - minValue)
    );

    if (fromDistance <= toDistance) {
      setRange({ ...range, from: value });
    } else {
      setRange({ ...range, to: value });
    }
  };

  // Define color classes based on props
  const colorClasses = {
    primary: {
      track: `bg-${primaryColor}-500`,
      handle: `bg-white ring-2 ring-primary`,
    },
    secondary: {
      track: `bg-border`,
    },
    disabled: {
      track: "bg-gray-600",
      handle: "bg-gray-400",
    },
  };

  return (
    <div className="bg-card rounded-lg w-full">
      <CardContent className="md:p-4">
        {!hideInputs && (
          <div className="flex justify-between mb-4">
            <div className="flex flex-col w-1/2 pr-2">
              <label className="mb-2 text-sm font-medium">{fromLabel}</label>
              <input
                type="text"
                value={formatValue(range.from)}
                onChange={handleFromChange}
                disabled={disabled}
                className={`
                border rounded-md p-2 text-s
                focus:outline-none focus:border-${primaryColor}-500
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              />
            </div>
            <div className="flex flex-col w-1/2 pl-2">
              <label className="mb-2 text-sm font-medium">{toLabel}</label>
              <input
                type="text"
                value={formatValue(range.to)}
                onChange={handleToChange}
                disabled={disabled}
                className={`
                border rounded-md p-2 text-s
                focus:outline-none focus:border-${primaryColor}-500
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              />
            </div>
          </div>
        )}

        <div className={`mt-${hideInputs ? "0" : "6"} mb-4`}>
          <div
            ref={sliderTrackRef}
            className={`relative h-1 ${
              colorClasses.secondary.track
            } rounded-lg ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleTrackClick}
          >
            {/* Active range highlight */}
            <div
              className={`absolute h-1 ${
                disabled
                  ? colorClasses.disabled.track
                  : colorClasses.primary.track
              } rounded-lg`}
              style={{
                left: `${fromPosition}%`,
                width: `${toPosition - fromPosition}%`,
              }}
            ></div>

            {/* From handle */}
            <div
              className={`
              absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md 
              ${
                disabled
                  ? colorClasses.disabled.handle
                  : colorClasses.primary.handle
              }
              ${
                disabled
                  ? "cursor-not-allowed"
                  : "cursor-grab active:cursor-grabbing"
              }
            `}
              style={{ left: `calc(${fromPosition}% - 8px)` }}
              onMouseDown={handleMouseDown("from")}
            ></div>

            {/* To handle */}
            <div
              className={`
              absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md 
              ${
                disabled
                  ? colorClasses.disabled.handle
                  : colorClasses.primary.handle
              }
              ${
                disabled
                  ? "cursor-not-allowed"
                  : "cursor-grab active:cursor-grabbing"
              }
            `}
              style={{ left: `calc(${toPosition}% - 8px)` }}
              onMouseDown={handleMouseDown("to")}
            ></div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
