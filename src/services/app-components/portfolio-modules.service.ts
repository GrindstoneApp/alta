/* eslint-disable max-len */
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { WorkExperienceComponent } from 'src/app/components/portfolio-modules/work-experience/work-experience.component';

@Injectable({
  providedIn: 'root'
})
export class PortfolioModulesService {

  private components: any = {
    "component-1": WorkExperienceComponent
  }

  private loadedComponents: Array<any> = [];
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  addComponent(moduleID: number, container: any): void {
    const componentClass = this.components[`component-${moduleID}`];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = container.createComponent(componentFactory);

    this.loadedComponents.push(component);
  }

}
