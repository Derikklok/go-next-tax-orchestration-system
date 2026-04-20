import { Routes } from '@angular/router';
import { TaskListPage } from './features/tasks/pages/task-list-page/task-list-page';
import { TaskCreatePage } from './features/tasks/pages/task-create-page/task-create-page';
import { TaskEditPage } from './features/tasks/pages/task-edit-page/task-edit-page';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'tasks',
        pathMatch:'full'
    },
    {
        path:'tasks',
        component: TaskListPage
    },
    {
        path:'tasks/create',
        component:TaskCreatePage
    },
    {
        path:'tasks/:id/edit',
        component:TaskEditPage
    }
];
