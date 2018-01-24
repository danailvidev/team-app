import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { LeftMenuPanelComponent } from './left-menu-panel/left-menu-panel.component';
import { PrivateTeamsComponent } from './private-teams/private-teams.component';

const routes: Routes = [
    {
        path: '', component: TeamComponent, children: [
            { path: '', component: PrivateTeamsComponent },
            { path: 'private-teams', component: PrivateTeamsComponent },
            { path: 'task-stream', loadChildren: 'app/features/task-stream/task-stream.module#TaskStreamModule' },
            { path: 'personal-tasks', loadChildren: 'app/features/personal-tasks/personal-tasks.module#PersonalTasksModule' },
            { path: 'notifications', loadChildren: 'app/features/notifications/notifications.module#NotificationsModule' },
            { path: 'forum', loadChildren: 'app/features/forum/forum.module#ForumModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule {
    static components = [
        TeamComponent,
        UserPanelComponent,
        MessagePanelComponent,
        LeftMenuPanelComponent,
        PrivateTeamsComponent
    ];
}
