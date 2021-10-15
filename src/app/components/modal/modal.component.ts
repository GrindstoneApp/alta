import { Component, OnInit, OnDestroy, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/services/app-components/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  private element: any;

  constructor(
    private modalService: ModalService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) return;

    console.log(this.element);

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: any) => {
        if (el.target.className === 'modal-background') {
            this.close();
        }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
}

  open(): void {
      this.element.classList.add('open');
  }

  close(): void {
    this.element.classList.remove('open');
  }

}
