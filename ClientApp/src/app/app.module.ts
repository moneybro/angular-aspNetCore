import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { InputFormComponent } from './input-form/input-form.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostComponent } from './post/post.component';
import { PostParentComponent } from './post-parent/post-parent.component';
import { StyleDirective } from './directives/style.directive';
import { DirectivesComponent } from './directives/directives.component';
import { PipesComponent } from './pipes/pipes.component';
import { MultByPipe } from './pipes/mult-by.pipe';
import { ExMarksPipe } from './pipes/ex-marks.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { AppCounterService } from './services/app-counter.service';
import { DatePipe } from '@angular/common';
import { NgFormValidComponent } from './ng-form-valid/ng-form-valid.component';
import { CustomNgModelComponent } from './custom-ng-model/custom-ng-model.component';
import { SwitchComponent } from './custom-ng-model/switch/switch.component';
import { HttpClientLabComponent } from './http-client-lab/http-client-lab.component';
import { Provider } from '@angular/compiler/src/core';
import { AuthInterceptor } from './auth.interceptor';

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
    CounterComponent,
    FetchDataComponent,
    InputFormComponent,
    PostFormComponent,
    PostComponent,
    PostParentComponent,
    StyleDirective,
    DirectivesComponent,
    PipesComponent,
    MultByPipe,
    ExMarksPipe,
    FilterPipe,
    NgFormValidComponent,
    CustomNgModelComponent,
    SwitchComponent,
    HttpClientLabComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'input-form', component: InputFormComponent },
      { path: 'post-parent', component: PostParentComponent },
      { path: 'directives', component: DirectivesComponent },
      { path: 'pipes', component: PipesComponent },
      { path: 'ng-form-valid', component: NgFormValidComponent },
      { path: 'custom-ng-model', component: CustomNgModelComponent },
      { path: 'http-client-lab', component: HttpClientLabComponent },
    ])
  ],
  providers: [
    AppCounterService,
    DatePipe,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
