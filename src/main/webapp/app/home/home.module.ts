import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TasksSharedModule } from '../shared';
import { TasksEntityModule } from '../entities/entity.module';

import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [
        TasksSharedModule,
        TasksEntityModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TasksHomeModule {}
