import { DatePipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { combineLatest, map, switchMap } from 'rxjs';
import { TrainerApi } from '../../trainer-api';

// TODO: refactor
type Slot = {
  id: number;
  selected: boolean;
  start: string;
  end: string;
};

const toSlot = (slots: { start: string; end: string }[]) => {
  return slots.map<Slot>((slot, index) => ({
    id: index,
    selected: false,
    start: slot.start,
    end: slot.end,
  }));
};

@Component({
  selector: 'app-slot-selector',
  templateUrl: './slot-selector.html',
  imports: [DatePickerModule, FormsModule, ButtonModule, NgClass, DatePipe],
})
export class SlotSelector {
  #trainerApi = inject(TrainerApi);

  readonly trainerId = input.required<string>();
  readonly date = signal<Date>(new Date());

  #slots = toSignal(
    combineLatest([toObservable(this.trainerId), toObservable(this.date)]).pipe(
      switchMap(([trainerId, date]) =>
        this.#trainerApi.getTrainerSlots(
          { trainerId },
          {
            date:
              DateTime.fromJSDate(date).toISODate() ??
              DateTime.now().toISODate(),
          },
        ),
      ),
      map((response) => toSlot(response.data)),
    ),
    { initialValue: [] },
  );

  slots = linkedSignal(() => this.#slots());
  selectedSlot = computed(() => this.slots().find((slot) => slot.selected));

  selectSlot(slotId: number) {
    const updatedSlots = this.slots().map((slot) =>
      slot.id === slotId
        ? { ...slot, selected: !slot.selected }
        : { ...slot, selected: false },
    );

    this.slots.set(updatedSlots);
  }
}
