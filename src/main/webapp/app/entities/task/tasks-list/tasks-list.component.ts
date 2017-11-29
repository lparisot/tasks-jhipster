import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { PaginationConfig } from '../../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnDestroy {
    tasks: Task[] = [];
    eventSubscriber: Subscription;
    currentAccount: any;

    constructor(
        private taskService: TaskService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) { }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTasks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadAll() {
        this.taskService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tasks = res.json;
                console.log('Tasks: ' + JSON.stringify(this.tasks));
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe('taskListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    getDueDateLabel(task: Task) {
        return task.completed ? 'label-success' : 'label-primary';
    }

    onTaskChange(event, task) {
        console.log('onTaskChange: ' + JSON.stringify(task));
        task.completed = event.target.checked;
        const date = task.dueDate;
        task.dueDate = {day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()};
        this.taskService.update(task).subscribe(
            (res: Task) => this.eventManager.broadcast({ name: 'taskListModification', content: 'OK'}));
    }
}
