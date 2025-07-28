type Unit = 'seconds' | 'minutes' | 'hours';
const pluralForm: { [key in Unit]: string } = {
  seconds: 'sekunder',
  minutes: 'minutter',
  hours: 'timer',
};
const singularForm: { [key in Unit]: string } = {
  seconds: 'sekund',
  minutes: 'minutt',
  hours: 'time',
};
function plural(n: number, type: Unit) {
  const ext = n === 1 ? singularForm[type] : pluralForm[type];
  if (n === 1) {
    return type === 'hours' ? `en ${ext}` : `ett ${ext}`;
  }
  return `${n} ${ext}`;
}

export function time(input: string) {
  const source: { [key in Unit]: number } = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  if (input.includes(':')) {
    const parts = input.split(':');
    if (parts.length > 3) {
      throw new Error(`Invalid time format: ${input}`);
    }
    if (parts.length === 3) {
      source.hours = Math.round(parseFloat(parts[0]));
      source.minutes = Math.round(parseFloat(parts[1]));
      source.seconds = Math.round(parseFloat(parts[2]));
    } else if (parts.length === 2) {
      source.minutes = Math.round(parseFloat(parts[0]));
      source.seconds = Math.round(parseFloat(parts[1]));
    } else {
      source.seconds = Math.round(parseFloat(parts[0]));
    }
  } else {
    source.seconds = Math.round(parseFloat(input));
  }
  if (isNaN(source.hours) || isNaN(source.minutes) || isNaN(source.seconds)) {
    throw new Error(`Invalid time format: ${input}`);
  }
  if (source.hours < 0 || source.minutes < 0 || source.seconds < 0) {
    throw new Error(`Negative time values are not allowed: ${input}`);
  }
  if (source.seconds >= 60) {
    source.minutes += Math.floor(source.seconds / 60);
    source.seconds = source.seconds % 60;
  }
  if (source.minutes >= 60) {
    source.hours += Math.floor(source.minutes / 60);
    source.minutes = source.minutes % 60;
  }
  return Object.freeze({
    ...source,
    asSeconds() {
      return this.hours * 3600 + this.minutes * 60 + this.seconds;
    },
    format(option: 'hh:mm:ss' | 'mm:ss' | 'ss' | 'auto' | 'pretty' = 'auto') {
      const h = source.hours.toString().padStart(2, '0');
      const m = source.minutes.toString().padStart(2, '0');
      const s = source.seconds.toString().padStart(2, '0');
      switch (option) {
        case 'auto':
          if (source.hours > 0) {
            return `${h}:${m}:${s}`;
          }
          if (source.minutes > 0) {
            return `${m}:${s}`;
          }
          return plural(source.seconds, 'seconds');
        case 'pretty':
          if (source.hours > 0 && source.minutes > 0) {
            return `${plural(source.hours, 'hours')} og ${plural(source.minutes, 'minutes')}`;
          }
          if (source.minutes > 0 && source.seconds > 0) {
            return `${plural(source.minutes, 'minutes')} og ${plural(source.seconds, 'seconds')}`;
          }
          if (source.hours > 0) {
            return plural(source.hours, 'hours');
          }
          if (source.minutes > 0) {
            return plural(source.minutes, 'minutes');
          }
          return plural(source.seconds, 'seconds');
        case 'hh:mm:ss':
          return `${h}:${m}:${s}`;
        case 'mm:ss':
          return `${m}:${s}`;
        case 'ss':
          return `${s}`;
        default:
          throw new Error(`Unknown format option: ${option}`);
      }
    },
  });
}

function parsePrettyUnit(input: string): number {
  if (input === 'en time') {
    return 3600; // 1 hour in seconds
  }
  if (input === 'ett minutt') {
    return 60; // 1 minute in seconds
  }
  if (input === 'ett sekund') {
    return 1; // 1 second in seconds
  }
  const match = input.match(/(\d+)\s+(timer|minutter|sekunder)/);
  if (!match) {
    throw new Error(`Unknown time unit: ${input}`);
  }
  let value: string = match[1];
  if (match[1] === 'en' || match[1] === 'ett') {
    value = '1';
  }
  const parsedValue = parseFloat(value);
  switch (match[2]) {
    case 'timer':
      return parsedValue * 3600;
    case 'minutter':
      return parsedValue * 60;
    case 'sekunder':
      return parsedValue;
    default:
      throw new Error(`Unknown time unit: ${match[2]}`);
  }
}

function parsePrettyString(input: string): number {
  if (input.includes('og')) {
    const parts = input.split('og').map((part) => part.trim());
    let seconds = 0;
    for (const part of parts) {
      seconds += parsePrettyUnit(part);
    }
    return seconds;
  } else {
    return parsePrettyUnit(input);
  }
}

export function parsePrettyTime(input: string): { min: number; max: number } {
  const parts = input.split('±');
  if (parts.length === 1) {
    const mid = parsePrettyString(parts[0].trim());
    return { min: mid, max: mid };
  } else if (parts.length === 2) {
    const mid = parsePrettyString(parts[0].trim());
    const plusMinus = parsePrettyString(parts[1].trim());
    return { min: mid - plusMinus, max: mid + plusMinus };
  } else {
    throw new Error(`Invalid pretty time format: ${input}`);
  }
}
