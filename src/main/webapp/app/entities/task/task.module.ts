import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TasksSharedModule } from '../../shared';
import {
    TaskService,
    TaskPopupService,
    TaskComponent,
    TaskDetailComponent,
    TaskDialogComponent,
    TaskPopupComponent,
    TaskDeletePopupComponent,
    TaskDeleteDialogComponent,
    taskRoute,
    taskPopupRoute,
} from './';
import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskAddComponent } from './task-add/task-add.component';

const ENTITY_STATES = [
    ...taskRoute,
    ...taskPopupRoute,
];

@NgModule({
    imports: [
        TasksSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    exports: [
        TasksComponent
    ],
    declarations: [
        TasksComponent,
        TaskComponent,
        TaskDetailComponent,
        TaskDialogComponent,
        TaskDeleteDialogComponent,
        TaskPopupComponent,
        TaskDeletePopupComponent,
        TaskAddComponent,
        TasksListComponent
    ],
    entryComponents: [
        TaskComponent,
        TaskDialogComponent,
        TaskPopupComponent,
        TaskDeleteDialogComponent,
        TaskDeletePopupComponent,
    ],
    providers: [
        TaskService,
        TaskPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TasksTaskModule {}
