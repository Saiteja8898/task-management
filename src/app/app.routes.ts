import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [

            {
                path: 'all',
                component: AllTasksComponent
            },
            {
                path: 'completed',
                component: CompletedTasksComponent
            },
            {
                path: '**',
                redirectTo: 'all',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
    }];
