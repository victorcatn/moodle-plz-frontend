import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MenubarComponent} from './components/menubar/menubar.component';
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {ProjectListComponent} from './project/project-list/project-list.component';
import {SkillDetailComponent} from './skill/skill-detail/skill-detail.component';
import {SkillModelComponent} from './skill/skill-model/skill-model.component';
import {KnowledgeModelComponent} from './knowledge/knowledge-model/knowledge-model.component';
import {KnowledgeDetailComponent} from './knowledge/knowledge-detail/knowledge-detail.component';
import {GroupListComponent} from './group/group-list/group-list.component';
import {GroupDetailComponent} from './group/group-detail/group-detail.component';
import {MessagesComponent} from './components/messages/messages.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GroupCreationComponent} from './group/group-creation/group-creation.component';
import {StaffmemberListComponent} from './staffmember/staffmember-list/staffmember-list.component';
import {CreateSkillComponent} from './skill/create-skill/create-skill.component';
import {CreateKnowledgeComponent} from './knowledge/create-knowledge/create-knowledge.component';
import {EditSkillComponent} from './skill/edit-skill/edit-skill.component';
import {StaffmemberDetailComponent} from './staffmember/staffmember-detail/staffmember-detail.component';
import {CidimageComponent} from './components/cidimage/cidimage.component';
import {ProjectComponentComponent} from './project/project-component/project-component.component';


@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    ProjectListComponent,
    SkillDetailComponent,
    SkillModelComponent,
    KnowledgeModelComponent,
    KnowledgeDetailComponent,
    GroupListComponent,
    GroupDetailComponent,
    MessagesComponent,
    GroupCreationComponent,
    StaffmemberListComponent,
    CreateSkillComponent,
    CreateKnowledgeComponent,
    EditSkillComponent,
    StaffmemberDetailComponent,
    CidimageComponent,
    ProjectComponentComponent,

  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
