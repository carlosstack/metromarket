import { AbstractControl } from '@angular/forms';

export function ValidateEmail(control: AbstractControl) {
  if (!control.value.endsWith('@correo.unimet.edu.ve') || !!control.value.endsWith('@unimet.edu.ve')) {
    return { validEmail: true };
  }
  return null;
}