"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

interface TimeState {
  hour: number;
  minute: number;
  ampm: "AM" | "PM";
}

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

  // Time conversion utilities
  const timeToMinutes = (time: TimeState): number => {
    let hours = time.hour;
    if (time.ampm === "AM" && hours === 12) hours = 0;
    if (time.ampm === "PM" && hours !== 12) hours += 12;
    return hours * 60 + time.minute;
  };

  const minutesToTimeString = (minutes: number): string => {
    const totalMins = ((minutes % 1440) + 1440) % 1440; // Handle negative and overflow
    let hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    
    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;
    
    return `${hours}:${mins.toString().padStart(2, '0')} ${ampm}`;
  };

  // Calculate bedtimes based on wake up time
  const calculateBedtimes = () => {
    const wakeMinutes = timeToMinutes(wakeUpTime);
    const fallAsleepOffset = 14; // 14 minutes to fall asleep
    const cycleLengths = [6 * 60, 7.5 * 60, 9 * 60]; // 6, 7.5, 9 hours in minutes
    
    const bedtimes = cycleLengths.map(cycleLength => {
      const bedtime = wakeMinutes - cycleLength - fallAsleepOffset;
      return minutesToTimeString(bedtime);
    });
    
    setBedtimeResults(bedtimes);
  };

  // Calculate wake up times from current time
  const calculateWakeUpNow = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const fallAsleepOffset = 14;
    const cycleLengths = [6 * 60, 7.5 * 60, 9 * 60];
    
    const wakeUpTimes = cycleLengths.map(cycleLength => {
      const wakeTime = currentMinutes + fallAsleepOffset + cycleLength;
      return minutesToTimeString(wakeTime);
    });
    
    setWakeUpNowResults(wakeUpTimes);
  };

  // Calculate wake up times from planned fall asleep time
  const calculateFromFallAsleep = () => {
    const fallAsleepMinutes = timeToMinutes(fallAsleepTime);
    const fallAsleepOffset = 14;
    const cycleLengths = [6 * 60, 7.5 * 60, 9 * 60];
    
    const wakeUpTimes = cycleLengths.map(cycleLength => {
      const wakeTime = fallAsleepMinutes + fallAsleepOffset + cycleLength;
      return minutesToTimeString(wakeTime);
    });
    
    setFallAsleepResults(wakeUpTimes);
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
          {[0, 15, 30, 45].map(minute => (
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

        {/* Section 1: Wake up time */}
        <div className="space-y-4">
          <TimeDropdowns 
            time={wakeUpTime}
            onChange={setWakeUpTime}
            label="I have to wake up at..."
          />
          <Button 
            onClick={calculateBedtimes}
            className="w-full bg-[#89CFF0] hover:bg-[#6AB8E0] text-slate-900 font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#89CFF0]/20"
          >
            Calculate
          </Button>
          <ResultDisplay results={bedtimeResults} label="You should go to bed at:" />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* Section 2: Go to bed now */}
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-medium text-white">If you go to bed NOW, you should wake up at...</h2>
          <Button 
            onClick={calculateWakeUpNow}
            className="w-32 h-16 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xl rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            ZZZ
          </Button>
          <ResultDisplay results={wakeUpNowResults} label="Wake up at:" />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* Section 3: Fall asleep time */}
        <div className="space-y-4">
          <TimeDropdowns 
            time={fallAsleepTime}
            onChange={setFallAsleepTime}
            label="I plan to FALL ASLEEP at..."
          />
          <Button 
            onClick={calculateFromFallAsleep}
            className="w-full bg-[#89CFF0] hover:bg-[#6AB8E0] text-slate-900 font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#89CFF0]/20"
          >
            Calculate
          </Button>
          <ResultDisplay results={fallAsleepResults} label="You should wake up at:" />
        </div>
      </div>
    </div>
  );
}