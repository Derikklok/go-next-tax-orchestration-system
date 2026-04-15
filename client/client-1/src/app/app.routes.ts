import { Routes } from '@angular/router';
import { TaskListPage } from './features/tasks/pages/task-list-page/task-list-page';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'tasks',
        pathMatch:'full'
    },
    {
        path:'tasks',
        component: TaskListPage
    }
];
