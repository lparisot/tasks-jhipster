import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
    selector: 'jhi-task-add',
    templateUrl: './task-add.component.html',
    styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
    addTaskValue: string = null;

    constructor(
        private taskService: TaskService,
        private eventManager: JhiEventManager
    ) { }

    ngOnInit() {
    }

    onTaskAdd(event) {
        console.log('onTaskAdd: ' + event.target.value);
        const today = new Date();
        const task = new Task(null, event.target.value, {day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear()}, false);
        this.taskService
            .create(task)
            .subscribe((newTask: Task) => {
                this.addTaskValue = '';
                this.eventManager.broadcast({ name: 'taskListModification', content: 'OK'});
            });
    }

    getTodayAsString() {
        const today = new Date();
        let dd: any = today.getDate();
        let mm: any = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        return dd + '/' + mm + '/' + yyyy;
    }
}
