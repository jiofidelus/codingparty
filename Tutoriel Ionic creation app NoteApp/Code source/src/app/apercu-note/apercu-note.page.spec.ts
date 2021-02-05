import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApercuNotePage } from './apercu-note.page';

describe('ApercuNotePage', () => {
  let component: ApercuNotePage;
  let fixture: ComponentFixture<ApercuNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApercuNotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApercuNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
