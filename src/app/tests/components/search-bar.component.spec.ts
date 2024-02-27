import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideAnimations } from '@angular/platform-browser/animations';





describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to search', () => {
    component.checkQuery('');
    expect(component.resultList.length).toBe(0)
  });

  it('should be able to reset result', () => {
    component.resetResult();
    expect(component.resultList.length).toBe(0)
  });
});
