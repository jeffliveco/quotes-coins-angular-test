import { Component, OnInit, Input } from '@angular/core';

import { Response } from '../../models/response';
import { Rate } from '../../models/rate';
import { QuoteCoinsService } from '../../services/quote-coins.service';

import { faExchangeAlt } from '@fortawesome/fontawesome-free-solid';
import { library as Library } from '@fortawesome/fontawesome';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  @Input() response: Response;
  @Input() rate: Rate;
  isLoading: boolean;

  constructor(private service: QuoteCoinsService) {
    this.rate = new Rate;
    this.isLoading = true;

    this.service.findRate('USD', 'EUR', 1).subscribe((response) => {
      this.rate = <Rate> response.data;
      this.isLoading = false;
    });

    Library.add(faExchangeAlt);
  }

  ngOnInit() {
    this.getRate();
  }

  getRate(): void {
    this.service.getRate('USD')
      .subscribe(response => this.response = response);
  }

  onExchange(value: number): void {
    this.isLoading = true;
    this.service.findRate('USD', 'EUR', value).subscribe((response) => {
      this.rate = <Rate> response.data;
      this.isLoading = false;
    });
  }

}
