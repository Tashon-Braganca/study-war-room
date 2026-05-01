import { DAILY_BLOCKS, PLAN_START, PLAN_DAYS } from './data';

// Generate an .ics (iCalendar) file string for the full 30-day schedule
// This can be downloaded and imported into Google Calendar, Apple Calendar, etc.

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

function toICSDate(date: Date, hour: number, minute: number): string {
  const d = new Date(date);
  d.setHours(hour, minute, 0, 0);
  // Convert to UTC for ICS format
  const y = d.getUTCFullYear();
  const mo = pad2(d.getUTCMonth() + 1);
  const da = pad2(d.getUTCDate());
  const h = pad2(d.getUTCHours());
  const mi = pad2(d.getUTCMinutes());
  return `${y}${mo}${da}T${h}${mi}00Z`;
}

function escapeICS(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export function generateICSFile(): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Study War Room//30-Day Sprint//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Study War Room - 30 Day Sprint',
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  for (let day = 0; day < PLAN_DAYS; day++) {
    const date = new Date(PLAN_START);
    date.setDate(date.getDate() + day);

    for (const block of DAILY_BLOCKS) {
      if (block.category === 'personal') continue; // Skip personal time

      let endHour = block.endHour;
      let endMinute = block.endMinute;
      // Handle midnight crossover
      if (endHour < block.startHour) {
        endHour += 24;
      }

      const uid = `warroom-day${day + 1}-${block.id}@study-warroom`;
      const dtstart = toICSDate(date, block.startHour, block.startMinute);

      // For end time, if it crosses midnight, use next day
      const endDate = new Date(date);
      if (block.endHour < block.startHour) {
        endDate.setDate(endDate.getDate() + 1);
      }
      const dtend = toICSDate(endDate, block.endHour, block.endMinute);

      const description = block.note ? `${block.label}\\n${block.note}` : block.label;
      const categoryLabel = block.category.charAt(0).toUpperCase() + block.category.slice(1);

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTART:${dtstart}`);
      lines.push(`DTEND:${dtend}`);
      lines.push(`SUMMARY:${escapeICS(`[${categoryLabel}] ${block.label}`)}`);
      lines.push(`DESCRIPTION:${escapeICS(`Day ${day + 1} of 30\\n${description}`)}`);
      lines.push(`CATEGORIES:${categoryLabel}`);

      // Color coding via custom Apple/Google Calendar properties
      if (block.category === 'dsa') lines.push('COLOR:goldenrod');
      else if (block.category === 'genai' || block.category === 'code') lines.push('COLOR:cadetblue');
      else if (block.category === 'jobs') lines.push('COLOR:forestgreen');
      else if (block.category === 'mindset') lines.push('COLOR:mediumpurple');
      else if (block.category === 'break') lines.push('COLOR:gray');

      // Set alarm 5 min before
      lines.push('BEGIN:VALARM');
      lines.push('TRIGGER:-PT5M');
      lines.push('ACTION:DISPLAY');
      lines.push(`DESCRIPTION:${escapeICS(block.label)} starting in 5 minutes`);
      lines.push('END:VALARM');

      lines.push('END:VEVENT');
    }
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadICSFile(): void {
  const icsContent = generateICSFile();
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'study-warroom-30-day-schedule.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate a Google Calendar URL for a single day's events
export function getGoogleCalendarUrl(day: number): string {
  const date = new Date(PLAN_START);
  date.setDate(date.getDate() + day - 1);

  // Just link to Google Calendar's day view for that date
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `https://calendar.google.com/calendar/r/day/${y}/${m}/${d}`;
}
