import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { InputFormComponent } from './input-form/input-form.component';
import { DatePipe } from '@angular/common';
import { Provider } from '@angular/compiler/src/core';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AboutProjectComponent } from './about/about-project/about-project.component';
import { AboutAuthorComponent } from './about/about-author/about-author.component';
import { UserListComponent } from './users/user-list/user-list.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    InputFormComponent,
    ErrorPageComponent,
    PdfViewerComponent,
    UserFormComponent,
    AboutProjectComponent,
    AboutAuthorComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about/author', component: AboutAuthorComponent },
      { path: 'about/project', component: AboutProjectComponent },
      { path: 'input-form', component: InputFormComponent },
      { path: 'userslist', component: UserListComponent },
      { path: 'user-form', component: UserFormComponent },
      { path: 'pdf', component: PdfViewerComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: '**', redirectTo: '/error' }
    ])
  ],
  providers: [
    DatePipe,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
