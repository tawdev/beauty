'use client';

import { useMemo, useState } from 'react';
import { format, parse, isValid, startOfDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, ChevronDown, Sun, Sunset, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Calendar } from '@/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { cn } from '@/app/components/ui/utils';

const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 18 && minute === 30) break;
      slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }
  }
  return slots;
})();

function parseDate(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(parsed) ? parsed : undefined;
}

function formatTimeLabel(value: string) {
  const parsed = parse(value, 'HH:mm', new Date());
  return isValid(parsed) ? format(parsed, 'h:mm a') : value;
}

interface BookingDateTimePickerProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export function BookingDateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
}: BookingDateTimePickerProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const selectedDate = parseDate(date);
  const today = startOfDay(new Date());

  const { morningSlots, afternoonSlots } = useMemo(() => {
    const morning = TIME_SLOTS.filter((t) => parseInt(t.split(':')[0], 10) < 13);
    const afternoon = TIME_SLOTS.filter((t) => parseInt(t.split(':')[0], 10) >= 13);
    return { morningSlots: morning, afternoonSlots: afternoon };
  }, []);

  const triggerBase =
    'w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-gray-200 bg-[#FDF6F0] text-left transition-all duration-300 hover:border-[#CBA135]/50 hover:shadow-md focus:outline-none focus:border-[#CBA135] focus:ring-2 focus:ring-[#CBA135]/20';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Date popover */}
      <div>
        <label className="block mb-2 text-[#2B2B2B] font-medium flex items-center gap-2">
          <CalendarIcon size={18} className="text-[#CBA135]" />
          Preferred Date
        </label>
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <button type="button" className={cn(triggerBase, dateOpen && 'border-[#CBA135] ring-2 ring-[#CBA135]/20')}>
              <span className="flex items-center gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#CBA135]/15 text-[#CBA135]">
                  <CalendarIcon size={18} />
                </span>
                <span className="min-w-0">
                  {selectedDate ? (
                    <>
                      <span className="block text-sm font-bold text-[#2B2B2B] truncate">
                        {format(selectedDate, 'EEEE, MMM d')}
                      </span>
                      <span className="block text-xs text-gray-500">{format(selectedDate, 'yyyy')}</span>
                    </>
                  ) : (
                    <>
                      <span className="block text-sm font-semibold text-gray-500">Choose a date</span>
                      <span className="block text-xs text-gray-400">Tap to open calendar</span>
                    </>
                  )}
                </span>
              </span>
              <ChevronDown
                size={18}
                className={cn('shrink-0 text-gray-400 transition-transform duration-300', dateOpen && 'rotate-180 text-[#CBA135]')}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={8}
            className="w-auto p-0 border-0 bg-transparent shadow-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="overflow-hidden rounded-2xl border border-[#CBA135]/20 bg-white shadow-2xl shadow-[#CBA135]/10"
            >
              <div className="bg-gradient-to-r from-[#CBA135] to-[#E8B4B8] px-4 py-3 text-white">
                <p className="text-xs font-bold uppercase tracking-widest opacity-90">Select date</p>
                <p className="text-sm font-semibold flex items-center gap-1.5">
                  <Sparkles size={14} />
                  Your salon moment awaits
                </p>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(day) => {
                  if (day) {
                    onDateChange(format(day, 'yyyy-MM-dd'));
                    setDateOpen(false);
                    setTimeout(() => setTimeOpen(true), 200);
                  }
                }}
                disabled={{ before: today }}
                defaultMonth={selectedDate ?? today}
                className="p-4"
                classNames={{
                  caption_label: 'text-base font-bold text-[#2B2B2B]',
                  day_selected:
                    '!bg-[#CBA135] !text-white hover:!bg-[#B8912F] hover:!text-white focus:!bg-[#CBA135] focus:!text-white rounded-full',
                  day_today: 'bg-[#FDF6F0] text-[#CBA135] font-bold rounded-full ring-1 ring-[#CBA135]/40',
                  day: 'rounded-full hover:bg-[#CBA135]/15 hover:text-[#2B2B2B]',
                  nav_button:
                    'border border-gray-200 hover:bg-[#FDF6F0] hover:border-[#CBA135]/40 rounded-lg',
                }}
              />
            </motion.div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Time popover */}
      <div>
        <label className="block mb-2 text-[#2B2B2B] font-medium flex items-center gap-2">
          <Clock size={18} className="text-[#CBA135]" />
          Preferred Time
        </label>
        <Popover open={timeOpen} onOpenChange={setTimeOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={!date}
              className={cn(
                triggerBase,
                timeOpen && 'border-[#CBA135] ring-2 ring-[#CBA135]/20',
                !date && 'opacity-60 cursor-not-allowed hover:shadow-none hover:border-gray-200'
              )}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#CBA135]/15 text-[#CBA135]">
                  <Clock size={18} />
                </span>
                <span className="min-w-0">
                  {time ? (
                    <>
                      <span className="block text-sm font-bold text-[#2B2B2B]">{formatTimeLabel(time)}</span>
                      <span className="block text-xs text-gray-500">30 min session slot</span>
                    </>
                  ) : (
                    <>
                      <span className="block text-sm font-semibold text-gray-500">
                        {date ? 'Choose a time' : 'Pick a date first'}
                      </span>
                      <span className="block text-xs text-gray-400">Available 9:00 AM – 6:00 PM</span>
                    </>
                  )}
                </span>
              </span>
              <ChevronDown
                size={18}
                className={cn('shrink-0 text-gray-400 transition-transform duration-300', timeOpen && 'rotate-180 text-[#CBA135]')}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={8}
            className="w-[min(100vw-2rem,340px)] p-0 border-0 bg-transparent shadow-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="overflow-hidden rounded-2xl border border-[#CBA135]/20 bg-white shadow-2xl shadow-[#CBA135]/10"
            >
              <div className="bg-gradient-to-r from-[#2B2B2B] to-[#4a4a4a] px-4 py-3 text-white">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Available slots</p>
                <p className="text-sm font-semibold">
                  {selectedDate ? format(selectedDate, 'EEEE, MMM d') : 'Select a date'}
                </p>
              </div>

              <div className="p-4 max-h-[280px] overflow-y-auto space-y-4">
                <TimeSlotGroup
                  icon={<Sun size={14} />}
                  label="Morning"
                  slots={morningSlots}
                  selected={time}
                  onSelect={(slot) => {
                    onTimeChange(slot);
                    setTimeOpen(false);
                  }}
                />
                <TimeSlotGroup
                  icon={<Sunset size={14} />}
                  label="Afternoon"
                  slots={afternoonSlots}
                  selected={time}
                  onSelect={(slot) => {
                    onTimeChange(slot);
                    setTimeOpen(false);
                  }}
                />
              </div>
            </motion.div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function TimeSlotGroup({
  icon,
  label,
  slots,
  selected,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  slots: string[];
  selected: string;
  onSelect: (slot: string) => void;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
        {icon}
        {label}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot) => {
          const isSelected = selected === slot;
          return (
            <motion.button
              key={slot}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(slot)}
              className={cn(
                'rounded-xl px-2 py-2.5 text-xs font-bold transition-colors duration-200',
                isSelected
                  ? 'bg-[#CBA135] text-white shadow-md shadow-[#CBA135]/30'
                  : 'bg-[#FDF6F0] text-[#2B2B2B] border border-gray-100 hover:border-[#CBA135]/40 hover:bg-[#CBA135]/10'
              )}
            >
              {formatTimeLabel(slot)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
