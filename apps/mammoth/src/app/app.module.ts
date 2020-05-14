import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AgentsModule } from './agents/agents.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, NavBarModule } from './core';
import { AccountEffects } from './ngrx-store/effects/account.effects';
import { BudgetEffects } from './ngrx-store/effects/budget.effects';
import { mammothReducers } from './ngrx-store/reducers/mammoth.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AgentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(mammothReducers, {
      runtimeChecks: {
        strictActionWithinNgZone: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([BudgetEffects, AccountEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AgentsModule,
    CoreModule,
    NavBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
