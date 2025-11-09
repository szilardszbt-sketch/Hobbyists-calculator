import React from 'react';

export interface DroneCosts {
  drone: number;
  batteries: number;
  camera: number;
  insurance: number;
  hasSubscription: boolean;
  subscriptionCost: number;
}

export interface BaristaCosts {
  machine: number;
  grinder: number;
  beans: number;
  accessories: number;
}

export interface PcCosts {
  gpu: number;
  cpu: number;
  motherboard: number;
  ram: number;
  storage: number;
  psu: number;
  pcCase: number;
  peripherals: number;
}

export interface DynamicField {
  id: string;
  name: string;
  label: string;
  type?: 'number' | 'checkbox';
  disabledIf?: string; // ID of a checkbox field that controls this field's disabled state
  isRecurring?: boolean;
}