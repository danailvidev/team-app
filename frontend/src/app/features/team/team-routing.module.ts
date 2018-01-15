import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { LeftMenuPanelComponent } from './left-menu-panel/left-menu-panel.component';
import { TaskStreamComponent } from './task-stream/task-stream.component';

const routes: Routes = [
    { path: '', component: TeamComponent , children: [
        {path: '', component: MessagePanelComponent},
        {path: 'private-teams', component: MessagePanelComponent},
        {path: 'task-stream', component: TaskStreamComponent}
    ]}
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
        TaskStreamComponent
    ];
}
