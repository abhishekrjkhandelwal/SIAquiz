import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { LoginComponent } from './components/login/login.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { ProgrammingLanguageComponent } from './components/programming-language/programming-language.component';
import { CLanguageComponent } from './components/c-language/c-language.component';
import { HomeComponent } from './components/home/home.component'
import { GeeksChatComponent } from './components/geeks-chat/geeks-chat.component';
import { AuthGuard } from './services/auth.gaurd';
import { RegisterComponent } from  './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostComponent} from './components/post/post.component';
import { GroupComponent } from './components/group/group.component';
import { AccountComponent } from './components/account/account.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { AboutComponent } from './components/about/about.component';
import { AdminComponent } from './components/admin/admin.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tutorial' ,component: TutorialComponent},
  { path: 'javascript' ,component: ProgrammingLanguageComponent},
  { path: 'c_language', component: CLanguageComponent},
  { path: 'regsiter', component: RegisterComponent},
  { path: 'chats/:id', component : GeeksChatComponent },
  { path: 'user/:username' , component: ProfileComponent },
  { path: 'post/:pid' , component : PostComponent},
  { path: 'group/:gid', component: GroupComponent},
  { path: 'account', component: AccountComponent},
  { path: 'messaging', component: MessagingComponent},
  { path: 'about', component: AboutComponent},
  { path: 'feedback', component: AboutComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'user/:username/groups', component:GroupComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full'},
  { path: 'start', component: LandingpageComponent},
  { path: 'signup', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [QuizComponent, LoginComponent, TutorialComponent, ProgrammingLanguageComponent, GeeksChatComponent]