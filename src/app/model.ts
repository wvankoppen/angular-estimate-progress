export interface Step {
  name?: string;
  target?: string;
  expectedDuration: number;
}

export interface Steps {
  steps: Step[];
  currentStep: number;
}

export interface Progress {
  currentStep: string;
  currentTarget?: string;
  totalEstimatedProgress: number;
}
