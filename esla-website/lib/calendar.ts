// Google Calendar Integration Helper

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
}

export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const startDateTime = `${event.startDate.replace(/-/g, '')}T${event.startTime.replace(':', '')}00`;
  const endDateTime = `${event.startDate.replace(/-/g, '')}T${event.endTime.replace(':', '')}00`;
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${startDateTime}/${endDateTime}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICalFile(event: CalendarEvent): string {
  const startDateTime = `${event.startDate.replace(/-/g, '')}T${event.startTime.replace(':', '')}00`;
  const endDateTime = `${event.startDate.replace(/-/g, '')}T${event.endTime.replace(':', '')}00`;
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Team Elitesoccer//ESLA//EN
BEGIN:VEVENT
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
}

export function downloadICalFile(event: CalendarEvent) {
  const icalContent = generateICalFile(event);
  const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `esla-match-${event.startDate}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

