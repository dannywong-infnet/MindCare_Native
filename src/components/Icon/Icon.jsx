import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

// Mapeamento de ícones Material Symbols para MaterialIcons
const iconMap = {
  'person_pin_circle': 'person-pin-circle',
  'calendar_month': 'calendar-month',
  'request_quote': 'request-quote',
  'menu': 'menu',
  'close': 'close',
};

export default function Icon({ iconName, color = '#000', size = 24, ...props }) {
  const mappedIconName = iconMap[iconName] || iconName;
  
  return (
    <MaterialIcons
      name={mappedIconName}
      size={size}
      color={color}
      {...props}
    />
  );
}
