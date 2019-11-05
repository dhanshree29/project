import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageNotFoundComponent
      ],
    });
	fixture = TestBed.createComponent(PageNotFoundComponent); // Here we create a component in testing environment
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the pagenotfound', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should render message pagenotfound in a h3 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('This page was not Found');
  }));

});
