import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimetableService } from '../services/timetable-service';
import { DisplayTimetable } from '../display-timetable/display-timetable';
import { lang } from '../types/lang';

const stopCodes: { [key: string]: string } = {
  "The Point": "TPT",
  "Spencer Dock": "SDK",
  "Mayor Square - NCI": "MYS",
  "George's Dock": "GDK",
  "Connolly": "CON",
  "Busáras": "BUS",
  "Abbey Street": "ABB",
  "Jervis": "JER",
  "Four Courts": "FOU",
  "Smithfield": "SMI",
  "Museum": "MUS",
  "Heuston": "HEU",
  "James's": "JAM",
  "Fatima": "FAT",
  "Rialto": "RIA",
  "Suir Road": "SUI",
  "Goldenbridge": "GOL",
  "Drimnagh": "DRI",
  "Fettercairn": "FET",
  "Cheeverstown": "CVN",
  "Citywest Campus": "CIT",
  "Fortunestown": "FOR",
  "Saggart": "SAG",
  "Depot": "DEP",
  "Broombridge": "BRO",
  "Cabra": "CAB",
  "Phibsborough": "PHI",
  "Grangegorman": "GRA",
  "Broadstone - University": "BRD",
  "Dominick": "DOM",
  "Parnell": "PAR",
  "O'Connell - Upper": "OUP",
  "O'Connell - GPO": "OGP",
  "Marlborough": "MAR",
  "Westmoreland": "WES",
  "Trinity": "TRY",
  "Dawson": "DAW",
  "St. Stephen's Green": "STS",
  "Harcourt": "HAR",
  "Charlemont": "CHA",
  "Ranelagh": "RAN",
  "Beechwood": "BEE",
  "Cowper": "COW",
  "Milltown": "MIL",
  "Windy Arbour": "WIN",
  "Dundrum": "DUN",
  "Balally": "BAL",
  "Kilmacud": "KIL",
  "Stillorgan": "STI",
  "Sandyford": "SAN",
  "Central Park": "CPK",
  "Glencairn": "GLE",
  "The Gallops": "GAL",
  "Leopardstown Valley": "LEO",
  "Ballyogan Wood": "BAW",
  "Racecourse": "RCC",
  "Carrickmines": "CCK",
  "Brennanstown": "BRE",
  "Laughanstown": "LAU",
  "Cherrywood": "CHE",
  "Brides Glen": "BRI",
  "Blackhorse": "BLA",
  "Bluebell": "BLU",
  "Kylemore": "KYL",
  "Red Cow": "RED",
  "Kingswood": "KIN",
  "Belgard": "BEL",
  "Cookstown": "COO",
  "Hospital": "HOS",
  "Tallaght": "TAL"
};

@Component({
  selector: 'app-stop-selector',
  imports: [CommonModule, FormsModule, DisplayTimetable],
  templateUrl: './stop-selector.html',
  styleUrl: './stop-selector.scss'
})
export class StopSelector implements OnInit {
  constructor(private timetableService: TimetableService) {}
  @Input() locale: lang = lang.EN;
  
  stopCodes = stopCodes;
  stopNames = Object.keys(stopCodes);
  selectedStop = '';
  luasData: any = null;
  loading = false;
  error = '';

  ngOnInit(): void {
    this.selectedStop = localStorage.getItem("lastStop") ?? '';
    if (this.selectedStop !== '') 
      this.fetchLuasData();
  }

  onStopSelect() {
    if (this.selectedStop) {
      this.fetchLuasData();
      localStorage.setItem("lastStop", this.selectedStop);
    }
  }

  private fetchLuasData() {
    const stopCode = this.stopCodes[this.selectedStop];
    this.loading = true;
    this.error = '';
    this.luasData = null;

    this.timetableService.getTimetable(stopCode).subscribe({
      next: (data) => {
        this.luasData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Błąd podczas pobierania danych';
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }

  get chooseStop() {
    return (this.locale === lang.EN) ? "Choose a stop" : "Roghnaigh stad"
  }
}
