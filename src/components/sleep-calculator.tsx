"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

interface TimeState {
  hour: number;
  minute: number;
  ampm: "AM" | "PM";
}

const CYCLE_MIN = 90;
const SLEEP_LATENCY_MIN = 14;

export default function SleepCalculator() {
  const [wakeUpTime, setWakeUpTime] = useState<TimeState>({
    hour: 7,
    minute: 0,
    ampm: "AM"
  });
  
  const [fallAsleepTime, setFallAsleepTime] = useState<TimeState>({
    hour: 11,
    minute: 0,
    ampm: "PM"
  });

  const [bedtimeResults, setBedtimeResults] = useState<string[]>([]);
  const [wakeUpNowResults, setWakeUpNowResults] = useState<string[]>([]);
  const [fallAsleepResults, setFallAsleepResults] = useState<string[]>([]);
  
  const [calculatingBedtime, setCalculatingBedtime] = useState(false);
  const [calculatingWakeNow, setCalculatingWakeNow] = useState(false);
  const [calculatingFallAsleep, setCalculatingFallAsleep] = useState(false);

  // Time conversion utilities
  const timeToDate = (time: TimeState, baseDate?: Date): Date => {
    const date = baseDate ? new Date(baseDate) : new Date();
    let hours = time.hour;
    if (time.ampm === "AM" && hours === 12) hours = 0;
    if (time.ampm === "PM" && hours !== 12) hours += 12;
    
    date.setHours(hours, time.minute, 0, 0);
    
    // If time has passed today, treat as tomorrow
    if (!baseDate && date < new Date()) {
      date.setDate(date.getDate() + 1);
    }
    
    return date;
  };

  const formatTime = (date: Date, referenceDate: Date = new Date()): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    
    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;
    
    // Check if it's tomorrow
    const tomorrow = date.getDate() !== referenceDate.getDate() || 
                    date.getMonth() !== referenceDate.getMonth() ||
                    date.getFullYear() !== referenceDate.getFullYear();
    
    const timeStr = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return tomorrow ? `${timeStr} (tomorrow)` : timeStr;
  };

  // Section A: Calculate fall-asleep times based on wake up time
  const calculateBedtimes = async () => {
    setCalculatingBedtime(true);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const wakeTime = timeToDate(wakeUpTime);
    const sleepStart = new Date(wakeTime.getTime() - SLEEP_LATENCY_MIN * 60 * 1000);
    
    const fallAsleepTimes = [];
    for (let n = 1; n <= 6; n++) {
      const fallAsleepTime = new Date(sleepStart.getTime() - n * CYCLE_MIN * 60 * 1000);
      fallAsleepTimes.push(formatTime(fallAsleepTime));
    }
    
    setBedtimeResults(fallAsleepTimes);
    setCalculatingBedtime(false);
  };

  // Section B: Calculate wake up times from current time
  const calculateWakeUpNow = async () => {
    setCalculatingWakeNow(true);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const now = new Date();
    const sleepStart = new Date(now.getTime() + SLEEP_LATENCY_MIN * 60 * 1000);
    
    const wakeUpTimes = [];
    for (let n = 1; n <= 6; n++) {
      const wakeTime = new Date(sleepStart.getTime() + n * CYCLE_MIN * 60 * 1000);
      wakeUpTimes.push(formatTime(wakeTime, now));
    }
    
    setWakeUpNowResults(wakeUpTimes);
    setCalculatingWakeNow(false);
  };

  // Section C: Calculate wake up times from planned fall asleep time
  const calculateFromFallAsleep = async () => {
    setCalculatingFallAsleep(true);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const fallAsleepDate = timeToDate(fallAsleepTime);
    
    const wakeUpTimes = [];
    for (let n = 1; n <= 6; n++) {
      const wakeTime = new Date(fallAsleepDate.getTime() + n * CYCLE_MIN * 60 * 1000);
      wakeUpTimes.push(formatTime(wakeTime));
    }
    
    setFallAsleepResults(wakeUpTimes);
    setCalculatingFallAsleep(false);
  };

  const isTimeValid = (time: TimeState) => {
    return time.hour >= 1 && time.hour <= 12 && 
           time.minute >= 0 && time.minute <= 59 &&
           (time.ampm === "AM" || time.ampm === "PM");
  };

  const TimeDropdowns = ({ 
    time, 
    onChange, 
    label 
  }: { 
    time: TimeState; 
    onChange: (time: TimeState) => void;
    label: string;
  }) => (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-center text-white">{label}</h2>
      <div className="flex gap-3 justify-center">
        <select 
          value={time.hour}
          onChange={(e) => onChange({...time, hour: parseInt(e.target.value)})}
          className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-[#89CFF0] focus:outline-none"
        >
          {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
        
        <select 
          value={time.minute}
          onChange={(e) => onChange({...time, minute: parseInt(e.target.value)})}
          className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-[#89CFF0] focus:outline-none"
        >
          {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(minute => (
            <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
          ))}
        </select>
        
        <select 
          value={time.ampm}
          onChange={(e) => onChange({...time, ampm: e.target.value as "AM" | "PM"})}
          className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-[#89CFF0] focus:outline-none"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      {!isTimeValid(time) && (
        <p className="text-xs text-red-400 text-center">Select hour, minute, and AM/PM.</p>
      )}
    </div>
  );

  const ResultDisplay = ({ results, label }: { results: string[]; label: string }) => (
    results.length > 0 && (
      <div className="text-center mt-6 space-y-2">
        <p className="text-[#89CFF0] text-sm font-medium">{label}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {results.map((time, index) => (
            <span key={index} className="text-white text-lg font-bold">
              {time}
              {index < results.length - 1 && <span className="text-[#89CFF0] ml-2">or</span>}
            </span>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white py-8 px-4">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Sleep Calculator Onchain</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-[#89CFF0] to-slate-300 mx-auto rounded-full"></div>
        </div>

        {/* Section A: Wake up time */}
        <div className="space-y-4">
          <TimeDropdowns 
            time={wakeUpTime}
            onChange={setWakeUpTime}
            label="I have to wake up at..."
          />
          <Button 
            onClick={calculateBedtimes}
            disabled={!isTimeValid(wakeUpTime) || calculatingBedtime}
            aria-label="Calculate fall-asleep times for my wake-up time"
            className="w-full bg-[#89CFF0] hover:bg-[#6AB8E0] text-slate-900 font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#89CFF0]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {calculatingBedtime ? "Calculating..." : "Calculate"}
          </Button>
          <ResultDisplay results={bedtimeResults} label="Try to fall asleep at:" />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* Section B: Go to bed now */}
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-medium text-white">If you go to bed NOW, you should wake up at...</h2>
          <Button 
            onClick={calculateWakeUpNow}
            disabled={calculatingWakeNow}
            aria-label="Calculate wake-up times if I go to bed now"
            className="w-32 h-16 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xl rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {calculatingWakeNow ? "Calculating..." : "Sleep Now💤"}
          </Button>
          <ResultDisplay results={wakeUpNowResults} label="Wake up at:" />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* Section C: Fall asleep time */}
        <div className="space-y-4">
          <TimeDropdowns 
            time={fallAsleepTime}
            onChange={setFallAsleepTime}
            label="I plan to FALL ASLEEP at..."
          />
          <Button 
            onClick={calculateFromFallAsleep}
            disabled={!isTimeValid(fallAsleepTime) || calculatingFallAsleep}
            aria-label="Calculate wake-up times for my fall-asleep time"
            className="w-full bg-[#89CFF0] hover:bg-[#6AB8E0] text-slate-900 font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#89CFF0]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {calculatingFallAsleep ? "Calculating..." : "Calculate"}
          </Button>
          <ResultDisplay results={fallAsleepResults} label="Try to wake up at:" />
        </div>

        {/* Fine print footer */}
        <div className="text-center mt-8 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            Assumes ~14 min to fall asleep • 1 cycle ≈ 90 min • Best results: 5–6 cycles
          </p>
        </div>
      </div>
    </div>
  );
}