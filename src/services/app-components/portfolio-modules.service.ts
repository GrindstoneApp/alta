/* eslint-disable max-len */
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { WorkExperienceComponent } from 'src/app/components/portfolio-modules/work-experience/work-experience.component';
import { environment } from 'src/environments/environment';
import { Module } from 'src/providers/portfolio.provider';
import { RequestService } from '../http/request.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioModulesService {

  private components: any = {
    "component-1": WorkExperienceComponent
  }
  private loadedComponents: Array<any> = [];
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private request: RequestService,
  ) {}

  addComponent(id: number, type: number, container: any, data: any = {}): void {
    const componentClass = this.components[`component-${type}`];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = container.createComponent(componentFactory);
    component.instance.data = data;
    component.instance.id = id;

    this.loadedComponents.push(component);
  }

  removeComponent(id: number, container: any): void {
    const component = this.loadedComponents.find((c: any) => c.instance.id === id);
    const componentIndex = this.loadedComponents.indexOf(component);
    
    if (componentIndex !== -1) {
      container.remove(container.indexOf(component.hostView));
      this.loadedComponents.splice(componentIndex, 1);
    }
  }

  async updateModule(moduleID: number, mongoDBUpdates: any): Promise<Module> {
    try {
      const data = {
        module_id: moduleID,
        data_to_update: mongoDBUpdates
      }
      const response: any = await this.request.post(`${environment.API_URL}/ptfl/update/module`, data)
      return response
    } catch(err) { 
     throw err
    }
  }

}
