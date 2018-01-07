import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { ChannelPanelComponent } from './channel-panel/channel-panel.component';

const routes: Routes = [
    { path: '', component: TeamComponent }
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
        ChannelPanelComponent
    ];
}
