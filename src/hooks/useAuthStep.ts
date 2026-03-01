import { useState, useEffect } from 'react';

type AuthStep = 'form' | 'otp' | 'success';

let currentStep: AuthStep = 'form';
let currentEmail: string = '';
const listeners = new Set<() => void>();

export function getAuthStep() {
  return currentStep;
}

export function getAuthEmail() {
  return currentEmail;
}

export function setAuthStep(step: AuthStep) {
  currentStep = step;
  listeners.forEach(fn => fn());
}

export function setAuthEmail(email: string) {
  currentEmail = email;
}

export function useAuthStep() {
  const [step, setStep] = useState(currentStep);

  useEffect(() => {
    const listener = () => setStep(currentStep);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  return { authStep: step, setAuthStep };
}
