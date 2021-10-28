import { EMPTY, Observable, of, timer } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Progress, Step } from './model';

const sum = (arr: number[]) => arr.reduce((curr, acc) => curr + acc, 0);
const timeSlice = 200;

@Pipe({
  name: 'estimateProgress',
})
export class EstimateProgressPipe implements PipeTransform {
  transform(steps: Step[], currentStep: number): Observable<Progress> {
    if (steps?.length === currentStep) {
      return of({
        totalEstimatedProgress: 1,
        currentStep: '',
      });
    }

    if (!steps || !steps[currentStep]) {
      return EMPTY;
    }
    const finishedStepsDuration = this.getDuration(
      steps.filter((_, i) => i < currentStep)
    );
    const expectedStepDuration = steps[currentStep].expectedDuration;
    const totalExpectedDuration = this.getDuration(steps);

    const stepSize = timeSlice / expectedStepDuration;
    const finishedProgress = finishedStepsDuration / totalExpectedDuration;

    let stepProgress = 0;
    const updateStepProgress = () =>
      (stepProgress +=
        stepProgress < 0.8 ? stepSize : 0.5 * (1 - stepProgress) * stepSize);
    return timer(0, timeSlice).pipe(
      map((_) => {
        const progress: Progress = {
          currentStep: steps[currentStep].name,
          totalEstimatedProgress:
            finishedProgress +
            (stepProgress * expectedStepDuration) / totalExpectedDuration,
        };
        if (steps[currentStep].target) {
          progress.currentTarget = steps[currentStep].target;
        }
        return progress;
      }),
      tap(updateStepProgress)
    );
  }

  private getDuration(steps: Step[]): number {
    return sum(steps.map((t) => t.expectedDuration));
  }
}
