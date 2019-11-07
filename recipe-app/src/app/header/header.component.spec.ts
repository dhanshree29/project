import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    /*
     * test bed is basically angular utility object and So this allows
     * us to configure the modules for our testing. what we do here is simply declare
     * which components we want to have in this testing environment.
    */
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [HeaderComponent]
    }).compileComponents();
    /* if you were not using Cli or any other web pack
     based setup you then need to execute compile components to compile them */
    fixture = TestBed.createComponent(HeaderComponent); // Here we create a component in testing environment
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes manually so that the template gets render.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as sitename 'recipe-app'`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.siteName).toEqual('Recipe Dashboard');
  });

});
