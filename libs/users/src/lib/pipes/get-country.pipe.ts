import { Pipe, PipeTransform } from '@angular/core';
import { countries } from '../static-data/countries';

@Pipe({
  name: 'countryNameByCode',
  pure: true,
  standalone: true
})
export class GetCountryPipe implements PipeTransform{
  transform(code: string): string {
    if(!code) return '';
    return countries.find(country => country.code === code)?.name || '';
  }
}
