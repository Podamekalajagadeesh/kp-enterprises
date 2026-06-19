import React from 'react';
import { FaSnowflake, FaWind } from 'react-icons/fa';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { GiWashingMachine } from 'react-icons/gi';

export const services = [
  {
    title: 'AC Repair',
    description: 'Expert diagnosis and repair for all types of air conditioners.',
    icon: <FaSnowflake />,
  },
  {
    title: 'Cooler Service',
    description: 'Keep your cooler running efficiently with our maintenance and repair services.',
    icon: <FaWind />,
  },
  {
    title: 'Refrigerator Repair',
    description: 'From cooling issues to broken ice makers, we fix it all.',
    icon: <CgSmartHomeRefrigerator />,
  },
  {
    title: 'Washing Machine Service',
    description: 'We handle everything from leaks to spin cycle problems.',
    icon: <GiWashingMachine />,
  },
];