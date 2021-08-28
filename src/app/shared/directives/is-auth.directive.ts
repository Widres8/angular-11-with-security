import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Directive({ selector: '[appIsAuth]' })
export class IsAuthDirective implements OnInit {
  private condition: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.viewContainer.clear();
      if (
        (isAuthenticated && this.condition) ||
        (!isAuthenticated && !this.condition)
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  @Input() set appIsAuth(condition: boolean) {
    this.condition = condition;
  }
}
