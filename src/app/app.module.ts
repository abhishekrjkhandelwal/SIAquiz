
//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule} from '@angular/material/card';
import { MatListModule} from '@angular/material/list';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { MatIconModule} from '@angular/material/icon';
import { MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatProgressBarModule} from '@angular/material/progress-bar';



//components
import { AppComponent } from './app.component';
import { ProgrammingLanguageComponent } from './components/programming-language/programming-language.component';
import { CLanguageComponent } from './components/c-language/c-language.component';
import { HomeComponent } from './components/home/home.component';
import { GeeksChatComponent } from './components/geeks-chat/geeks-chat.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AccountComponent } from './components/account/account.component';
import { AboutComponent } from './components/about/about.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { ChatroomComponent } from './components/messaging/chatroom/chatroom.component';
import { ChatroomlistComponent } from './components/messaging/chatroomlist/chatroomlist.component';
import { MessageComponent } from './components/messaging/chatroom/message/message.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupComponent } from './components/group/group.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user-list/user/user.component';
import { SuggestedComponent } from './components/suggested/suggested.component';
import { SearchComponent } from './components/search/search.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AdminComponent } from './components/admin/admin.component';
import { PostComponent } from './components/post/post.component';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { FooterComponent } from './components/footer/footer.component';
import { GrouplistComponent } from './components/group/grouplist/grouplist.component';




//Services
import { AuthenticationService } from './services/authentication.service';
import { UploadService } from './services/upload.service';
import { UserService } from './services/user.service';
import { PostsService } from './services/post.service';
import { FollowService } from './services/follow.service';
import { LikesService } from './services/likes.service';
import { GroupService } from './services/group.service';
import { NotificationService } from './services/notification.service';
import { MessageService } from './services/message.service';


//pipes
import { DateFormatPipe } from './services/date.pipe';
import { LinkifyPipe } from './services/linkify.pipe';



//directives
import { DetectScrollDirective } from './directives/detect-scroll.directive';
import { AngularFireStorage } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TutorialComponent,
    ProgrammingLanguageComponent,
    CLanguageComponent,
    HomeComponent,
    GeeksChatComponent,
    RegisterComponent,
    ProfileComponent,
    AddPostComponent,
    AccountComponent,
    AboutComponent,
    AddCommentComponent,
    MessagingComponent,
    ChatroomComponent,
    ChatroomlistComponent,
    MessageComponent,
    NotificationComponent,
    CreateGroupComponent,
    GroupComponent,
    UserListComponent,
    UserComponent,
    SuggestedComponent,
    SearchComponent,
    FeedbackComponent,
    AdminComponent,
    PostComponent,
    ErrorComponent,
    NavbarComponent,
    LandingpageComponent,
    FooterComponent,
    GrouplistComponent,
    LinkifyPipe,
    DateFormatPipe,
    DetectScrollDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    AngularMaterialModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    HttpClientModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatInputModule
  ],
  providers: [AuthenticationService,
              AngularFirestore,
              UploadService,
              UserService,
              PostsService,
              FollowService,
              LikesService,
              GroupService,
              NotificationService,
              DateFormatPipe,
              MessageService,
              LinkifyPipe,
              AngularFireStorage
            ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    CreateGroupComponent
  ]
})
export class AppModule { }
